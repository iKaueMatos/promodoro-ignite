import styled from 'styled-components';

export type BackgroundButton = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonContainerProps {
    background: BackgroundButton
}

const buttonVariants = {
    primary:'purple',
    secondary:'orange',
    danger:'red',
    success: 'green'
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: 100px;
    height: 40px;
    cursor: pointer;
    border-radius: 2px;
    border:none;
    background: ${props => props.theme['green-500']};
    color:${props => props.theme.white};
  


    /* ${props => {
        return `background-color:${buttonVariants[props.background]}`   
    }} */
`