import { BookItem, BookItemFields } from '../../objects/BookItem';

export interface BookUploadItemProps {
  book: BookItem;
  update(fields: BookItemFields): void;
  remove(): void;
  convert(): void;
}
