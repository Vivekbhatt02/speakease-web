import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {CssBaseline, ThemeProvider} from "@mui/material";
import Theme from "./app/Theme.js";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ThemeProvider theme={Theme}>
          <CssBaseline/>
          <App/>
      </ThemeProvider>
  </StrictMode>,
)
