import BookItem from '../../objects/BookItem';

export interface BookUploadItemProps {
  book: BookItem;
  runConvert?: boolean;
  convertDone?(): void;
}
