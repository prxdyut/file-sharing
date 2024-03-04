import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#41A49C",
      light: "#C7EFE7",
      dark: "#0A685A",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: `"Montserrat", sans-serif`,
  },
});

export default theme;
