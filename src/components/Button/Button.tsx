import { ButtonContainer, BackgroundButton } from './Button.styles.ts';

interface ButtonProps {
    background?:BackgroundButton;
}

export function Button ({ background = 'primary' }: ButtonProps) {
    return  <ButtonContainer background = {background}>Enviar</ButtonContainer>
} 