import { IpcMainEvent } from 'electron';
import { Polly } from 'aws-sdk';
import { IpcHandlerInterface } from './IpcHandlerInterface';
import { IpcRequest } from '../../shared/requests/IpcRequest';
import { AwsConfigRequest } from '../../shared/requests/AwsConfigRequest';
import { AwsCredentials } from '../../shared/types/AwsCredentials';
import { defaultPollyParams } from '../../shared/types/PollyParams';

export default abstract class AbstractAwsServiceChannel
  implements IpcHandlerInterface
{
  protected readonly initChannel: string = 'aws-credentials';
  protected awsCredentials?: AwsCredentials;
  protected polly?: Polly;

  getConfigChannelName(): string {
    return this.initChannel;
  }

  config(_: IpcMainEvent, request: AwsConfigRequest): void {
    this.awsCredentials = request.params.credentials;

    this.polly = new Polly({
      params: { ...defaultPollyParams, ...request.options },
      ...this.awsCredentials,
    });
  }

  abstract getChannelName(): string;

  abstract handle(event: IpcMainEvent, request: IpcRequest): void;
}
