import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { SetupStackParamList } from "@/src/types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useAppTheme } from "@/src/hooks/useAppTheme";
import { CustomTheme } from "@/theme/theme";

export const BasicInfoScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<SetupStackParamList>>();
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const handleContinue = () => {
    navigation.navigate("PersonalInfo");
  };

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).content}>
        <Text style={styles(theme).title}>
          {t("initialForm.basicInfo.title")}
        </Text>

        <Text style={styles(theme).description}>
          {t("initialForm.basicInfo.description")}
        </Text>

        <Text style={styles(theme).info}>
          {t("initialForm.basicInfo.helpText")}
        </Text>

        <View style={styles(theme).bulletPoints}>
          <Text style={styles(theme).bullet}>
            • {t("initialForm.basicInfo.bulletPoints.calories")}
          </Text>
          <Text style={styles(theme).bullet}>
            • {t("initialForm.basicInfo.bulletPoints.exercises")}
          </Text>
          <Text style={styles(theme).bullet}>
            • {t("initialForm.basicInfo.bulletPoints.goals")}
          </Text>
          <Text style={styles(theme).bullet}>
            • {t("initialForm.basicInfo.bulletPoints.progress")}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles(theme).button} onPress={handleContinue}>
        <Text style={styles(theme).buttonText}>{t("common.next")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.customColors.background.default,
      paddingHorizontal: 20,
      paddingBottom: 20,
      justifyContent: "space-between",
    },
    content: {
      flex: 1,
      justifyContent: "center",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      color: theme.customColors.text.primary,
    },
    description: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 30,
      textAlign: "center",
      color: theme.customColors.text.primary,
    },
    info: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 15,
      color: theme.customColors.text.primary,
    },
    bulletPoints: {
      paddingLeft: 10,
    },
    bullet: {
      fontSize: 16,
      lineHeight: 28,
      color: theme.customColors.text.primary,
    },
    button: {
      backgroundColor: theme.customColors.primary.main,
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: "center",
    },
    buttonText: {
      color: theme.customColors.text.primary,
      fontSize: 16,
      fontWeight: "600",
    },
  });
