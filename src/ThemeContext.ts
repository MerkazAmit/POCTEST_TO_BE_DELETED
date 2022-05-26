import createTheme from "@mui/material/styles/createTheme";
import { createContext } from "react";

export const themes = {
  dark: createTheme({
    palette: {
      mode: 'dark'
    }
  }),
  light: createTheme({
    palette: {
      mode: 'light'
    }
  })
}

export const themeContext = createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});

export default themeContext;