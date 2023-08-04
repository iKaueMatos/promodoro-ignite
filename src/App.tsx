import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components"; 
import { defaultTheme } from "./assets/styles/themes/default";
import { GlobalStyles } from "./assets/styles/themes/global";
import { Router } from "./Router";

export default function App() {

  return (
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <GlobalStyles/>
      </ThemeProvider>
  )
}
