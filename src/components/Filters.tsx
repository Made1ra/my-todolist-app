import { styled } from 'styled-components';

const StyledFilters = styled.div`
    display: flex;
    flex-wrap: nowrap;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    margin-top: 1.5%;
`;

type FiltersProps = {
    children?: React.ReactNode;
};

function Filters({ children }: FiltersProps) {
    return (
        <StyledFilters>{children}</StyledFilters>
    );
}

export default Filters;
