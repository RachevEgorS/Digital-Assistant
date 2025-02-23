import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import CourseScheduleScreen from './CourseScheduleScreen';

const AuthStack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Мой профиль' }} />
      <AuthStack.Screen name="CourseSchedule" component={CourseScheduleScreen} options={{ title: 'Расписание занятий' }} />
    </AuthStack.Navigator>
  );
}

export default AuthNavigator;