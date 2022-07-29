import { IpcRequest } from './IpcRequest';

export interface TextFileBatchRequest extends IpcRequest {
  params: {
    bookName: string;
    filePaths: string[];
  };
}
