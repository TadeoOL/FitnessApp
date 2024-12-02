import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import en from "./locales/en.json";
import es from "./locales/es.json";
import { LANGUAGES_TYPE } from "../constants/languages";

i18n.use(initReactI18next).init({
  resources: { en, es },
  lng: "en",
  fallbackLng: "en",
  compatibilityJSON: "v3",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export const changeLanguage = async (lng: LANGUAGES_TYPE) => {
  try {
    await i18n.changeLanguage(lng);
    await AsyncStorage.setItem("user-language", lng);
  } catch (error) {
    console.log("Error changing language", error);
  }
};

const loadSavedLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem("user-language");
    console.log("savedLanguage", savedLanguage);
    if (savedLanguage) {
      await i18n.changeLanguage(savedLanguage);
    }
  } catch (error) {
    console.log("Error loading saved language", error);
  }
};

loadSavedLanguage();

export default i18n;
