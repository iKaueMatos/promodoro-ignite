import { ThemeProvider } from "styled-components"; 
import { Button } from "./components/Button/Button";
import { defaultTheme } from "./assets/styles/themes/default";
import { GlobalStyles } from "./assets/styles/themes/global";

export default function App() {

  return (
      <ThemeProvider theme={defaultTheme}>
          <Button background="primary"/>
          <Button background="secondary" />
          <Button background="success"/>
          <Button background="danger"/>
          <Button />
          <GlobalStyles/>
      </ThemeProvider>
  )
}
