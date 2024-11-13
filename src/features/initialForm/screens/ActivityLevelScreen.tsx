import { Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonStyles } from "@/theme/commonStyles";
import { useState } from "react";
import { useSetupStore } from "../store/useSetupStore";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../auth/store/useAuth";
import { useTheme } from "@/src/store/useThemeStore";
import { CustomTheme } from "@/theme/theme";

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
  const { activityLevel, setActivityLevel } = useSetupStore();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(
    activityLevel?.id || null
  );
  const { t } = useTranslation();
  const theme = useTheme();
  const { setHasCompletedSetup } = useAuthStore();

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
        //Send data to server
        //Send to next screen
        setHasCompletedSetup(true);
      }
    }
  };

  return (
    <SafeAreaView
      style={[
        styles(theme).container,
        { backgroundColor: theme.customColors.background.default },
      ]}
    >
      <Text
        style={[
          styles(theme).title,
          { color: theme.customColors.text.primary },
        ]}
      >
        {t("initialForm.activityLevel.title")}
      </Text>
      <Text style={styles(theme).subtitle}>
        {t("initialForm.activityLevel.subtitle")}
      </Text>

      <ScrollView
        style={styles(theme).optionsContainer}
        showsVerticalScrollIndicator={false}
      >
        {activityLevels.map((level) => (
          <TouchableOpacity
            key={level.id}
            activeOpacity={1}
            style={[
              styles(theme).optionCard,
              selectedLevel === level.id && styles(theme).selectedCard,
            ]}
            onPress={() => setSelectedLevel(level.id)}
          >
            <Text
              style={[
                styles(theme).optionTitle,
                selectedLevel === level.id && styles(theme).selectedText,
              ]}
            >
              {t(`initialForm.activityLevel.levels.${level.id}.title`)}
            </Text>
            <Text
              style={[
                styles(theme).optionDescription,
                selectedLevel === level.id && styles(theme).selectedText,
              ]}
            >
              {t(`initialForm.activityLevel.levels.${level.id}.description`)}
            </Text>
            <Text
              style={[
                styles(theme).examples,
                selectedLevel === level.id && styles(theme).selectedText,
              ]}
            >
              {t(`initialForm.activityLevel.levels.${level.id}.examples`)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[
          commonStyles(theme).primaryButton,
          !selectedLevel && styles(theme).buttonDisabled,
        ]}
        onPress={handleContinue}
        disabled={!selectedLevel}
      >
        <Text style={commonStyles(theme).buttonText}>{t("common.next")}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    backButton: {
      paddingVertical: 10,
      marginBottom: 20,
    },
    backButtonText: {
      fontSize: 16,
      color: theme.customColors.primary.main,
    },
    subtitle: {
      fontSize: 16,
      color: theme.customColors.text.secondary,
      textAlign: "center",
      marginBottom: 20,
    },
    optionsContainer: {
      flex: 1,
      marginVertical: 20,
    },
    optionCard: {
      backgroundColor: theme.customColors.background.paper,
      borderRadius: 10,
      padding: 20,
      marginBottom: 15,
      borderWidth: 2,
      borderColor: "transparent",
    },
    selectedCard: {
      borderColor: theme.customColors.secondary.main,
      backgroundColor: theme.customColors.secondary.main,
    },
    optionTitle: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 8,
      color: theme.customColors.text.primary,
    },
    optionDescription: {
      fontSize: 14,
      color: theme.customColors.text.secondary,
    },
    selectedText: {
      color: theme.customColors.text.primary,
    },
    buttonDisabled: {
      backgroundColor: theme.customColors.background.paper,
    },
    examples: {
      fontSize: 14,
      color: theme.customColors.text.secondary,
      marginTop: 4,
      fontStyle: "italic",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.customColors.text.primary,
    },
  });
