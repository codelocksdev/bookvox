import { FormEventHandler, useCallback, useRef, useState } from 'react';
import FileItem from '../objects/FileItem';
import BookItem from '../objects/BookItem';

const emptyBook: BookItem = { name: '', destination: '', files: [] };

const useAddBook = () => {
  const [book, setBook] = useState<BookItem>(emptyBook);
  const files = useRef<Map<string, FileItem>>(new Map());
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
};
