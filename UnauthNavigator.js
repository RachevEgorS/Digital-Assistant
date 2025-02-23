import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

const UnauthStack = createNativeStackNavigator();

function UnauthNavigator() {
  return (
    <UnauthStack.Navigator>
      <UnauthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <UnauthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </UnauthStack.Navigator>
  );
}

export default UnauthNavigator;