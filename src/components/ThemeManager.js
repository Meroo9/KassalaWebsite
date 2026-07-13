"use client";

import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { contentService } from "../services/contentService";

export default function ThemeManager() {
  const { locale } = useLanguage();

  useEffect(() => {
    const applyTheme = () => {
      const config = contentService.getThemeSettings();
      const root = document.documentElement;

      // 1. Inject Custom Colors
      if (config.primaryColor) {
        root.style.setProperty("--primary", config.primaryColor);
        // Calculate a darker version for gradients / hover
        root.style.setProperty("--primary-dark", config.primaryDark || config.primaryColor);
        
        // Convert hex to rgb for rgba usage if needed
        const hexToRgb = (hex) => {
          const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
          const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
          const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
          return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : "13, 92, 52";
        };
        root.style.setProperty("--primary-rgb", hexToRgb(config.primaryColor));
      }

      if (config.accentColor) {
        root.style.setProperty("--accent", config.accentColor);
      }

      // 2. Inject Typography Font
      const selectedFont = config.fontFamily || "Tajawal";
      if (locale === "ar") {
        document.body.style.fontFamily = `'${selectedFont}', sans-serif`;
      } else {
        document.body.style.fontFamily = `'Inter', sans-serif`;
      }

      // 3. Toggle background glowing spheres
      const backgroundElement = document.querySelector(".digitalBackground");
      if (backgroundElement) {
        backgroundElement.style.display = config.glowOrbs !== false ? "block" : "none";
      }

      // 4. Toggle Card Hover Glow Effect
      document.body.setAttribute("data-card-glow", config.cardGlow !== false ? "true" : "false");
    };

    applyTheme();

    // Event listener to react when admin updates theme settings in another view or same page
    window.addEventListener("storage", applyTheme);
    
    // Also re-apply if language is switched
    return () => {
      window.removeEventListener("storage", applyTheme);
    };
  }, [locale]);

  return null;
}
