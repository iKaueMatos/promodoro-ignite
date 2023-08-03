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
    background: ${props => props.theme.primary};
    color:${props => props.theme.color}


    /* ${props => {
        return `background-color:${buttonVariants[props.background]}`   
    }} */
`