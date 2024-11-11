import { Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SetupStackParamList } from "@/src/types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import colorPalette from "@/theme/colorPalette";
import { commonStyles } from "@/theme/commonStyles";
import { useState } from "react";
import { useSetupStore } from "../store/useSetupStore";
import { useTranslation } from "react-i18next";

type ActivityLevel = {
  id: string;
  title: string;
  description: string;
  examples: string;
  value: number;
};

const activityLevels: ActivityLevel[] = [
  {
    id: "sedentary",
    title: "Sedentario",
    description: "Poco o ningún ejercicio, trabajo de escritorio",
    examples: "Ej: Programador, oficinista, diseñador",
    value: 1.2,
  },
  {
    id: "light",
    title: "Ligeramente activo",
    description: "Ejercicio ligero 1-3 días por semana",
    examples: "Ej: Profesor, vendedor, estudiante",
    value: 1.375,
  },
  {
    id: "moderate",
    title: "Moderadamente activo",
    description: "Ejercicio moderado 3-5 días por semana",
    examples: "Ej: Mesero, mecánico, electricista",
    value: 1.55,
  },
  {
    id: "very",
    title: "Muy activo",
    description: "Ejercicio intenso 6-7 días por semana",
    examples: "Ej: Instructor de gimnasio, cartero, obrero",
    value: 1.725,
  },
  {
    id: "extra",
    title: "Extra activo",
    description: "Ejercicio muy intenso diario, o trabajo físico intenso",
    examples: "Ej: Atleta, agricultor, albañil",
    value: 1.9,
  },
];

export const ActivityLevelScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<SetupStackParamList>>();
  const { activityLevel, setActivityLevel } = useSetupStore();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(
    activityLevel?.id || null
  );
  const { t } = useTranslation();

  const handleContinue = () => {
    if (selectedLevel) {
      const selectedActivity = activityLevels.find(
        (level) => level.id === selectedLevel
      );
      if (selectedActivity) {
        setActivityLevel({
          id: selectedActivity.id,
          value: selectedActivity.value,
        });
        // navigation.navigate("NextScreen");
      }
    }
  };

  return (
    <SafeAreaView style={[commonStyles.mainContainer, styles.container]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← {t("common.back")}</Text>
      </TouchableOpacity>

      <Text style={commonStyles.title}>{t("activityLevel.title")}</Text>
      <Text style={styles.subtitle}>{t("activityLevel.subtitle")}</Text>

      <ScrollView
        style={styles.optionsContainer}
        showsVerticalScrollIndicator={false}
      >
        {activityLevels.map((level) => (
          <TouchableOpacity
            key={level.id}
            activeOpacity={1}
            style={[
              styles.optionCard,
              selectedLevel === level.id && styles.selectedCard,
            ]}
            onPress={() => setSelectedLevel(level.id)}
          >
            <Text
              style={[
                styles.optionTitle,
                selectedLevel === level.id && styles.selectedText,
              ]}
            >
              {t(`activityLevel.levels.${level.id}.title`)}
            </Text>
            <Text
              style={[
                styles.optionDescription,
                selectedLevel === level.id && styles.selectedText,
              ]}
            >
              {t(`activityLevel.levels.${level.id}.description`)}
            </Text>
            <Text
              style={[
                styles.examples,
                selectedLevel === level.id && styles.selectedText,
              ]}
            >
              {t(`activityLevel.levels.${level.id}.examples`)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[
          commonStyles.primaryButton,
          !selectedLevel && styles.buttonDisabled,
        ]}
        onPress={handleContinue}
        disabled={!selectedLevel}
      >
        <Text style={commonStyles.buttonText}>{t("common.next")}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    paddingVertical: 10,
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: colorPalette.secondary.main,
  },
  subtitle: {
    fontSize: 16,
    color: colorPalette.text.secondary,
    textAlign: "center",
    marginBottom: 20,
  },
  optionsContainer: {
    flex: 1,
    marginVertical: 20,
  },
  optionCard: {
    backgroundColor: colorPalette.background.paper,
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedCard: {
    borderColor: colorPalette.secondary.main,
    backgroundColor: colorPalette.secondary.main,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: colorPalette.text.primary,
  },
  optionDescription: {
    fontSize: 14,
    color: colorPalette.text.secondary,
  },
  selectedText: {
    color: colorPalette.text.primary,
  },
  buttonDisabled: {
    backgroundColor: colorPalette.background.paper,
  },
  examples: {
    fontSize: 14,
    color: colorPalette.text.secondary,
    marginTop: 4,
    fontStyle: "italic",
  },
});
