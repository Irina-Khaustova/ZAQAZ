import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: { 
    fontFamily: ["Nunito Sans", "Sans Serif"].join(","),
    main: {
        fontSize: "16px",
        fontWeight: "600",
        fontFamily: "Nunito Sans, Sans Serif",
      },
      maintext: {
        fontSize: "16px",
        fontWeight: "500",
        fontFamily: "Nunito Sans, Sans Serif",
      },
      maintexttytle: {
        fontSize: "18px",
        fontWeight: "600",
        fontFamily: "Nunito Sans, Sans Serif",
      },
      text16Bold : {
        fontSize: "16px",
        fontWeight: "700",
        fontFamily: "Nunito Sans, Sans Serif",
      },
      text16Light : {
        fontSize: "16px",
        fontWeight: "400",
        fontFamily: "Nunito Sans, Sans Serif",
      },
      text15Bold : {
        fontSize: "15px",
        fontWeight: "700",
        fontFamily: "Nunito Sans, Sans Serif",
      },
      text15Medium : {
        fontSize: "15px",
        fontWeight: "700",
        fontFamily: "Nunito Sans, Sans Serif",
      },
      text24Bold : {
        fontSize: "24px",
        fontWeight: "700",
        fontFamily: "Nunito Sans, Sans Serif",
      },
      text24Medium : {
        fontSize: "24px",
        fontWeight: "600",
        fontFamily: "Nunito Sans, Sans Serif",
      },
      text18Bold : {
        fontSize: "18px",
        fontWeight: "700",
        fontFamily: "Nunito Sans, Sans Serif",
      },
      text32Bold : {
        fontSize: "32px",
        fontWeight: "700",
        fontFamily: "Nunito Sans, Sans Serif",
      },
},
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
