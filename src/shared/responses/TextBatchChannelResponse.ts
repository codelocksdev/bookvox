import { IpcResponse } from './IpcResponse';

export interface TextBatchChannelResponse extends IpcResponse {
  audioChapters: { audioSrc: string; path: string }[];
}
