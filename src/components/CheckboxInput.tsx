import { styled } from 'styled-components';

const StyledCheckboxInput = styled.input`
    margin-right: 1rem;

    &:hover {
        cursor: pointer;
    }
`;

type CheckboxInputProps = {
    type: string;
    defaultChecked: boolean;
    onClick: () => void;
};

function CheckboxInput({ type, defaultChecked, onClick }: CheckboxInputProps) {
    return (
        <StyledCheckboxInput
            type={type}
            defaultChecked={defaultChecked}
            onClick={onClick}
        />
    );
}

export default CheckboxInput;
