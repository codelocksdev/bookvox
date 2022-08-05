import path from 'path';
import { IpcMainEvent } from 'electron';
import fs from 'fs';
import { TextFileBatchRequest } from '../../shared/requests/TextFileBatchRequest';
import AbstractAwsServiceChannel from './AbstractAwsServiceChannel';
import Book from '../processing/Book';
import { getOutputDirectory } from '../processing/utils';

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
    {
      responseChannel,
      params: { bookName, bookvoxMainDirectory, fileInfo },
    }: TextFileBatchRequest
  ): Promise<void> {
    const channel = responseChannel || `${this.getChannelName()}_response`;

    if (!this.polly || !this.awsConfigured()) {
      event.sender.send(channel, {
        error:
          'Cannot process book. AWS Polly not initialized. Set AWS credentials in settings and try again.',
      });
      return;
    }

    const rawBook: Book = Book.fromTxtFiles(
      fileInfo,
      this.pollyParams,
      this.polly
    );

    const audioChapters: Buffer[] = await rawBook.processTextChapters();

    const directory = getOutputDirectory(
      path.join(bookvoxMainDirectory, bookName)
    );

    audioChapters.forEach((chapter, index) => {
      fs.writeFileSync(
        `${directory}/${fileInfo[index].name.replace('.txt', '')}.mp3`,
        chapter
      );
    });

    event.sender.send(channel, {
      audioChapters: audioChapters.map((chapter, index) => ({
        audioSrc: chapter.toString('base64'),
        path: fileInfo[index].path,
      })),
    });
  }
}
