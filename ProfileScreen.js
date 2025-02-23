import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StudentProfile from './StudentProfile';
import TeacherProfile from './TeacherProfile';

const ProfileScreen = ({ navigation }) => {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const type = await AsyncStorage.getItem('userType');
        setUserType(type);
      } catch (error) {
        console.error("Ошибка при получении типа пользователя:", error);
      }
    };

    fetchUserType();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Личный кабинет</Text>
      <Text style={styles.userType}>
        {userType === 'студент' ? 'Студент' : 'Преподаватель'}
      </Text>
      {userType === 'студент' ? (
        <StudentProfile />
      ) : (
        <TeacherProfile />
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Назад</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userType: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ProfileScreen;