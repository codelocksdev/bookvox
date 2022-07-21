export const processTextToAudio = (text: string): unknown => {
  if (text.length > 2999) throw new Error('Chapter text too long.');
  return 'placeholder';
};

export const processTextChapters = (chapters: string[]): unknown[] => {
  return chapters.map((chapter) => processTextToAudio(chapter));
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
