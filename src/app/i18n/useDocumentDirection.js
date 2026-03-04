import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function useDocumentDirection() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const language = i18n.resolvedLanguage || i18n.language || "en";
    const direction = i18n.dir(language);

    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [i18n, i18n.language, i18n.resolvedLanguage]);
}

export { useDocumentDirection };
