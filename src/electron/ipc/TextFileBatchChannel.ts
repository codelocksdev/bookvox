import * as os from 'os';
import path from 'path';
import { IpcMainEvent } from 'electron';
import fs from 'fs';
import { TextFileBatchRequest } from '../../shared/requests/TextFileBatchRequest';
import AbstractAwsServiceChannel from './AbstractAwsServiceChannel';
import Book from '../processing/Book';

export default class TextFileBatchChannel extends AbstractAwsServiceChannel {
  private readonly name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  getChannelName(): string {
    return this.name;
  }

  async handle(
    event: IpcMainEvent,
    request: TextFileBatchRequest
  ): Promise<void> {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getChannelName()}_response`;
    }

    if (!this.polly || !this.awsConfigured()) {
      event.sender.send(request.responseChannel, {
        error:
          'Cannot process book. AWS Polly not initialized. Set AWS credentials in settings and try again.',
      });
      return;
    }

    const rawBook: Book = Book.fromTxtFiles(
      request.params.filePaths,
      this.pollyParams,
      this.polly
    );

    const audioChapters: Buffer[] = await rawBook.processTextChapters();

    const directory = await this.getOutputDirectory('test-book');

    audioChapters.forEach((chapter, index) => {
      fs.writeFileSync(`${directory}/${index}.mp3`, chapter);
    });

    event.sender.send(request.responseChannel, {
      audioChapters: audioChapters.map((chapter) => chapter.toString('base64')),
    });
  }

  private async getOutputDirectory(name: string): Promise<string> {
    const directory = path.join(os.homedir(), `${name}`);

    return new Promise((resolve, reject) => {
      if (!fs.existsSync(directory)) {
        fs.mkdir(directory, (err) => {
          if (err) reject(err);
          resolve(directory);
        });
      }
      resolve(directory);
    });
  }
}
