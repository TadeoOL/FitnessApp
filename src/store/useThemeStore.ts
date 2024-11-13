import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme, CustomTheme } from '@/theme/theme';

export type ThemeMode = 'system' | 'light' | 'dark';

interface ThemeStore {
  themeMode: ThemeMode;
  theme: CustomTheme;
  setThemeMode: (mode: ThemeMode, systemTheme?: 'light' | 'dark' | null) => void;
}

// Selectores reutilizables
const selectTheme = (state: ThemeStore) => state.theme;
const selectThemeMode = (state: ThemeStore) => state.themeMode;
const selectSetThemeMode = (state: ThemeStore) => state.setThemeMode;

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      themeMode: 'system',
      theme: lightTheme,
      setThemeMode: (mode: ThemeMode, systemTheme?: 'light' | 'dark' | null) => {
        set((state) => {
          if (mode === 'system' && state.themeMode === 'system') {
            return state;
          }

          let newTheme: CustomTheme;
          switch (mode) {
            case 'light':
              newTheme = lightTheme;
              break;
            case 'dark':
              newTheme = darkTheme;
              break;
            case 'system':
              newTheme = systemTheme === 'dark' ? darkTheme : lightTheme;
              break;
            default:
              newTheme = lightTheme;
          }

          return {
            themeMode: mode,
            theme: newTheme,
          };
        });
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Hooks específicos para cada parte del estado
export const useTheme = () => useThemeStore(selectTheme);
export const useThemeMode = () => useThemeStore(selectThemeMode);
export const useSetThemeMode = () => useThemeStore(selectSetThemeMode);