import { IpcMainEvent } from 'electron';
import { IpcHandlerInterface } from './IpcHandlerInterface';
import { TextFileBatchRequest } from '../../shared/requests/TextFileBatchRequest';
import AbstractAwsServiceChannel from './AbstractAwsServiceChannel';
import Book from '../processing/Book';
import { processTextChapters } from '../processing/utils';
import fs from 'fs';

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

    const audioChapters: unknown[] = processTextChapters(
      rawBook.getTextChapters()
    );

    if (!request.responseChannel) {
      request.responseChannel = `${this.getChannelName()}_response`;
    }

    event.sender.send(request.responseChannel, {
      audioChapters: fs.readFileSync(request.params.filePaths).toString(),
    });
  }
}
