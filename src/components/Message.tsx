import { styled } from 'styled-components';

const StyledMessage = styled.div`
    margin: 2rem;
    padding-top: 4rem;
    font-size: 1.5rem;
`;

type MessageProps = {
    children?: React.ReactNode;
};

function Message({ children }: MessageProps) {
    return (
        <StyledMessage>{children}</StyledMessage>
    );
}

export default Message;
