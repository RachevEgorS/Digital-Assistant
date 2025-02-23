const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
require('dotenv').config(); // Загружаем переменные окружения
const app = express();
const mysql = require('mysql');
const jwt = require('jsonwebtoken'); // Установите: npm install jsonwebtoken

app.use(cors({
    origin: '*', // Разрешить доступ со всех доменов (временно, в production лучше использовать конкретные домены)
 }));
app.use(express.json()); // Для обработки JSON в запросах
const port = process.env.PORT || 8081;
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    connectTimeout: 100000,
});

db.connect((err) => {
    if (err) {
        console.error('Ошибка соединения с MySQL:', err);
        return;
    }
    console.log('Успешное соединение с MySQL');
});

// Общая функция для поиска пользователя (студента или преподавателя)
const findUserByEmail = async (email) => {
    return new Promise((resolve, reject) => {
        // Поиск в таблице students
        db.query('SELECT * FROM students WHERE email = ?', [email], (err, studentResults) => {
            if (err) {
                console.error("Ошибка при поиске студента:", err);
                return reject(err);
            }

            if (studentResults.length > 0) {
                return resolve({ user: studentResults[0], table: 'students' });
            }

            // Поиск в таблице teachers
            db.query('SELECT * FROM teachers WHERE email = ?', [email], (err, teacherResults) => {
                if (err) {
                    console.error("Ошибка при поиске преподавателя:", err);
                    return reject(err);
                }

                if (teacherResults.length > 0) {
                    return resolve({ user: teacherResults[0], table: 'teachers' });
                }

                // Если ни в одной таблице не найдено
                resolve(null);
            });
        });
    });
};

//Регистрация пользователя (обновление пароля)
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        let userResult;
        try {
            userResult = await findUserByEmail(email);
        } catch (error) {
            console.error("Ошибка при вызове findUserByEmail:", error);
            return res.status(500).json({ error: 'Ошибка сервера при поиске пользователя' });
        }

        if (!userResult) {
            return res.status(400).json({ error: 'Пользователь с такой почтой не найден' });
        }

        const { user, table } = userResult;

        // Хеширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // Обновление пароля пользователя
        const query = `UPDATE ${table} SET password = ? WHERE email = ?`;

        const updatePassword = (query, params) => {
            return new Promise((resolve, reject) => {
                db.query(query, params, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        };

        try {
            await updatePassword(query, [hashedPassword, email]);
            return res.status(200).json({ message: 'Пароль успешно обновлен' });
        } catch (err) {
            console.error('Ошибка при обновлении пароля:', err);
            return res.status(500).json({ error: 'Ошибка сервера' });
        }

    } catch (error) {
        console.error('Ошибка при регистрации:', error);
        return res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Авторизация пользователя
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userResult = await findUserByEmail(email);

        if (!userResult) {
            return res.status(400).json({ error: 'Неверная почта или пароль' });
        }

        const { user, table } = userResult;

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Создаем JWT
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                console.error("Ошибка: JWT_SECRET не установлен!");
                return res.status(500).json({ error: 'Ошибка сервера: JWT_SECRET не установлен' }); // Send 500 status
            }

            try {
                const token = jwt.sign(
                    { userId: user.id, email: user.email, role: table },
                    secret,
                    { expiresIn: '1h' }
                );

                return res.status(200).json({ message: 'Авторизация успешна', token });
            } catch (jwtError) {
                console.error("Ошибка при создании JWT:", jwtError);
                return res.status(500).json({ error: 'Ошибка сервера: Ошибка при создании JWT' }); // Send 500 status
            }
        } else {
            return res.status(400).json({ error: 'Неверная почта или пароль' });
        }
    } catch (error) {
        console.error('Ошибка при авторизации:', error);
        console.error('Трассировка стека:', error.stack); // Add stack trace
        return res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Получение данных пользователя
// Белый список разрешенных таблиц
const ALLOWED_TABLES = ['students', 'teachers'];

// Белый список разрешенных столбцов (для каждой таблицы)
const ALLOWED_COLUMNS = {
    'students': ['id', 'name', 'email', 'phone', 'course', 'password'],
    'teachers': ['id', 'name', 'department', 'email', 'phone']
};

// Функция для безопасного выполнения запросов
const queryDatabase = (query, params) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

app.get('/profile', async (req, res) => {
    const { email, type } = req.query;

    // Проверка типа таблицы по белому списку
    if (!ALLOWED_TABLES.includes(type)) {
        return res.status(400).json({ error: 'Недопустимый тип пользователя' });
    }

    try {
        const results = await queryDatabase(`SELECT * FROM ${type} WHERE email = ?`, [email]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }

        return res.status(200).json(results[0]);
    } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
        return res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.put('/profile', async (req, res) => {
    const { email, type, ...updatedData } = req.body;

    // Проверка типа таблицы по белому списку
    if (!ALLOWED_TABLES.includes(type)) {
        return res.status(400).json({ error: 'Недопустимый тип пользователя' });
    }

    const table = type;

    // Фильтрация и проверка обновляемых столбцов по белому списку
    const allowedColumnsForTable = ALLOWED_COLUMNS[table];
    const updateEntries = Object.entries(updatedData)
        .filter(([key, value]) => value !== undefined && value !== null && allowedColumnsForTable.includes(key));

    if (updateEntries.length === 0) {
        return res.status(400).json({ error: "Нет данных для обновления или недопустимые столбцы" });
    }

    const updateValues = updateEntries
        .map(([key, value]) => `${key} = ?`)
        .join(', ');

    const values = updateEntries
        .map(([key, value]) => value);

    try {
        await queryDatabase(`UPDATE ${table} SET ${updateValues} WHERE email = ?`, [...values, email]);
        return res.status(200).json({ message: 'Данные успешно обновлены' });
    } catch (error) {
        console.error('Ошибка при обновлении данных пользователя:', error);
        return res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});