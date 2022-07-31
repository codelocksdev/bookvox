import { IpcResponse } from './IpcResponse';

export interface TextBatchChannelResponse extends IpcResponse {
  audioChapters: string[];
}
