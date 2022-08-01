import { ComponentType } from 'react';
import { useAppDispatch, useAppSelector } from '../../common/state/hooks';
import BookItem from '../../objects/BookItem';
import {
  addOrUpdateBook,
  removeBook as removeReduxBook,
} from '../../common/state/librarySlice';

const withLibrary = <T,>(WrappedComponent: ComponentType<T>) => {
  return (props: T) => {
    const dispatch = useAppDispatch();
    const { bookList } = useAppSelector((state) => state.library);

    const updateBook = (book: BookItem) => {
      dispatch(addOrUpdateBook(book));
    };

    const removeBook = (book: BookItem) => {
      dispatch(removeReduxBook(book.uuid));
    };

    return (
      <WrappedComponent
        {...props}
        bookList={bookList}
        updateBook={updateBook}
        removeBook={removeBook}
      />
    );
  };
};

export default withLibrary;
