import { createTheme, ThemeProvider } from "@mui/material";
import { grey, blue } from "@mui/material/colors";
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import HomePage from './pages/HomePage';
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/SignInPage";
import SignInPage from "./pages/SignInPage";
import AdminPage from "./pages/AdminPage";


const theme = createTheme({
  palette: {
    primary: {
      main: '#151515',
      light: '#282828',
      dark: '#000000',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fff',
      
    },
    /* secondary: {
      main: '#1776D1',
      light: '#4dabf5',
      dark: '#084c6f',
      contrastText: '#fff',
    }, */
  },
});


export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/search" element={<SearchPage/>} />
          <Route path="/signin" element={<SignInPage/>} />
          <Route path="/admin" element={<AdminPage/>} />
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
