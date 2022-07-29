import {
  FormEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Button,
  Dialog,
  EditableText,
  FileInput,
  Intent,
} from '@blueprintjs/core';
import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

import Label from '../Label';
import BookItem from '../../objects/BookItem';
import FileItem from '../../objects/FileItem';
import IpcService from '../../common/ipc/IpcService';
import ChannelNames from '../../../shared/ChannelNames';
import { useAppSelector } from '../../common/state/hooks';
import { RootState } from '../../common/state/store';

const WizardContainer = styled(Dialog)`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const HeaderText = styled(Label)`
  font-size: 16px;
`;

const ListBox = styled(PerfectScrollbar)`
  padding: 4px;
  display: flex;
  flex-direction: column;
  border-color: white;
  border-radius: 4px;
  border-style: solid;
  height: 128px;
  background-color: #1c2127;
`;

const ListItem = styled.div<{ isEven: boolean }>`
  padding: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ isEven }) => (isEven ? '#1C2127' : '#252A31')};
`;

interface AddBookWizardProps {
  show: boolean;
  setShow(show: boolean): void;
  addBook(book: BookItem): void;
}

const emptyBook: BookItem = { name: '', destination: '', files: [] };
const slash = window.navigator.platform === 'Win32' ? '\\' : '/';

// todo --  this file needs lots of cleanup and moving of sub-components to their own files
const AddBookWizard = ({ show, setShow, addBook }: AddBookWizardProps) => {
  const [book, setBook] = useState<BookItem>(emptyBook);
  const files = useRef<Map<string, FileItem>>(new Map());
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
  }, [ipcService, destinationFolder]);

  const handleAddBook = useCallback(() => {
    addBook(book);
    setBook(emptyBook);
    setShow(false);
  }, [book, addBook, setShow, setBook]);

  const handleClose = useCallback(() => {
    setBook(emptyBook);
    setShow(false);
  }, [setBook, setShow]);

  const handleSetBookName = useCallback((name: string) => {
    setBook((prevState) => ({
      ...prevState,
      name,
    }));
  }, []);

  const handleAddChapters: FormEventHandler<HTMLInputElement> = (event) => {
    // @ts-ignore
    const newFiles: File[] = Array.from(event.target.files as FileList);

    newFiles.forEach((file) => {
      if (files.current && !files.current.has(file.path))
        files.current.set(file.path, FileItem.fromFile(file));
    });

    setBook((prevState) => ({
      ...prevState,
      files: Array.from(files.current.values()),
    }));
  };

  const renderFile = (file: FileItem, index: number) => {
    const isEven = index % 2 === 0;
    return (
      <ListItem isEven={isEven}>
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
    <WizardContainer className={'bp4-dark'} isOpen={show} onClose={handleClose}>
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
      <Button icon={'tick'} text={'Add ook'} onClick={handleAddBook} large />
    </WizardContainer>
  );
};

export default AddBookWizard;
