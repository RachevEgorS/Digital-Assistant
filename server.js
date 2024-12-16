const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config(); // Загружаем переменные окружения
const app = express();

app.use(cors({
    origin: '*', // Разрешить доступ со всех доменов (временно, в production лучше использовать конкретные домены)
 }));
app.use(express.json()); // Для обработки JSON в запросах
const port = process.env.PORT || 8081;
//app.use(cors());
//app.use(express.json());

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
//     database: process.env.DB_NAME,
//     connectTimeout: 100000,
// });

// db.connect((err) => {
//     if (err) {
//         console.error('Ошибка соединения с MySQL:', err);
//         return;
//     }
//     console.log('Успешное соединение с MySQL');
// });

// Общая функция для поиска пользователя (студента или преподавателя)
const findUserByEmail = async (email) => {
    return new Promise((resolve, reject) => {
        // Поиск в таблице студентов
    //   db.query('SELECT * FROM студент WHERE почта = ?', [email], (err, studentResults) => {
    //     if (err) {
    //       return reject(err);
    //     }
    //       if (studentResults.length > 0) {
    //           return resolve({ user: studentResults[0], table: 'студент' });
    //       }
    //        // Поиск в таблице преподавателей
    //       db.query('SELECT * FROM преподаватель WHERE почта = ?', [email], (err, teacherResults) => {
    //         if(err) {
    //             return reject(err);
    //         }
    //         if (teacherResults.length > 0) {
    //              return resolve({ user: teacherResults[0], table: 'преподаватель'});
    //          }
    //          resolve(null);
    //      });
    //   });

    // Моковые данные пользователей
        const mockUsers = {
            'student@example.com': {
                user: {
                    почта: 'student@example.com',
                    пароль: '$2b$10$0r8f/k7Z3k0Z6q7y2U5tE.7Z5a5Z9n0v.b4Y8w7Xw9h.yR9xZz', // hashed 'password'
                },
                table: 'студент'
            },
            'teacher@example.com': {
                user: {
                    почта: 'teacher@example.com',
                    пароль: '$2b$10$0r8f/k7Z3k0Z6q7y2U5tE.7Z5a5Z9n0v.b4Y8w7Xw9h.yR9xZz', // hashed 'password'
                },
                table: 'преподаватель'
            }
        };
        if (mockUsers[email]) {
          return resolve(mockUsers[email]);
      }
      return resolve(null);
    });
};

// Регистрация пользователя (обновление пароля)
// app.post('/register', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//       const userResult = await findUserByEmail(email);

//       if (!userResult) {
//            return res.status(400).json({ error: 'Пользователь с такой почтой не найден' });
//       }
//           const { user, table } = userResult;

//       // Хеширование пароля
//       const hashedPassword = await bcrypt.hash(password, 10);

//       // Обновление пароля пользователя
//       const query = `UPDATE ${table} SET пароль = ? WHERE почта = ?`;
//         db.query(query, [hashedPassword, email], (err) => {
//             if(err){
//              console.error('Ошибка при обновлении пароля:', err);
//              return res.status(500).json({ error: 'Ошибка сервера' });
//             }
//             return res.status(200).json({ message: 'Пароль успешно обновлен' });
//         });
//     } catch (error) {
//         console.error('Ошибка при регистрации:', error);
//         return res.status(500).json({ error: 'Ошибка сервера' });
//     }
// });

// Регистрация пользователя (обновление пароля) - теперь моковая
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userResult = await findUserByEmail(email);

        if (!userResult) {
            return res.status(400).json({ error: 'Пользователь с такой почтой не найден' });
        }
        // хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // имитируем обновление пароля в моковых данных
        return res.status(200).json({ message: 'Пароль успешно обновлен' });
    } catch (error) {
        console.error('Ошибка при регистрации:', error);
        return res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Авторизация пользователя
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//          const userResult = await findUserByEmail(email);

//          if (!userResult) {
//                return res.status(400).json({ error: 'Неверная почта или пароль' });
//           }

//        const { user, table } = userResult;

//         const passwordMatch = await bcrypt.compare(password, user.пароль);

//         if(passwordMatch) {
//             return res.status(200).json({ message: 'Авторизация успешна', table });
//         } else {
//            return res.status(400).json({ error: 'Неверная почта или пароль' });
//         }
//     } catch (error) {
//       console.error('Ошибка при авторизации:', error);
//       return res.status(500).json({ error: 'Ошибка сервера' });
//     }
// });

// Авторизация пользователя - теперь моковая
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userResult = await findUserByEmail(email);
        if (!userResult) {
            return res.status(400).json({ error: 'Неверная почта или пароль' });
        }
      const { user, table } = userResult;
        const passwordMatch = await bcrypt.compare(password, user.пароль);

        if (passwordMatch) {
            return res.status(200).json({ message: 'Авторизация успешна', table });
        } else {
            return res.status(400).json({ error: 'Неверная почта или пароль' });
        }
    } catch (error) {
        console.error('Ошибка при авторизации:', error);
        return res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Получение данных пользователя
// app.get('/profile', async (req, res) => {
//     const { email, type } = req.query;
//     const table = type === 'студент' ? 'студент' : 'преподаватель';

//     try {
//         db.query(`SELECT * FROM ${table} WHERE почта = ?`, [email], (err, results) => {
//              if (err) {
//                 console.error('Ошибка при запросе к БД:', err);
//                  return res.status(500).json({ error: 'Ошибка сервера' });
//             }
//              if (results.length === 0) {
//                 return res.status(404).json({ error: 'Пользователь не найден' });
//               }

//                return res.status(200).json(results[0]);
//           });
//     } catch (error) {
//         console.error('Ошибка при получении данных пользователя:', error);
//         return res.status(500).json({ error: 'Ошибка сервера' });
//     }
// });

// Обновление данных пользователя
// app.put('/profile', async (req, res) => {
//     const { email, type, ...updatedData } = req.body;

//     const table = type === 'студент' ? 'студент' : 'преподаватель';
//     const updateValues = Object.entries(updatedData)
//         .filter(([key, value]) => value !== undefined && value !== null)
//         .map(([key, value]) => `${key} = ?`)
//         .join(', ');
//     const values = Object.entries(updatedData)
//          .filter(([key, value]) => value !== undefined && value !== null)
//         .map(([key, value]) => value);

//     if(!updateValues) {
//         return res.status(400).json({error: "Нет данных для обновления"});
//     }

//     try {
//         db.query(`UPDATE ${table} SET ${updateValues} WHERE почта = ?`, [...values, email], (err, result) => {
//            if(err){
//                 console.error('Ошибка при обновлении данных:', err);
//                 return res.status(500).json({ error: 'Ошибка сервера' });
//              }
//                return res.status(200).json({ message: 'Данные успешно обновлены' });
//         });
//     } catch (error) {
//          console.error('Ошибка при обновлении данных пользователя:', error);
//         return res.status(500).json({ error: 'Ошибка сервера' });
//     }
// });

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});