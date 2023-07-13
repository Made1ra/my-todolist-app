import { styled } from 'styled-components';

const StyledText = styled.span`
    margin: 1.5rem 0.5rem 1.5rem 0;
    font-size: 1.5rem;

    &.completed {
        text-decoration: line-through;
        color: grey;
    }
`;

type TextProps = {
    children?: React.ReactNode;
    className?: string;
};

function Text({ children, className }: TextProps) {
    return (
        <StyledText className={className}>{children}</StyledText>
    );
}

export default Text;
