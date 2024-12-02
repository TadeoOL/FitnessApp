import { useEffect } from 'react';
import { Appearance } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';

export const useAppTheme = () => {
  const themeMode = useThemeStore((state) => state.themeMode);
  const setThemeMode = useThemeStore((state) => state.setThemeMode);
  const { setColorScheme } = useNativeWindColorScheme();

  const systemColorScheme = Appearance.getColorScheme();

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (themeMode === 'system') {
        setThemeMode('system', colorScheme);
        setColorScheme(colorScheme as 'light' | 'dark');
      }
    });

    return () => subscription.remove();
  }, [themeMode]);

  useEffect(() => {
    if (themeMode === 'system') {
      setThemeMode('system', systemColorScheme);
      setColorScheme(systemColorScheme as 'light' | 'dark');
    }
  }, [systemColorScheme]);

  return {
    themeMode,
    systemColorScheme,
    setThemeMode,
  };
};
