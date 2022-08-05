import { EditableText } from '@blueprintjs/core';
import { BookItem } from '../../../objects/BookItem';

interface TitleInputProps {
  book: BookItem;
  handleSetBookName(value: string): void;
}

const TitleInput = ({ book, handleSetBookName }: TitleInputProps) => {
  return (
    <EditableText
      placeholder={'Enter Book Title...'}
      defaultValue={book.name}
      onConfirm={handleSetBookName}
    />
  );
};

export default TitleInput;
