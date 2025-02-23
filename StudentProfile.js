import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StudentProfile = () => {
  return (
    <View>
      <Text>Имя: John Doe</Text>
      <Text>ID студента: 1234567</Text>
      <Text>Группа: ИИПб-23-2</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // Добавьте стили, если необходимо
});

export default StudentProfile;