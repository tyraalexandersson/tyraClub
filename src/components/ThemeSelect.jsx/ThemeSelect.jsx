import "./ThemeSelect.style.css";
import { useTheme } from "../../hooks";

const ThemeSelect = () => {
  const { theme, toggleTheme } = useTheme();
  const themes = ["system", "light", "dark"];

  return (
    <select defaultValue={theme} onChange={(e) => toggleTheme(e.target.value)}>
      {themes.map((themeOption) => (
        <option key={themeOption} value={themeOption}>
          {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
        </option>
      ))}
    </select>
  );
};
export default ThemeSelect;
