import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Alert, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@env';

// Экран авторизации
const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_URL}/login`, {
                email,
                password,
            });
            if (response.status === 200) {
                await AsyncStorage.setItem('isLoggedIn', 'true');
                await AsyncStorage.setItem('userType', response.data.table);
                navigation.navigate('Home');
            }
        } catch (error) {
            if (error.response) {
               error.response.json().then(errorData =>{
                   Alert.alert('Ошибка авторизации', errorData.error);
               })
            } else {
                Alert.alert('Ошибка сети', 'Проверьте соединение с интернетом');
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Авторизация</Text>
            <TextInput
                style={styles.input}
                placeholder="Почта"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Войти</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.linkText}>Нет аккаунта? Зарегистрироваться</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
};

// Экран регистрации
const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post(`${API_URL}/register`, {
                email,
                password,
            });

            if (response.status === 200) {
                Alert.alert('Успех', 'Вы успешно зарегистрировались.');
                navigation.navigate('Login');
            }
        } catch (error) {
            if (error.response) {
                error.response.json().then(errorData =>{
                    Alert.alert('Ошибка регистрации', errorData.error);
                })
            } else {
                Alert.alert('Ошибка сети', 'Проверьте соединение с интернетом');
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Регистрация</Text>
            <TextInput
                style={styles.input}
                placeholder="Почта"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Зарегистрироваться</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Уже есть аккаунт? Войти</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
};


// Define screens
const HomeScreen = ({ navigation }) => (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Цифровой помошник</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.buttonText}>Личный кабинет</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Расписание</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Объявления</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Зачётная книжка</Text>
        </TouchableOpacity>
        <Button title="Выйти" onPress={() => {
            AsyncStorage.removeItem('isLoggedIn');
            AsyncStorage.removeItem('userType');
            navigation.navigate('Login');
        }} />
        <StatusBar style="auto" />
    </SafeAreaView>
);


const ProfileScreen = ({ navigation }) => {
    const [userType, setUserType] = useState(null);
    useEffect(() => {
        const fetchUserType = async () => {
            const type = await AsyncStorage.getItem('userType');
            setUserType(type);
        };

        fetchUserType();
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Личный кабинет</Text>
            <Text>{userType === 'студент' ? 'Студент' : 'Преподаватель'}</Text>
            {userType === 'студент' ? (
                <>
                    <Text>Имя: John Doe</Text>
                    <Text>ID студента: 1234567</Text>
                    <Text>Группа: ИИПб-23-2</Text>
                </>
            ) : (
                <>
                    <Text>Имя: Jane Doe</Text>
                    <Text>Кафедра: кафедра Иип</Text>
                </>
            )}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Назад</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
};

const CourseScheduleScreen = () => (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Расписание занятий</Text>
        <Text>Заглушка для расписания занятий</Text>
        <StatusBar style="auto" />
    </SafeAreaView>
);

const Stack = createNativeStackNavigator();

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const storedLoginStatus = await AsyncStorage.getItem('isLoggedIn');
                setIsLoggedIn(storedLoginStatus === 'true');
            } catch (error) {
                console.error('Ошибка при чтении состояния логина:', error);
            } finally {
                setLoading(false);
            }
        };

        checkLoginStatus();
    }, []);

    if (loading) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isLoggedIn ? (
                    <>
                        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Мой профиль' }} />
                        <Stack.Screen name="CourseSchedule" component={CourseScheduleScreen} options={{ title: 'Расписание занятий' }} />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Register"
                            component={RegisterScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                )}

            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    linkText: {
        color: 'blue',
        marginTop: 10,
        textDecorationLine: 'underline',
    },
});