import { styled } from 'styled-components';

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;

    background-color: white;

    width: 30%;
    height: 42.75em;
    height: 100%;

    border: 0.075em solid black;

    margin: 1.1em auto;

    font-family: 'Lato';
    font-weight: 500;
    font-size: 1.125em;

    @media (max-width: 1200px) {
        width: 40%;
    }

    @media (max-width: 992px) {
        width: 50%;
    }

    @media (max-width: 768px) {
        width: 60%;
    }

    @media (max-width: 576px) {
        width: 95%;
    }
`;

type ContainerProps = {
    children?: React.ReactNode;
};

function Container({ children }: ContainerProps) {
    return (
        <StyledContainer>{children}</StyledContainer>
    );
}

export default Container;
