import { createTheme } from "@mui/material";
import colors from "./colors";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: colors.background,
    },
    text: {
      primary: colors.text,
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
