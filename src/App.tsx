import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components"; 
import { defaultTheme } from "./assets/styles/themes/default";
import { GlobalStyles } from "./assets/styles/themes/global";
import { Router } from "./Router";
import { CyclesContextProvider } from "./context/CyclesContext";

export default function App() {

	return (
			<ThemeProvider theme={defaultTheme}>
				<BrowserRouter>
				<CyclesContextProvider>
					<Router />
				</CyclesContextProvider>
				</BrowserRouter>
				<GlobalStyles/>
			</ThemeProvider>
	)
}
