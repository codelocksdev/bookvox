import { IpcMainEvent } from 'electron';
import { IpcHandlerInterface } from './IpcHandlerInterface';
import { TextFileBatchRequest } from '../../shared/requests/TextFileBatchRequest';
import AbstractAwsServiceChannel from './AbstractAwsServiceChannel';

export default class TextFileBatchChannel
  extends AbstractAwsServiceChannel
  implements IpcHandlerInterface
{
  private readonly name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  getChannelName(): string {
    return this.name;
  }

  handle(event: IpcMainEvent, request: TextFileBatchRequest): void {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getChannelName()}_response`;
    }

    event.sender.send(request.responseChannel, {
      kernel: 'yo yo yo',
    });
  }
}
