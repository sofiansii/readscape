import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, createBrowserRouter, Outlet, Route, Router, RouterProvider, Routes } from 'react-router-dom';
import StaticAppbar from './Components/StaticAppbar';
import HomePage from './Pages/Home';
import DetailsPage from './Pages/Details';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { green, orange, purple } from '@mui/material/colors';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

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
});

root.render(
  <React.StrictMode>
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
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme()`
  interface ThemeOptions {
    status?: {
      primary?: string;
    };
  }
}