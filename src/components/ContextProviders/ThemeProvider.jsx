import { useState, useEffect } from "react";
import { ThemeContext } from "../../context/Context";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("sodoku-theme");
    if (savedTheme) {
      return savedTheme;
    }
    return "light";
  });

  function changeTheme(theme) {
    setTheme(theme);
  }

  useEffect(() => {
    localStorage.setItem("sodoku-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
