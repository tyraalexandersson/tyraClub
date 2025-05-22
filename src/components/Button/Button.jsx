import { ThemeContext } from "../../context";
import { useContext } from "react";

const Button = ({ label, onClick, variant, className, type = "button" }) => {
  const { theme } = useContext(ThemeContext);

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDarkMode = theme === "dark" || (theme === "system" && prefersDark);

  const buttonClass = variant === "primary" ? "btn-primary" : "btn-secondary";
  const buttonStyle = {
    backgroundColor: isDarkMode ? "#f87bd1" : "#3f363c", // dark or light background
    color: isDarkMode ? "#353535" : "#e9dce5", // dark or light text
    border:
      buttonClass === "btn-primary"
        ? "none"
        : isDarkMode
        ? "1px solid #fff"
        : "1px solid #ccc",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s, color 0.3s",
  };
  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      style={buttonStyle}
      className={className}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
