import { styled } from 'styled-components';

const StyledHeading = styled.h3`
    text-align: center;
`;

type HeadingProps = {
    children?: React.ReactNode;
};

function Heading({ children }: HeadingProps) {
    return (
        <StyledHeading>{children}</StyledHeading>
    );
}

export default Heading;
