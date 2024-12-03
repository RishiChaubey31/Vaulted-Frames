import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const [mode, setMode] = useState("dark");

  // Create themes for light and dark modes
  const theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#1976d2",
      },
    },
  });

  // Toggle the theme mode
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (

      <ThemeProvider  theme={theme}>
      <CssBaseline /> {/* Ensures global styles adapt to the theme */}
      <Box>
        {/* Pass the toggleTheme function and current mode to Navbar */}
        <Navbar mode={mode} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
    </ThemeProvider>
    
    
  );
}

export default App;
