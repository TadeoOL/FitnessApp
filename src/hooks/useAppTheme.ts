import { useColorScheme } from 'react-native';
import { useEffect } from 'react';
import { useThemeStore } from '../store/useThemeStore';

export const useAppTheme = () => {
  const { theme, isDarkMode, toggleTheme } = useThemeStore();
  const systemColorScheme = useColorScheme();

  // Opcional: Sincronizar con el tema del sistema
  useEffect(() => {
    if (systemColorScheme === 'dark' && !isDarkMode) {
      toggleTheme();
    } else if (systemColorScheme === 'light' && isDarkMode) {
      toggleTheme();
    }
  }, [systemColorScheme]);

  return {
    theme,
    isDarkMode,
    toggleTheme,
  };
}; 