import { useMemo } from 'react';

import { AddBookDialogContainer, HeaderText } from '../../styled';
import useAddBook from '../../../hooks/useAddBook';
import FileListBox from './FileListBox';
import TitleInput from './TitleInput';
import ChapterFileInput from './ChapterFileInput';
import AddBookButton from './AddBookButton';

interface AddBookWizardProps {
  show: boolean;
  setShow(show: boolean): void;
}

const AddBookDialog = ({ show, setShow }: AddBookWizardProps) => {
  const bookProps = useAddBook();
  const files = useMemo(
    () => Array.from(bookProps.book.files.values()),
    [bookProps]
  );

  const onClose = () => {
    const { reset } = bookProps;
    reset();
    setShow(false);
  };

  const onAdd = () => {
    const { addBook } = bookProps;
    addBook();
    setShow(false);
  };

  return (
    <AddBookDialogContainer
      className={'bp4-dark'}
      isOpen={show}
      onClose={onClose}
      {...bookProps}
    >
      <HeaderText>Add a Book</HeaderText>
      <TitleInput {...bookProps} />
      <FileListBox files={files} {...bookProps} />
      <ChapterFileInput {...bookProps} />
      <AddBookButton {...bookProps} addBook={onAdd} />
    </AddBookDialogContainer>
  );
};

export default AddBookDialog;
