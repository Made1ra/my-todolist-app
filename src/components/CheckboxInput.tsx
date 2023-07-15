import { styled } from 'styled-components';

const StyledCheckboxInput = styled.input`
    margin-right: 1rem;

    &:hover {
        cursor: pointer;
    }
`;

type CheckboxInputProps = {
    type: string;
    checked: boolean;
    onClick: () => void;
};

function CheckboxInput({ type, checked, onClick }: CheckboxInputProps) {
    return (
        <StyledCheckboxInput
            type={type}
            checked={checked}
            onClick={onClick}
        />
    );
}

export default CheckboxInput;
