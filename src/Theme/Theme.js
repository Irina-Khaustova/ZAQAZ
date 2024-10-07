import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: { fontFamily: ["Nunito Sans", "Sans Serif"].join(",") },
  palette: {
    primary: {
      main: "rgba(246, 248, 249, 1)",
    },
    secondary: {
      main: "rgba(255, 149, 0, 1)",
      contrastText: "rgba(255, 255, 255, 1)",
    },
  },
});

export default theme;
