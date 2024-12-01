import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Define screens
const HomeScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Digital Assistant</Text>
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
    <StatusBar style="auto" />
  </SafeAreaView>
);


const ProfileScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Личный кабинет</Text>
    <Text>Имя: John Doe</Text>
    <Text>ID студента: 1234567</Text>
    <Text>Группа: ИИПб-23-2</Text>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
      <Text style={styles.buttonText}>Назад</Text>
    </TouchableOpacity>
    <StatusBar style="auto" />
  </SafeAreaView>
);

const CourseScheduleScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Расписание занятий</Text>
    <Text>Заглушка для расписания занятий</Text>
    <StatusBar style="auto" />
  </SafeAreaView>
);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Мой профиль' }} />
        <Stack.Screen name="CourseSchedule" component={CourseScheduleScreen} options={{ title: 'Расписание занятий' }} />
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
});