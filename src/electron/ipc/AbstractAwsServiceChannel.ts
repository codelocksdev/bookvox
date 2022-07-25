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

  config(_: IpcMainEvent, request: AwsConfigRequest): void {
    this.awsCredentials = request.params.credentials;
    this.pollyParams = request.params.options;

    this.polly = new AWS.Polly({
      params: { ...defaultPollyParams, ...request.params.options },
      ...this.awsCredentials,
    });

    AWS.config.region = this.awsCredentials.region;
  }

  abstract getChannelName(): string;

  abstract handle(event: IpcMainEvent, request: IpcRequest): void;
}
