import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { SetupStackParamList } from "@/src/types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

export const BasicInfoScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<SetupStackParamList>>();
  const { t } = useTranslation();

  const handleContinue = () => {
    navigation.navigate("PersonalInfo");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t("basicInfo.title")}</Text>

        <Text style={styles.description}>{t("basicInfo.description")}</Text>

        <Text style={styles.info}>{t("basicInfo.helpText")}</Text>

        <View style={styles.bulletPoints}>
          <Text style={styles.bullet}>
            • {t("basicInfo.bulletPoints.calories")}
          </Text>
          <Text style={styles.bullet}>
            • {t("basicInfo.bulletPoints.exercises")}
          </Text>
          <Text style={styles.bullet}>
            • {t("basicInfo.bulletPoints.goals")}
          </Text>
          <Text style={styles.bullet}>
            • {t("basicInfo.bulletPoints.progress")}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>{t("common.next")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
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
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
    textAlign: "center",
  },
  info: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
  },
  bulletPoints: {
    paddingLeft: 10,
  },
  bullet: {
    fontSize: 16,
    lineHeight: 28,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
