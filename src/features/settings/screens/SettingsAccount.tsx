import { View, StyleSheet, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/store/useThemeStore";
import { SettingsItem } from "../components/SettingsItem";
import { useSettingsAccount } from "../hooks/useSettingsAccount";
import { SettingsSelectItem } from "../components/SettingsSelectItem";
import i18n from "@/src/i18n";
import { useLanguages } from "@/src/constants/languages";
import { ToastComponent } from "@/src/components/toast/ToastComponent";

const SettingsAccountScreen = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { handlers } = useSettingsAccount();
  const languages = useLanguages();
  const currentLanguage = i18n.language;

  const languageOptions = languages.map((lang) => ({
    label: lang.label,
    value: lang.code,
  }));
  return (
    <>
      <ScrollView
        style={[
          styles.container,
          { backgroundColor: theme.customColors.background.default },
        ]}
      >
        <View style={styles.section}>
          <SettingsSelectItem
            icon="language-outline"
            title={t("settings.sections.account.changeLanguage")}
            onSelect={handlers.handleChangeLanguage as (value: string) => void}
            isFirst
            isLast
            value={currentLanguage}
            options={languageOptions}
          />
        </View>
        <View style={styles.section}>
          <SettingsItem
            icon="person-outline"
            title={t("settings.sections.account.signOut")}
            onPress={handlers.handleSignOut}
            isFirst
            isLast
          />
        </View>
      </ScrollView>
      <ToastComponent />
    </>
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

export default SettingsAccountScreen;
