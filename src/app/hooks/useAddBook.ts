import {
  FormEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import FileItem from '../objects/FileItem';
import BookItem from '../objects/BookItem';
import IpcService from '../common/ipc/IpcService';
import { useAppSelector } from '../common/state/hooks';
import { RootState } from '../common/state/store';
import ChannelNames from '../../shared/ChannelNames';

const emptyBook: BookItem = { name: '', destination: '', files: [] };
const slash = window.navigator.platform === 'Win32' ? '\\' : '/';

interface UseAddBookProps {
  setShow(show: boolean): void;
  addBook(book: BookItem): void;
}

const useAddBook = ({ setShow, addBook }: UseAddBookProps) => {
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
  });

  const handleAddBook = useCallback(() => {
    addBook(book);
    setBook(emptyBook);
    setShow(false);
    files.current = new Map();
  }, [book, addBook, setShow, setBook]);

  const handleClose = useCallback(() => {
    setBook(emptyBook);
    setShow(false);
    files.current = new Map();
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

  const onFileInputTextConfirm = useCallback(
    (file: FileItem, input: string) => {
      if (files.current && files.current.has(file.path)) {
        // @ts-ignore
        files.current.get(file.path).name = `${input}.txt`;
        setBook((prevState) => ({
          ...prevState,
          files: Array.from(files.current.values()),
        }));
      }
    },
    [setBook]
  );

  const removeFile = useCallback((file: FileItem) => {
    if (files.current) {
      files.current.delete(file.path);
      setBook((prevState) => ({
        ...prevState,
        files: Array.from(files.current.values()),
      }));
    }
  }, []);

  return {
    handleAddBook,
    handleClose,
    handleSetBookName,
    handleAddChapters,
    setBook,
    files,
    book,
    onFileInputTextConfirm,
    removeFile,
  };
};

export default useAddBook;
