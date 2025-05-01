import { createContext, useEffect, useState } from "react";

const DEFAULT_THEME = "system";
const initialState = {
  theme: DEFAULT_THEME,
  // eslint-disable-next-line no-unused-vars
  toggleTheme: (selectedTheme) => {},
};
export const ThemeContext = createContext(initialState);

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const value = {
    theme,
    toggleTheme: (selectedTheme) => setTheme(selectedTheme),
  };

  useEffect(() => {
    const darkModePreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const applyTheme = (isDark) => {
      if (isDark) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    };

    if (theme === "system") {
      applyTheme(darkModePreference.matches);

      const handleSystemThemeChange = (e) => {
        applyTheme(e.matches);
      };

      darkModePreference.addEventListener("change", handleSystemThemeChange);

      // Cleanup
      return () => {
        darkModePreference.removeEventListener(
          "change",
          handleSystemThemeChange
        );
      };
    } else {
      applyTheme(theme === "dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
