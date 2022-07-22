import { getFileText, makeChunks } from './utils';

export default class Book {
  private readonly chapters: string[][];

  private constructor(chapters: string[][]) {
    this.chapters = chapters;
  }

  public getTextChapters(): string[][] {
    return this.chapters;
  }

  public static fromTxtFiles(filePaths: string[]): Book {
    const chapters: string[][] = [];
    filePaths.forEach((file) => chapters.push(makeChunks(getFileText(file))));

    return new Book(chapters);
  }
}
