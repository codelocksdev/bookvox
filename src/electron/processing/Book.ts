import { Polly } from 'aws-sdk';
import { getFileText, makeChunks, processTextToAudio } from './utils';
import { PollyParams } from '../../shared/types/PollyParams';

export default class Book {
  private readonly chapters: string[][];
  private readonly pollyParams: PollyParams;
  private readonly polly: Polly;

  private constructor(
    chapters: string[][],
    pollyParams: PollyParams,
    polly: Polly
  ) {
    this.chapters = chapters;
    this.pollyParams = pollyParams;
    this.polly = polly;
  }

  public getTextChapters(): string[][] {
    return this.chapters;
  }

  public static fromTxtFiles(
    filePaths: string[],
    pollyParams: PollyParams,
    polly: Polly
  ): Book {
    const chapters: string[][] = [];
    filePaths.forEach((file) => chapters.push(makeChunks(getFileText(file))));

    return new Book(chapters, pollyParams, polly);
  }

  private async processChapter(chapter: string[]): Promise<Buffer> {
    const bufferArray: Buffer[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const chunk of chapter) {
      if (chunk.length > 2999) throw new Error('Chapter text too long.');

      const audio = await processTextToAudio(
        chunk,
        this.pollyParams,
        this.polly
      );
      bufferArray.push(audio);
    }

    return Buffer.concat(bufferArray);
  }

  public async processTextChapters(chapters: string[][]): Promise<Buffer[]> {
    const chapterAudioBuffers: Buffer[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const chapter of chapters) {
      const chapterBuffer = await this.processChapter(chapter);
      chapterAudioBuffers.push(chapterBuffer);
    }

    return chapterAudioBuffers;
  }
}
