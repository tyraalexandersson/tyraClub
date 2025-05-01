import { createContext, useState } from "react";

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

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
