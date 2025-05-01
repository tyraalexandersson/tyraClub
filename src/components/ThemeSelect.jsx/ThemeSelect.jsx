import "./ThemeSelect.style.css";
import { useTheme } from "../../hooks";

const ThemeSelect = () => {
  const { theme, toggleTheme } = useTheme();
  const themes = ["system", "light", "dark"];

  return (
    <select
      className="themeSelect"
      defaultValue={theme}
      onChange={(e) => toggleTheme(e.target.value)}
    >
      {themes.map((themeOption) => (
        <option
          key={themeOption}
          value={themeOption}
          label={themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}  
          className="themeSelect__option"
        >
          {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
        </option>
      ))}
    </select>
  );
};
export default ThemeSelect;
