import { IpcMainEvent } from 'electron';

import { IpcHandlerInterface } from './IpcHandlerInterface';
import { TextFileBatchRequest } from '../../shared/requests/TextFileBatchRequest';
import AbstractAwsServiceChannel from './AbstractAwsServiceChannel';
import Book from '../processing/Book';

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
    const rawBook: Book = Book.fromTxtFiles(request.params.filePaths);

    const audioChapters: unknown[] = this.processTextChapters(
      rawBook.getTextChapters()
    );

    if (!request.responseChannel) {
      request.responseChannel = `${this.getChannelName()}_response`;
    }

    event.sender.send(request.responseChannel, {
      audioChapters,
    });
  }

  private processTextToAudio(text: string): unknown {
    if (text.length > 2999) throw new Error('Chapter text too long.');
    if (!this.polly) throw new Error('Polly has not been initialized.');

    return new Promise((resolve, reject) => {
      this.polly?.synthesizeSpeech(
        {
          Text: `<speak><prosody rate='95%'>${text}</prosody></speak>`,
          OutputFormat: 'mp3',
          VoiceId: 'Salli',
        },
        (err, data) => {
          if (err) reject(err);

          resolve(data);
        }
      );
    });
  }

  private processChapter(chapter: string[]) {}

  private processTextChapters(chapters: string[][]): unknown[] {
    return chapters.map((chapter) => this.processChapter(chapter));
  }
}
