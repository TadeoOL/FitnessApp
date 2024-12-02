import { useColorScheme as useNativeWindTheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { useSetThemeMode, useThemeStore } from '../store/useThemeStore';
import { Appearance } from 'react-native';
import { RealDeviceThemeProvider } from '../store/RealDeviceThemeContext';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { setColorScheme } = useNativeWindTheme();
  const themeMode = useThemeStore((state) => state.themeMode);
  const [realDeviceTheme, setRealDeviceTheme] = useState(Appearance.getColorScheme());
  const setThemeMode = useSetThemeMode();

  useEffect(() => {
    const appearance = Appearance.getColorScheme();
    setRealDeviceTheme(appearance || 'light');
  }, []);

  useEffect(() => {
    if (themeMode === 'system') {
      setThemeMode('system', realDeviceTheme);
      setColorScheme(realDeviceTheme || 'light');
    } else {
      setColorScheme(themeMode);
    }
  }, [themeMode, realDeviceTheme]);

  return <RealDeviceThemeProvider value={realDeviceTheme}>{children}</RealDeviceThemeProvider>;
}
