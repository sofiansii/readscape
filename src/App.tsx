import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, createBrowserRouter, Outlet, Route, Router, RouterProvider, Routes } from 'react-router-dom';
import StaticAppbar from './Components/StaticAppbar';
import HomePage from './Pages/Home';
import DetailsPage from './Pages/Details';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { green, orange, purple } from '@mui/material/colors';
import { useCartStore } from './Store/CartStore';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: "/Book/{id}",
    element: <DetailsPage />
  }
])

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },

  },
  components: {
    MuiButton: { 
      styleOverrides: { 
        root: { minWidth: 16,minHeight:16 } 
      } 
    }
  }
});




function App() {

  return (
    <ThemeProvider theme={theme}>
        <BrowserRouter>
          <StaticAppbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="book/:id" element={<DetailsPage />}>
            </Route>
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
