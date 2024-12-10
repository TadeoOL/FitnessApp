import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css';
import { AppNavigator } from './src/navigation/AppNavigator';
import './src/i18n';
import { useTheme } from '@/src/store/useThemeStore';
import { ToastComponent } from './src/components/toast/ToastComponent';
import { ThemeProvider } from './src/theme/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const theme = useTheme();
  const queryClient = new QueryClient();

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer theme={theme}>
            <AppNavigator />
          </NavigationContainer>
          <ToastComponent />
        </QueryClientProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
