import { ChangeEvent } from 'react';
import { HTMLSelect } from '@blueprintjs/core';
import styled from 'styled-components';

import Label from './Label';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 32px;
`;

interface DropdownChooserProps {
  label: string;
  options: string[];
  selected: string;
  setSelection(selection: string): void;
}

const DropdownChooser = ({
  label,
  options,
  selected,
  setSelection,
}: DropdownChooserProps) => {
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelection(e.target.value);
  };

  return (
    <Container>
      <Label>{label}</Label>
      <HTMLSelect large onChange={handleSelect} defaultValue={selected}>
        {options.map((choice) => (
          <option key={choice} value={choice}>
            {choice}
          </option>
        ))}
      </HTMLSelect>
    </Container>
  );
};

export default DropdownChooser;
