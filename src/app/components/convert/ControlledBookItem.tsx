import { useCallback, useMemo } from 'react';

import { BookItem, BookItemFields } from '../../objects/BookItem';
import { addOrUpdateBook, removeBook } from '../../common/state/librarySlice';
import { useAppDispatch } from '../../common/state/typedReduxMethods';
import { convertBook } from '../../common/state/thunks';
import IpcService from '../../common/ipc/IpcService';
import BookUploadItem from './BookUploadItem';

interface ControlledBookItemProps {
  book: BookItem;
}

const ControlledBookItem = ({ book }: ControlledBookItemProps) => {
  const ipcService = useMemo(() => new IpcService(), []);
  const dispatch = useAppDispatch();

  const update = useCallback(
    (fields: BookItemFields) => {
      const newBook: BookItem = { ...book, ...fields };
      dispatch(addOrUpdateBook(newBook));
    },
    [dispatch, book]
  );

  const remove = useCallback(() => {
    const { uuid } = book;
    dispatch(removeBook(uuid));
  }, [dispatch, book]);

  const convert = useCallback(() => {
    dispatch(convertBook({ book, ipcService }));
  }, [dispatch, book, ipcService]);

  return (
    <BookUploadItem
      book={book}
      update={update}
      remove={remove}
      convert={convert}
    />
  );
};

export default ControlledBookItem;
