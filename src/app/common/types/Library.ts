import { BookItem } from '../../objects/BookItem';

export interface Library {
  bookList: {
    [uuid: string]: BookItem;
  };
}
