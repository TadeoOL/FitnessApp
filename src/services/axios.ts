import { API_URL } from "@env";
import axios from "axios";
import i18next from "i18next";
import { AuthStorage } from "../features/auth/services/authStorage";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config: any) => {
    const authState = await AuthStorage.loadAuthState();
    if (authState && config.headers) {
      config.headers.Authorization = `Bearer ${authState.token}`;
    }
    config.headers["accept-language"] = i18next.language;
    return config;
  },
  (error) => {
    console.log("error", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Error de autenticación - Token inválido o faltante");
      await AuthStorage.clearAuthState();
    }

    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;
