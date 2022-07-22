import fs from 'fs';

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
  return fs
    .readFileSync(path)
    .toString()
    .replaceAll('\n', ' ')
    .replaceAll('\r', ' ');
};
