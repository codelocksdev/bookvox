import { ChangeEvent } from 'react';
import { HTMLSelect } from '@blueprintjs/core';

import { FlexColumn, Label } from './styled';

interface DropdownChooserProps {
  label?: string;
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
    <FlexColumn>
      {label && <Label>{label}</Label>}
      <HTMLSelect large onChange={handleSelect} defaultValue={selected}>
        {options.map((choice) => (
          <option key={choice} value={choice}>
            {choice}
          </option>
        ))}
      </HTMLSelect>
    </FlexColumn>
  );
};

export default DropdownChooser;
