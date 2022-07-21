import { IpcRequest } from './IpcRequest';

export interface TextFileBatchRequest extends IpcRequest {
  params: {
    filePaths: string[];
  };
}
