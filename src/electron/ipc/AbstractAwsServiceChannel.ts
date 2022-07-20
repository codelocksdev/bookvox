import { IpcMainEvent } from 'electron';
import { IpcHandlerInterface } from './IpcHandlerInterface';
import { IpcRequest } from '../../shared/requests/IpcRequest';
import { AwsCredentialsRequest } from '../../shared/requests/AwsCredentialsRequest';
import { AwsCredentials } from '../../shared/types/AwsCredentials';

export default abstract class AbstractAwsServiceChannel
  implements IpcHandlerInterface
{
  protected readonly initChannel: string = 'aws-credentials';
  protected awsCredentials?: AwsCredentials;

  getConfigChannelName(): string {
    return this.initChannel;
  }

  config(_: IpcMainEvent, request: AwsCredentialsRequest): void {
    this.awsCredentials = request.params;
  }

  abstract getChannelName(): string;

  abstract handle(event: IpcMainEvent, request: IpcRequest): void;
}
