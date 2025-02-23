import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import UnauthNavigator from './UnauthNavigator';
import { AuthContext } from './AuthContext';
import { View, Text, ActivityIndicator } from 'react-native'; // Импортируйте ActivityIndicator

export default function App() {
  const { isLoggedIn, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Загрузка...</Text>
      </View> 
    ); // Верните индикатор загрузки
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AuthNavigator /> : <UnauthNavigator />}
    </NavigationContainer>
  );
}