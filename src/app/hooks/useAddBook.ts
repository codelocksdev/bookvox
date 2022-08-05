import { FormEventHandler, useCallback, useMemo, useState } from 'react';
import FileItem from '../objects/FileItem';
import { BookItem } from '../objects/BookItem';
import { bookValid, generateUUID } from '../common/utils';
import { useAppDispatch } from '../common/state/typedReduxMethods';
import { addOrUpdateBook } from '../common/state/librarySlice';

const getEmptyBook = (): BookItem => ({
  uuid: generateUUID(),
  name: '',
  files: new Map(),
  processing: false,
  converted: false,
});

const useAddBook = (initialBook?: BookItem) => {
  const dispatch = useAppDispatch();
  const [book, setBook] = useState<BookItem>(initialBook || getEmptyBook());
  const allowAdd = useMemo(() => bookValid(book), [book]);

  const reset = useCallback(() => {
    setBook(getEmptyBook());
  }, [setBook]);

  const addBook = useCallback(() => {
    dispatch(addOrUpdateBook(book));
    reset();
  }, [dispatch, book, reset]);

  const handleSetBookName = useCallback((name: string) => {
    setBook((prevState) => ({
      ...prevState,
      name,
    }));
  }, []);

  const handleAddChapters: FormEventHandler<HTMLInputElement> = (event) => {
    // @ts-ignore
    const newFiles: File[] = Array.from(event.target.files as FileList);
    const files = new Map(book.files);

    newFiles.forEach((file) => {
      if (!files.has(file.path)) files.set(file.path, FileItem.fromFile(file));
    });

    setBook((prevState) => ({
      ...prevState,
      files,
    }));
  };

  const onFileInputTextConfirm = useCallback(
    (file: FileItem, input: string) => {
      const files = new Map(book.files);

      if (files.has(file.path)) {
        // @ts-ignore
        files.get(file.path).name = `${input}.txt`;
        setBook((prevState) => ({
          ...prevState,
          files,
        }));
      }
    },
    [book]
  );

  const removeFile = useCallback(
    (file: FileItem) => {
      const files = new Map(book.files);
      files.delete(file.path);
      setBook((prevState) => ({
        ...prevState,
        files,
      }));
    },
    [book]
  );

  return {
    addBook,
    reset,
    handleSetBookName,
    handleAddChapters,
    setBook,
    book,
    onFileInputTextConfirm,
    removeFile,
    allowAdd,
  };
};

export default useAddBook;
