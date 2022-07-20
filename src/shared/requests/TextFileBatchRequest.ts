import { IpcRequest } from './IpcRequest';

export interface TextFileBatchRequest extends IpcRequest {
  params: {
    directoryPath: string;
  };
}
