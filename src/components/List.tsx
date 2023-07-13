import { styled } from 'styled-components';

const StyledList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;

type ListProps = {
    children?: React.ReactNode;
};

function List({ children }: ListProps) {
    return (
        <StyledList>{children}</StyledList>
    );
}

export default List;
