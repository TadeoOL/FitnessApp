import { useEffect } from 'react';
import { useSetThemeMode, useThemeStore } from '../store/useThemeStore';
import { useColorScheme } from 'react-native';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeMode = useThemeStore((state) => state.themeMode);
  const colorDevice = useColorScheme();
  const setThemeMode = useSetThemeMode();

  useEffect(() => {
    if (themeMode === 'system') {
      console.log('colorDevice', colorDevice);
      setThemeMode('system', colorDevice);
    }
  }, [themeMode, colorDevice]);

  return <>{children}</>;
}
