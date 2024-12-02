import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './src/navigation/AppNavigator';
import './src/i18n';
import { useTheme } from '@/src/store/useThemeStore';
import { ToastComponent } from './src/components/toast/ToastComponent';
import { ThemeProvider } from './src/theme/ThemeProvider';

export default function App() {
  const theme = useTheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={theme}>
        <ThemeProvider>
          <AppNavigator />
        </ThemeProvider>
      </NavigationContainer>
      <ToastComponent />
    </SafeAreaProvider>
  );
}
