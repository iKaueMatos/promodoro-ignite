import { styled } from "styled-components";

export const FormContainer = styled.div `
    width:100%;
    display:flex;
    align-items: center;
    justify-content: center;
    gap:0.5rem;
    color:${(props) => props.theme['gray-100']};
    font-weight: bold;
    flex-wrap:wrap;
    -webkit-font-smoothing:antialiased;
`;

const BaseInput = styled.input`
    background: transparent;
    height:2.5rem;
    border:none;
    border-bottom:2px solid ${(props) => props.theme['gray-500']};
    font-weight: 1.125rem;
    padding:0 0.5rem;
    color:${props => props.theme['gray-100']};
    
    &::placeholder {
        color: ${(props) => props.theme['gray-500']};
    }

    &:focus {
        box-shadow:none;
        border-color: ${(props) => props.theme['green-500']};
    }

`;

export const TaskInput = styled(BaseInput)`
    flex:1;

    &::-webkit-calendar-picker-indicator {
        display: none !important;
    }
`;

export const MinuteAmount = styled(BaseInput)`
    width: 4rem;
`;