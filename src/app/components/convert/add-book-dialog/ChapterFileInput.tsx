import { FileInput } from '@blueprintjs/core';
import { FormEvent } from 'react';

interface ChapterFileInputProps {
  handleAddChapters(event: FormEvent<HTMLInputElement>): void;
}

const ChapterFileInput = ({ handleAddChapters }: ChapterFileInputProps) => {
  return (
    <FileInput
      text={'Choose chapter files...'}
      inputProps={{ accept: '.txt', multiple: true }}
      onInputChange={handleAddChapters}
    />
  );
};

export default ChapterFileInput;
