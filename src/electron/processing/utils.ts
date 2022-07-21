import fs from 'fs';

export const processTextToAudio = (text: string): unknown => {
  if (text.length > 2999) throw new Error('Chapter text too long.');
  return text;
};

export const processChapter = (chapter: string[]) => {
  return chapter.map((chunk) => processTextToAudio(chunk));
};

export const processTextChapters = (chapters: string[][]): unknown[] => {
  return chapters.map((chapter) => processChapter(chapter));
};

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

  return chunks;
};

export const getFileText = (path: string) => {
  return fs
    .readFileSync(path)
    .toString()
    .replaceAll('\n', ' ')
    .replaceAll('\r', ' ');
};
