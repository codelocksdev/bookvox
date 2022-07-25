import { IpcRequest } from './IpcRequest';

export interface ProcessAudioRequest extends IpcRequest {
  params: string;
}
