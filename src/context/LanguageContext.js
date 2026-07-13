"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import dictionaries from "../translations/dictionaries.json";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState("ar");

  useEffect(() => {
    // Sync document attributes with current locale
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    
    // Switch dynamic body class for fonts
    if (locale === "ar") {
      document.body.classList.remove("font-en");
      document.body.classList.add("font-ar");
    } else {
      document.body.classList.remove("font-ar");
      document.body.classList.add("font-en");
    }
  }, [locale]);

  const toggleLocale = () => {
    setLocale((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const t = (key) => {
    if (!dictionaries[locale]) return key;
    return dictionaries[locale][key] || dictionaries["ar"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, toggleLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
