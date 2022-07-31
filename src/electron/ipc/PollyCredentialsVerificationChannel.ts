import { AWSError } from 'aws-sdk';

import AbstractAwsServiceChannel from './AbstractAwsServiceChannel';
import { IpcRequest } from '../../shared/requests/IpcRequest';
import { processTextToAudio } from '../processing/utils';

export default class PollyCredentialsVerificationChannel extends AbstractAwsServiceChannel {
  private readonly name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  getChannelName(): string {
    return this.name;
  }

  async handle(
    event: Electron.CrossProcessExports.IpcMainEvent,
    request: IpcRequest
  ): Promise<void> {
    const responseChannel =
      request.responseChannel || `${this.getChannelName()}_response`;

    if (!this.polly || !this.awsConfigured()) {
      event.sender.send(responseChannel, {
        error:
          'Cannot process book. AWS Polly not initialized. Set AWS credentials in settings and try again.',
      });
      return;
    }

    processTextToAudio('Verified.', this.pollyParams, this.polly)
      .then(() => event.sender.send(responseChannel, {}))
      .catch((err: AWSError) =>
        event.sender.send(responseChannel, {
          error: err.message,
        })
      );
  }
}
