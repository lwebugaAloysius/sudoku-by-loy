import { useContext } from "react";
import { ThemeContext } from "../context/Context";

export function useTheme() {
  const { theme, changeTheme } = useContext(ThemeContext);

  return {
    theme,
    changeTheme,
  };
}
