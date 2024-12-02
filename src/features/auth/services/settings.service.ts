import { LANGUAGES_TYPE } from "@/src/constants/languages";
import axios from "@/src/services/axios";

const API_URL = "users/settings";
export namespace SettingsService {
  export const changeLanguage = async (
    language: LANGUAGES_TYPE
  ): Promise<{ message: string }> => {
    const res = await axios.put<{ message: string }>(`${API_URL}/language`, {
      language,
    });
    return res.data;
  };
}
