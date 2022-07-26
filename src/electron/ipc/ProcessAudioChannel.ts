import AbstractAwsServiceChannel from './AbstractAwsServiceChannel';
import { processTextToAudio } from '../processing/utils';
import { ProcessAudioRequest } from '../../shared/requests/ProcessAudioRequest';

class ProcessAudioChannel extends AbstractAwsServiceChannel {
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
    request: ProcessAudioRequest
  ): Promise<void> {
    if (!this.polly)
      throw new Error('Cannot process book, polly not initialized.');

    const audio = await processTextToAudio(
      request.params,
      this.pollyParams,
      this.polly
    );

    if (!request.responseChannel) {
      request.responseChannel = `${this.getChannelName()}_response`;
    }

    event.sender.send(request.responseChannel, {
      base64EncodedAudio: audio.toString('base64'),
      format: this.pollyParams.OutputFormat,
    });
  }
}

export default ProcessAudioChannel;
