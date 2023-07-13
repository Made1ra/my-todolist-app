import { styled } from 'styled-components';

const StyledListItem = styled.li`
    display: flex;
    align-items: center;
    margin: 0.5rem 0;
    
    &:nth-child(1) {
        padding-top: 5rem;
    }
`;

type ListItemProps = {
    children?: React.ReactNode;
};

function ListItem({ children }: ListItemProps) {
    return (
        <StyledListItem>{children}</StyledListItem>
    );
}

export default ListItem;
