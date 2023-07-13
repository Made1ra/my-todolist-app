import { ChangeEvent } from 'react';
import { styled } from 'styled-components';

const StyledTextInput = styled.input`
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #eee;
    margin-right: 1rem;

    &.edit-input {
        width: 50%;
    }

    @media (max-width: 576px) {
        padding: 0.5rem 0.5rem;
        margin-left: 1%;
    }
`;

type TextInputProps = {
    type: string;
    className?: string
    placeholder?: string;
    defaultValue?: string;
    value?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => false | void;
};

function TextInput({ type, className, placeholder, defaultValue, value, onChange, onKeyDown }: TextInputProps) {
    return (
        <StyledTextInput
            type={type}
            className={className}
            placeholder={placeholder}
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    );
}

export default TextInput;
