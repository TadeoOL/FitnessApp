import { TouchableOpacity, Text, StyleSheet, useColorScheme } from 'react-native';
import { ThemeMode, useSetThemeMode, useThemeMode } from '../store/useThemeStore';

export const ThemeToggle = () => {
  const setThemeMode = useSetThemeMode();
  const themeMode = useThemeMode();
  const colorDevice = useColorScheme();
  const isSystem = themeMode === 'system';

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setThemeMode(isSystem ? (colorDevice as ThemeMode) : themeMode === 'light' ? 'dark' : 'light')}
    >
      <Text style={styles.icon}>{themeMode === 'light' ? '🌙' : '☀️'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  icon: {
    fontSize: 20,
  },
});
