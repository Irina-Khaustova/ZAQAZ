import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import "./App.css";
import theme from "../Theme/Theme";
import routes from "../routes/routes";



function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {routes.map((route, index) => (
          <Route 
            key={index}
            path={route.path} 
            element={<route.component />} 
          />
        ))}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
