import { SynthesizeSpeechOutput } from 'aws-sdk/clients/polly';
import { Polly } from 'aws-sdk';
import { getFileText, makeChunks } from './utils';

export default class Book {
  private readonly chapters: string[][];
  private readonly polly: Polly;

  private constructor(chapters: string[][], polly: Polly) {
    this.chapters = chapters;
    this.polly = polly;
  }

  public getTextChapters(): string[][] {
    return this.chapters;
  }

  public static fromTxtFiles(filePaths: string[], polly: Polly): Book {
    const chapters: string[][] = [];
    filePaths.forEach((file) => chapters.push(makeChunks(getFileText(file))));

    return new Book(chapters, polly);
  }

  private async processTextToAudio(
    text: string
  ): Promise<SynthesizeSpeechOutput> {
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
          if (err) {
            reject(err);
          } else if (!(data.AudioStream instanceof Buffer)) {
            reject(new Error('Returned audio stream is not a buffer.'));
          }
          console.log('chunk processed');
          resolve(data);
        }
      );
    });
  }

  private async processChapter(chapter: string[]): Promise<Buffer> {
    const bufferArray: Buffer[] = [];
    console.log('starting chapter');
    console.log(`numchunks: ${chapter.length}`);
    // eslint-disable-next-line no-restricted-syntax
    for (const chunk of chapter) {
      const audio = await this.processTextToAudio(chunk);
      bufferArray.push(audio.AudioStream as Buffer);
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
