import { useTranslation } from "react-i18next";

export const useLanguages = () => {
  const { t } = useTranslation();

  return [
    { code: "en", label: t("languages.english"), flag: "🇺🇸" },
    { code: "es", label: t("languages.spanish"), flag: "🇲🇽" },
  ] as const;
};

export const LANGUAGES_CONSTANTS = ["en", "es"] as const;
export type LANGUAGES_TYPE = (typeof LANGUAGES_CONSTANTS)[number];
