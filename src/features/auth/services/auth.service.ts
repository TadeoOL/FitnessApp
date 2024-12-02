import { AuthStorage } from "./authStorage";
import { LoginRequest, LoginResponse } from "@/src/types/api.types";
import axios from "../../../services/axios";
import { useAuthStore } from "../store/useAuth";

const API_URL = "auth";

export namespace AuthService {
  export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await axios.post<LoginResponse>(
        `${API_URL}/login`,
        data
      );

      await AuthStorage.saveAuthState({
        token: response.data.token,
        hasCompletedSetup: response.data.hasCompletedSetup,
        language: response.data.language,
      });

      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  export const logout = async (): Promise<void> => {
    const logoutStore = useAuthStore.getState().logout;
    try {
      logoutStore();
      await AuthStorage.clearAuthState();
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  };

  export const getCurrentAuthState = async () => {
    return await AuthStorage.loadAuthState();
  };
}
