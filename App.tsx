import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./src/navigation/AppNavigator";
import Toast from "react-native-toast-message";
import { toastConfig } from "./src/components/toast/config";
import "./src/i18n";
import { useTheme } from "@/src/store/useThemeStore";

export default function App() {
  const theme = useTheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={theme}>
        <AppNavigator />
        <Toast
          visibilityTime={3000}
          autoHide
          position="bottom"
          config={toastConfig}
        />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
