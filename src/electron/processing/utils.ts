import fs from 'fs';
import { Polly } from 'aws-sdk';
import { PollyParams } from '../../shared/types/PollyParams';

export const makeChunks = (text: string): string[] => {
  const chunks: string[] = [];
  const charLimit = 2999;
  const words = text.split(' ');
  let currentCharCount = 0;
  let wordBuffer: string[] = [];

  words.forEach((word) => {
    if (currentCharCount + word.length + 1 >= charLimit) {
      chunks.push(wordBuffer.join(' '));
      wordBuffer = [];
      currentCharCount = 0;
    } else {
      wordBuffer.push(word);
      currentCharCount += word.length + 1;
    }
  });

  if (wordBuffer.length !== 0) chunks.push(wordBuffer.join(' '));

  return chunks;
};

export const getFileText = (path: string) => {
  return fs.readFileSync(path).toString();
};

export const processTextToAudio = async (
  text: string,
  pollyParams: PollyParams,
  polly: Polly
): Promise<Buffer> => {
  const { OutputFormat, VoiceId, speed } = pollyParams;

  return new Promise((resolve, reject) => {
    polly.synthesizeSpeech(
      {
        Text: `<speak><prosody rate='${speed}'>${text}</prosody></speak>`,
        OutputFormat,
        VoiceId,
      },
      (err, data) => {
        if (err) {
          reject(err);
        } else if (!(data.AudioStream instanceof Buffer)) {
          reject(new Error('Returned audio stream is not a buffer.'));
        }
        resolve(data.AudioStream as Buffer);
      }
    );
  });
};
