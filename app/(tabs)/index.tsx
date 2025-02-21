import { Image, StyleSheet, Platform, View, Text, Button } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { registerRootComponent } from 'expo';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";



export default function HomeScreen() {
  const navigation = useNavigation(); // Используем хук для навигации
  return (
    <View style ={styles.appContainer}>
    <ParallaxScrollView 
      headerBackgroundColor={{ light: "#AFDAFC", dark: "#1D3D47" }}
      
      headerImage={
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.Logo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Привет, преподаватель!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Для чего это приложение?</ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Digital&Assistant</ThemedText>
          — это приложение, разработанное студентами ТИУ
          специально для преподавателей и студентов, чтобы упростить их работу и
          повысить качество образовательного процесса.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Основные функции:</ThemedText>
        <Collapsible title="Управление курсами:">
          <ThemedText>
            • Создание и редактирование учебных планов.
          </ThemedText>
          <ThemedText>
            • Загрузка учебных материалов (лекции, задания, тесты).
          </ThemedText>
          <ThemedText>
            • Автоматическое напоминание о сроках сдачи работ.
          </ThemedText>
        </Collapsible>
        <Collapsible title="Оценка и аналитика:">
          <ThemedText>
            • Автоматизированная система оценивания работ и тестов.
          </ThemedText>
          <ThemedText>
            • Анализ успеваемости студентов с помощью графиков и отчетов.
          </ThemedText>
          <ThemedText>
            • Анализ успеваемости студентов с помощью графиков и отчетов.
          </ThemedText>
        </Collapsible>
        <Collapsible title="Организация времени:">
          <ThemedText>
            • Календарь с возможностью планирования занятий и встреч.
          </ThemedText>
          <ThemedText>
            • Интеграция с другими календарными сервисами.
          </ThemedText>
          <ThemedText>
            • Напоминания о важных событиях и дедлайнах.
          </ThemedText>
        </Collapsible>
        <Collapsible title="Ресурсы для профессионального роста:">
          <ThemedText>
            • Доступ к библиотеке материалов по педагогике и методике преподавания.
          </ThemedText>
          <ThemedText>
            • Вебинары и курсы повышения квалификации для преподавателей.
          </ThemedText>
          <ThemedText>
            • Сообщество для обмена опытом и лучшими практиками.
          </ThemedText>
        </Collapsible>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Преимущества использования:</ThemedText>
        <ThemedText>
          • Упрощение рутинных задач, что позволяет преподавателям сосредоточиться на качестве обучения.
        </ThemedText>
        <ThemedText>
          • Улучшение взаимодействия со студентами и повышение их вовлеченности.
        </ThemedText>
        <ThemedText>
          • Доступ к аналитическим данным для более эффективного управления курсами.
        </ThemedText>
      </ThemedView>
      <View style={styles.buttonContainer}>
          <Button title="Перейти к регистрации" onPress={() => navigation.navigate} />
        </View>
      </ParallaxScrollView>
    </View>

  
    
  );
}



const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#AFDAFC",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#E6E6FA", 
    padding: 16,
    borderRadius: 10,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  Logo: {
    height: 220,
    width: 400,
    bottom: 0,
    left: 5,
    position: "absolute",
  },
 
});
