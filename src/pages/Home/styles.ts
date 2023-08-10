import { styled } from "styled-components";

export const HomeContainer = styled.main `
        flex:1;

        display:flex;
        flex-direction:column;
        align-items: center;
        justify-content: center;

        form {
          display:flex;
          flex-direction: column;
          align-items: center;
          gap:3.5rem;
        }
`;

export const BaseCountdownButton = styled.button `
    width: 100%;
    border-radius: 8px;
    border: none;
    padding: 1rem;
    align-items: center;
    display: flex;
    cursor: pointer;
    justify-content: center;
    font-weight: bold;
    gap: 0.5rem;
    color: ${props => props.theme['gray-100']};

    &:disabled {
        opacity: 0.7;
        cursor:not-allowed;
    }
`;

export const StartCountdownButton = styled(BaseCountdownButton) `
    background:${props => props.theme['green-500']};
    
    &:not(:disabled):hover {
        background:${props => props.theme['green-700']};
    }
`

export const StopCountdownButton = styled(BaseCountdownButton) `
    background:${props => props.theme['red-500']};
   
    
    &:not(:disabled):hover {
        background:${props => props.theme['red-700']};
    }
`