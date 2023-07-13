import { styled } from 'styled-components';

const StyledButton = styled.button`
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #eee;
    margin-right: 1rem;

    &.active-filter {
        background-color: #00c853;
        color: #fff;
        cursor: pointer;
    }

    &.inactive-filter {
        background-color: #eee;
        color: #333;
        cursor: pointer;
        margin-right: 1rem;
    }

    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }

    @media (max-width: 576px) {
        margin-left: 1%;
    }
`;

type ButtonProps = {
    children: React.ReactNode;
    className?: string;
    onClick: () => void;
};

function Button({ children }: ButtonProps) {
    return (
        <StyledButton>{children}</StyledButton>
    );
}

export default Button;
