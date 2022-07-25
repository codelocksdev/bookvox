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
    if (!this.polly)
      throw new Error('Cannot process book, polly not initialized.');

    const rawBook: Book = Book.fromTxtFiles(
      request.params.filePaths,
      this.pollyParams,
      this.polly
    );

    const audioChapters: Buffer[] = await rawBook.processTextChapters(
      rawBook.getTextChapters()
    );

    const directory = await this.getOutputDirectory('test-book');

    audioChapters.forEach((chapter, index) => {
      fs.writeFileSync(`${directory}/${index}.mp3`, chapter);
    });

    if (!request.responseChannel) {
      request.responseChannel = `${this.getChannelName()}_response`;
    }

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
