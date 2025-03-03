import { Polly } from 'aws-sdk';
import { getFileText, makeChunks, processTextToAudio } from './utils';
import { PollyParams } from '../../shared/types/PollyParams';
import { FileInfo } from '../../shared/types/FileInfo';

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
    filePaths: FileInfo[],
    pollyParams: PollyParams,
    polly: Polly
  ): Book {
    const chapters: string[][] = [];
    filePaths.forEach((file) =>
      chapters.push(makeChunks(getFileText(file.path)))
    );

    return new Book(chapters, pollyParams, polly);
  }

  private async processChapter(chapter: string[]): Promise<Buffer> {
    const bufferArray: Buffer[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const chunk of chapter) {
      if (chunk.length > 2999) throw new Error('Chapter text too long.');

      try {
        const audio = await processTextToAudio(
          chunk,
          this.pollyParams,
          this.polly
        );
        bufferArray.push(audio);
      } catch (e: unknown) {
        if (typeof e === 'string') {
          throw new Error(e);
        } else if (e instanceof Error) {
          throw new Error(e.message);
        }
      }
    }

    return Buffer.concat(bufferArray);
  }

  public async processTextChapters(): Promise<Buffer[]> {
    const chapterAudioBuffers: Buffer[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const chapter of this.chapters) {
      const chapterBuffer = await this.processChapter(chapter);
      chapterAudioBuffers.push(chapterBuffer);
    }

    return chapterAudioBuffers;
  }
}
