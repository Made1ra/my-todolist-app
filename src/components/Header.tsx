import { styled } from 'styled-components';

const StyledHeader = styled.h1`
    margin-bottom: 2rem;
    text-align: center;
`;

type HeaderProps = {
    children?: React.ReactNode;
};

function Header({ children }: HeaderProps) {
    return (
        <StyledHeader>{children}</StyledHeader>
    );
}

export default Header;
