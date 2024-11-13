import { useColorScheme } from 'react-native';
import { useEffect } from 'react';
import { useThemeStore } from '../store/useThemeStore';

export const useAppTheme = () => {
  const systemColorScheme = useColorScheme();
  
  const themeMode = useThemeStore(state => state.themeMode);
  const setThemeMode = useThemeStore(state => state.setThemeMode);

  useEffect(() => {
    if (themeMode === 'system') {
      setThemeMode('system', systemColorScheme);
    }
  }, [systemColorScheme, themeMode]);

  return {
    themeMode,
    setThemeMode,
  };
}; 