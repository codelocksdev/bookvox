import { Button, EditableText, FileInput } from '@blueprintjs/core';
import BookItem from '../../../objects/BookItem';
import FileItem from '../../../objects/FileItem';
import { AddBookDialogContainer, HeaderText, ListBox } from '../../styled';
import useAddBook from '../../../hooks/useAddBook';
import FilePreviewListItem from './FilePreviewListItem';

interface AddBookWizardProps {
  show: boolean;
  setShow(show: boolean): void;
  addBook(book: BookItem): void;
}

const AddBookDialog = ({ show, setShow, addBook }: AddBookWizardProps) => {
  const {
    handleAddBook,
    handleAddChapters,
    handleSetBookName,
    handleClose,
    onFileInputTextConfirm,
    removeFile,
    book,
  } = useAddBook({ setShow, addBook });

  const renderFile = (file: FileItem, index: number) => {
    const isEven = index % 2 === 0;
    return (
      <FilePreviewListItem
        file={file}
        isEven={isEven}
        onTextConfirm={onFileInputTextConfirm}
        remove={removeFile}
      />
    );
  };

  return (
    <AddBookDialogContainer
      className={'bp4-dark'}
      isOpen={show}
      onClose={handleClose}
    >
      <HeaderText>Add a Book</HeaderText>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 4,
        }}
      >
        {book.destination}
        <EditableText
          placeholder={'Enter Book Title...'}
          defaultValue={book.name}
          onConfirm={handleSetBookName}
        />
      </div>
      <ListBox>
        {book.files.map((file, index) => renderFile(file, index))}
      </ListBox>
      <FileInput
        inputProps={{ accept: '.txt', multiple: true }}
        onInputChange={handleAddChapters}
      />
      <Button
        icon={'tick'}
        text={'Add Book'}
        onClick={handleAddBook}
        disabled={book.name === ''}
        large
      />
    </AddBookDialogContainer>
  );
};

export default AddBookDialog;
