import { View, StyleSheet, ScrollView } from "react-native";
import { SettingsSelectItem } from "../components/SettingsSelectItem";
import { useTranslation } from "react-i18next";
import {
  ThemeMode,
  useSetThemeMode,
  useTheme,
  useThemeMode,
} from "@/src/store/useThemeStore";
import { useColorScheme } from "react-native";

const themeOptions = [
  { label: "Match Device", value: "system" },
  { label: "Always Light", value: "light" },
  { label: "Always Dark", value: "dark" },
] as const;

const SettingsDisplayScreen = () => {
  const theme = useTheme();
  const themeMode = useThemeMode();
  const setThemeMode = useSetThemeMode();
  const systemTheme = useColorScheme();
  const { t } = useTranslation();

  const handleThemeSelect = (value: string) => {
    setThemeMode(value as ThemeMode, value === "system" ? systemTheme : null);
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: theme.customColors.background.default },
      ]}
    >
      <View style={styles.section}>
        <SettingsSelectItem
          icon="contrast-outline"
          title={t("settings.sections.theme")}
          value={themeMode}
          options={themeOptions}
          onSelect={handleThemeSelect}
          isFirst
          isLast
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginTop: 20,
    marginHorizontal: 16,
  },
});

export default SettingsDisplayScreen;
