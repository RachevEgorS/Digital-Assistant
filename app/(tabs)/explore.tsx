import { StyleSheet, Image, Platform } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function TabTwoScreen() {
  return (
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
        <ThemedText type="title">Привет, студент!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Для чего это приложение?</ThemedText>
        <ThemedText>
          С помощью
          <ThemedText type="defaultSemiBold"> Digital&Assistant </ThemedText>
          ты сможешь эффективно управлять своими задачами, взаимодействовать с
          преподавателями и получать доступ к образовательным ресурсам.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Основные функции:</ThemedText>
        <Collapsible title="Управление учебным процессом:">
          <ThemedText>
            {" "}
            • Загрузка и хранение учебных материалов (конспекты, презентации,
            видео).
          </ThemedText>
          <ThemedText>
            • Автоматические напоминания о сроках сдачи заданий и экзаменов.
          </ThemedText>
        </Collapsible>
        <Collapsible title="Коммуникация с преподавателями и однокурсниками:">
          <ThemedText>
            • Интегрированный чат для общения с преподавателями и группой.
          </ThemedText>
          <ThemedText>
            • Возможность задавать вопросы и получать обратную связь по
            заданиям.
          </ThemedText>
          <ThemedText>• Участие в групповых обсуждениях и проектах.</ThemedText>
        </Collapsible>
        <Collapsible title="Оценка и самоанализ:">
          <ThemedText>
            • Доступ к оценкам и результатам тестов в реальном времени.
          </ThemedText>
          <ThemedText>
            • Ведение дневника успеваемости с возможностью анализа своих сильных
            и слабых сторон.
          </ThemedText>
          <ThemedText>
            {" "}
            • Рекомендации по улучшению успеваемости на основе анализа данных.
          </ThemedText>
        </Collapsible>
        <Collapsible title="Организация времени и задач:">
          <ThemedText>
            • Календарь для планирования учебных и внеучебных мероприятий.
          </ThemedText>
          <ThemedText>
            • Список задач с возможностью установки приоритетов и дедлайнов.
          </ThemedText>
          <ThemedText>
            • Напоминания о важных событиях, таких как экзамены, семинары и
            встречи.
          </ThemedText>
        </Collapsible>
        <Collapsible title="Доступ к образовательным ресурсам:">
          <ThemedText>
            • Библиотека материалов по предметам (учебники, статьи, видеоуроки).
          </ThemedText>
          <ThemedText>
            • Информация о дополнительных курсах и вебинарах для углубленного
            изучения тем.
          </ThemedText>
          <ThemedText>
            • Форумы для обмена знаниями и опытом с другими студентами.
          </ThemedText>
        </Collapsible>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Преимущества использования:</ThemedText>
        <ThemedText>
          • Упрощение организации учебного процесса, что позволяет студентам
          сосредоточиться на учебе.
        </ThemedText>
        <ThemedText>
          • Улучшение взаимодействия с преподавателями и однокурсниками, что
          способствует созданию поддерживающей учебной среды.
        </ThemedText>
        <ThemedText>
          • Доступ к полезным ресурсам и материалам для повышения качества
          обучения.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#E6E6FA", // Поменяй цвет фона
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
