import { InputGroup, Intent } from '@blueprintjs/core';
import styled from 'styled-components';
import { ChangeEvent, useEffect, useState } from 'react';

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
  intent?: Intent;
}

const TextInput = ({
  placeholder,
  setText,
  text,
  intent = Intent.NONE,
}: TextInputProps) => {
  const [value, setValue] = useState(text);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setText(value);
    }, 1500);

    return () => clearTimeout(delayDebounce);
  }, [value, setText]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <InputContainer>
      <InputGroup
        round
        value={value}
        fill={false}
        placeholder={placeholder}
        onInput={handleChange}
        intent={intent}
      />
    </InputContainer>
  );
};

export default TextInput;
