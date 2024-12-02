import Toast from "react-native-toast-message";
import { AuthService } from "../../auth/services/auth.service";
import { SettingsService } from "../../auth/services/settings.service";
import { changeLanguage } from "@/src/i18n";
import { LANGUAGES_TYPE } from "@/src/constants/languages";

export const useSettingsAccount = () => {
  const handlers = {
    handleChangeLanguage: async (value: LANGUAGES_TYPE) => {
      await changeLanguage(value);
      const res = await SettingsService.changeLanguage(value);
      Toast.show({
        text1: res.message,
        type: "success",
      });
    },
    handleSignOut: async () => {
      await AuthService.logout();
    },
  };

  return { handlers };
};
