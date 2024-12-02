import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "../store/useAuth";
import { LANGUAGES_TYPE } from "@/src/constants/languages";

interface AuthState {
  token: string | null;
  hasCompletedSetup: boolean;
  language: LANGUAGES_TYPE | null;
}

export const AUTH_KEY = "@auth_state" as const;

export namespace AuthStorage {
  export const saveAuthState = async (state: AuthState): Promise<void> => {
    try {
      await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Error saving auth state:", error);
      throw error;
    }
  };

  export const loadAuthState = async (): Promise<AuthState | null> => {
    try {
      const data = await AsyncStorage.getItem(AUTH_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error loading auth state:", error);
      return null;
    }
  };

  export const clearAuthState = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(AUTH_KEY);
      useAuthStore.getState().logout();
    } catch (error) {
      console.error("Error clearing auth state:", error);
      throw error;
    }
  };
}
