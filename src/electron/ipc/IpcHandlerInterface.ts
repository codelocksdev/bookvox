import { IpcMainEvent } from 'electron';
import { IpcRequest } from '../../shared/requests/IpcRequest';

/**
 * Contract for a IPC channel handler. An IPC handler receives receives configuration messages on its config channel name, and handles messages
 * on its main channel name with its handler method. If applicable, it may also send messages on its response channel, if applicable.
 *
 * @since 1.0
 */
export interface IpcHandlerInterface {
  getChannelName(): string;
  getConfigChannelName(): string;
  config(event: IpcMainEvent, request: IpcRequest): void;
  handle(event: IpcMainEvent, request: IpcRequest): void;
}
