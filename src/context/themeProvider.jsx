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
    if (theme === "system") {
      darkModePreference.matches
        ? document.body.classList.add("dark")
        : document.body.classList.remove("dark");

      const handleSystemThemeChange = (e) => {
        if (e.matches) {
          document.body.classList.add("dark");
        } else {
          document.body.classList.remove("dark");
        }
      };
      darkModePreference.addEventListener("change", handleSystemThemeChange);
    }

    if (theme === "dark") {
      document.body.classList.add("dark");
    }
    if (theme === "light") {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
