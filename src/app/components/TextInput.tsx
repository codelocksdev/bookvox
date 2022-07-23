import { InputGroup } from '@blueprintjs/core';
import styled from 'styled-components';
import { ChangeEvent } from 'react';

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 8px;
`;

interface TextInputProps {
  placeholder: string;
  text: string;
  setText(text: string): void;
}

const TextInput = ({ placeholder, setText, text }: TextInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <InputContainer>
      <InputGroup
        round
        value={text}
        fill={false}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </InputContainer>
  );
};

export default TextInput;
