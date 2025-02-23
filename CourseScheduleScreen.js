import React from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar } from 'react-native';

const CourseScheduleScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Расписание занятий</Text>
    <Text>Заглушка для расписания занятий</Text>
    <StatusBar style="auto" />
  </SafeAreaView>
);

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
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default CourseScheduleScreen;