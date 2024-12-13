import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StaticAppbar from './Components/StaticAppbar';
import HomePage from './Pages/Home';
import DetailsPage from './Pages/Details';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

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
