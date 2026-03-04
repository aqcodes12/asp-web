import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

export const LANGUAGE_STORAGE_KEY = "asp-language";

const getInitialLanguage = () => {
  if (typeof window === "undefined") {
    return "en";
  }

  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (savedLanguage === "en" || savedLanguage === "ar") {
    return savedLanguage;
  }

  return "en";
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar }
  },
  lng: getInitialLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

if (typeof window !== "undefined") {
  i18n.on("languageChanged", (language) => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  });
}

export { i18n };
