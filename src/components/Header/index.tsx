import { NavLink } from "react-router-dom";
import { HeaderContainer } from "./styles";
import logoIgnite from "../../assets/img/icon/Logo.svg";
import { Scroll, Timer } from 'phosphor-react';

export function Header() {
	return (
		
		<HeaderContainer>
			<img src={logoIgnite} alt="Dois triangulos verde 
			onde pode ser localizado no canto direito e
			representa a logo da empresa" />
			<nav>
				<NavLink to="/" title="Timer">
					<Timer size={24} />
				</NavLink>
				<NavLink to="/history" title="Histórico">
					<Scroll size={24} />
				</NavLink>
			</nav>
		</HeaderContainer>
		
		) 
}