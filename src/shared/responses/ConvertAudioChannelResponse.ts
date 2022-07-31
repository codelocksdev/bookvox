import { IpcResponse } from './IpcResponse';

export interface ConvertAudioChannelResponse extends IpcResponse {
  base64EncodedAudio: string;
  format: string;
}
