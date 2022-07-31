import {
  FormEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button, EditableText, FileInput, Intent } from '@blueprintjs/core';
import BookItem from '../../objects/BookItem';
import FileItem from '../../objects/FileItem';
import IpcService from '../../common/ipc/IpcService';
import ChannelNames from '../../../shared/ChannelNames';
import { useAppSelector } from '../../common/state/hooks';
import { RootState } from '../../common/state/store';
import {
  AddBookDialogContainer,
  HeaderText,
  ListBox,
  ListItem,
} from '../styled';

interface AddBookWizardProps {
  show: boolean;
  setShow(show: boolean): void;
  addBook(book: BookItem): void;
}

const slash = window.navigator.platform === 'Win32' ? '\\' : '/';

// todo --  this file needs lots of cleanup and moving of sub-components to their own files
const AddBookDialog = ({ show, setShow, addBook }: AddBookWizardProps) => {
  const ipcService = useMemo(() => new IpcService(), []);
  const destinationFolder = useAppSelector(
    (store: RootState) => store.settings.outputDirectory
  );

  useEffect(() => {
    (async function getHomeDir() {
      const homeDir = await ipcService.send<string>(
        ChannelNames.HOME_DIRECTORY
      );
      const destination = `${homeDir}${slash}${destinationFolder}${slash}`;
      setBook((prevState) => ({
        ...prevState,
        destination,
      }));
    })();
  });

  const renderFile = (file: FileItem, index: number) => {
    const isEven = index % 2 === 0;
    return (
      <ListItem
        key={`add-book-file-item-${index}--${file.name}`}
        isEven={isEven}
      >
        <EditableText
          defaultValue={file.name.replace('.txt', '')}
          onConfirm={(input) => {
            if (files.current && files.current.has(file.path)) {
              // @ts-ignore
              files.current.get(file.path).name = `${input}.txt`;
              setBook((prevState) => ({
                ...prevState,
                files: Array.from(files.current.values()),
              }));
            }
          }}
        />
        <Button
          icon={'trash'}
          onClick={() => {
            if (files.current) {
              files.current.delete(file.path);
              setBook((prevState) => ({
                ...prevState,
                files: Array.from(files.current.values()),
              }));
            }
          }}
          intent={Intent.DANGER}
          minimal
        />
      </ListItem>
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
