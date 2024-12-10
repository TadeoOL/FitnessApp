import { View, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { SettingsSelectItem } from '../components/SettingsSelectItem';
import { useTranslation } from 'react-i18next';
import { ThemeMode, useSetThemeMode, useTheme, useThemeMode } from '@/src/store/useThemeStore';

const themeOptions = (t: (key: string) => string) =>
  [
    { label: t('settings.sections.theme.matchDevice'), value: 'system' },
    { label: t('settings.sections.theme.alwaysLight'), value: 'light' },
    { label: t('settings.sections.theme.alwaysDark'), value: 'dark' },
  ] as const;

const SettingsDisplayScreen = () => {
  const theme = useTheme();
  const themeMode = useThemeMode();
  const setThemeMode = useSetThemeMode();
  const { t } = useTranslation();
  const colorDevice = useColorScheme();

  const handleThemeSelect = (value: string) => {
    setThemeMode(value as ThemeMode, value === 'system' ? colorDevice : null);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.customColors.background.default }]}>
      <View style={styles.section}>
        <SettingsSelectItem
          icon="contrast-outline"
          title={t('settings.sections.theme.title')}
          value={themeMode}
          options={themeOptions(t)}
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
