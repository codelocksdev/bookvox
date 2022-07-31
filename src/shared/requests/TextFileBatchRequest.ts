import { IpcRequest } from './IpcRequest';
import { FileInfo } from '../types/FileInfo';

export interface TextFileBatchRequest extends IpcRequest {
  params: {
    bookvoxMainDirectory: string;
    bookName: string;
    fileInfo: FileInfo[];
  };
}
