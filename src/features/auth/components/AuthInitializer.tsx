import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useAuthStore } from "../store/useAuth";
import { AuthStorage } from "../services/authStorage";
import { changeLanguage } from "@/src/i18n";

interface Props {
  children: React.ReactNode;
}

export const AuthInitializer = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const { setIsLoggedIn, setHasCompletedSetup } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const authState = await AuthStorage.loadAuthState();

        if (authState?.token) {
          setIsLoggedIn(true);
          setHasCompletedSetup(authState.hasCompletedSetup);
          changeLanguage(authState.language ?? "en");
        }
      } catch (error) {
        await AuthStorage.clearAuthState();
        setIsLoggedIn(false);
        setHasCompletedSetup(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return children;
};
