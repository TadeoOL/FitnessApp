import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTheme, lightTheme } from '@/theme/theme';

interface ThemeStore {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: typeof lightTheme;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDarkMode: false,
      theme: lightTheme,
      toggleTheme: () =>
        set((state) => ({
          isDarkMode: !state.isDarkMode,
          theme: !state.isDarkMode ? darkTheme : lightTheme,
        })),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 