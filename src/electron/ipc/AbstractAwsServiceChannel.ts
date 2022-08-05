import { IpcMainEvent } from 'electron';
import AWS from 'aws-sdk';
import { IpcHandlerInterface } from './IpcHandlerInterface';
import { IpcRequest } from '../../shared/requests/IpcRequest';
import { AwsConfigRequest } from '../../shared/requests/AwsConfigRequest';
import { AwsCredentials } from '../../shared/types/AwsCredentials';
import {
  defaultPollyParams,
  PollyParams,
} from '../../shared/types/PollyParams';
import ChannelNames from '../../shared/ChannelNames';

export default abstract class AbstractAwsServiceChannel
  implements IpcHandlerInterface
{
  protected readonly initChannel: string = ChannelNames.AWS_CONFIG;
  protected awsCredentials!: AwsCredentials;
  protected pollyParams!: PollyParams;

  protected polly?: AWS.Polly;

  getConfigChannelName(): string {
    return this.initChannel;
  }

  config(event: IpcMainEvent, request: AwsConfigRequest): void {
    const responseChannel =
      request.responseChannel || `${this.getConfigChannelName()}_response`;

    this.awsCredentials = request.params.credentials;
    this.pollyParams = request.params.options || defaultPollyParams;

    this.polly = new AWS.Polly({
      params: { ...defaultPollyParams, ...request.params.options },
      ...this.awsCredentials,
    });

    AWS.config.region = this.awsCredentials.region;
    event.sender.send(responseChannel);
  }

  protected awsConfigured(): boolean {
    return (
      this.awsCredentials &&
      !(this.awsCredentials.accessKeyId === '') &&
      !(this.awsCredentials.secretAccessKey === '')
    );
  }

  abstract getChannelName(): string;

  abstract handle(event: IpcMainEvent, request: IpcRequest): void;
}
