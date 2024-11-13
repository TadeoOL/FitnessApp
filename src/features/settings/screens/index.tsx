import { View, Text, ScrollView } from "react-native";
import { SettingsItem } from "../components/SettingsItem";
import { useTheme } from "@/src/store/useThemeStore";
import { commonStyles } from "@/theme/commonStyles";
import { settingsStyles } from "../styles/settingsStyles";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SettingsStackParamList } from "@/src/types/navigation";

export const SettingsScreen = () => {
  const theme = useTheme();
  const commonStyle = commonStyles(theme);
  const styles = settingsStyles(theme);
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<SettingsStackParamList>>();

  const handleDisplayPress = () => {
    navigation.navigate("SettingsDisplay");
  };

  return (
    <ScrollView
      style={[
        commonStyle.mainContainer,
        { backgroundColor: theme.customColors.background.default },
      ]}
    >
      <View style={styles.settingsSection}>
        <Text style={styles.settingsHeader}>Appearance</Text>
        <View style={styles.settingsGroup}>
          <SettingsItem
            icon="phone-portrait-outline"
            title={t("settings.sections.display")}
            onPress={handleDisplayPress}
            isFirst
            isLast
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
