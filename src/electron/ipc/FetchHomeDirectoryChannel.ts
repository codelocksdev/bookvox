import { homedir } from 'os';

import { IpcHandlerInterface } from './IpcHandlerInterface';
import { IpcRequest } from '../../shared/requests/IpcRequest';

class FetchHomeDirectoryChannel implements IpcHandlerInterface {
  private readonly name: string = 'fetch-home-directory';

  config(
    event: Electron.CrossProcessExports.IpcMainEvent,
    request: IpcRequest
  ): void {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getChannelName()}_response`;
    }

    event.sender.send(
      request.responseChannel,
      'No config action for this channel'
    );
  }

  getChannelName(): string {
    return this.name;
  }

  getConfigChannelName(): string {
    return `${this.name}-config`;
  }

  handle(
    event: Electron.CrossProcessExports.IpcMainEvent,
    request: IpcRequest
  ): void {
    const homeDir = homedir();

    if (!request.responseChannel) {
      request.responseChannel = `${this.getChannelName()}_response`;
    }

    event.sender.send(request.responseChannel, homeDir);
  }
}

export default FetchHomeDirectoryChannel;
