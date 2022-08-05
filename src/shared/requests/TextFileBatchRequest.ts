import { IpcRequest } from './IpcRequest';
import { FileInfo } from '../types/FileInfo';
import { BookItem } from '../../app/objects/BookItem';

export interface TextFileBatchRequest extends IpcRequest {
  params: {
    bookvoxMainDirectory: string;
    bookName: string;
    fileInfo: FileInfo[];
  };
}

export const createTxtBatchRequest = (
  book: BookItem,
  bookvoxMainDirectory: string
): TextFileBatchRequest => {
  const files = Array.from(book.files.values());
  return {
    params: {
      bookvoxMainDirectory,
      bookName: book.name,
      fileInfo: files.map((file) => file.getInfo()),
    },
  };
};
