import { ThemeProvider } from "styled-components"; 
import { Button } from "./components/Button/Button";
import { defaultTheme } from "./assets/themes/default";

export default function App() {

  return (
      <ThemeProvider theme={defaultTheme}>
          <Button background="primary"/>
          <Button background="secondary" />
          <Button background="success"/>
          <Button background="danger"/>
          <Button />
      </ThemeProvider>
  )
}
