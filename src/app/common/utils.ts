import { BookItem } from '../objects/BookItem';
import IpcService from './ipc/IpcService';
import ChannelNames from '../../shared/ChannelNames';
import FileItem from '../objects/FileItem';
import { TextBatchChannelResponse } from '../../shared/responses/TextBatchChannelResponse';

export const SLASH = window.navigator.platform === 'Win32' ? '\\' : '/';

export const getSrc = (base64: string) => {
  const header = 'data:audio/wav;base64,';

  return `${header}${base64}`;
};

export const generateUUID = () => {
  const digits: string[] = [];

  for (let i = 0; i < 32; i += 1) {
    const randomInteger = Math.floor(Math.random() * 16);
    const randomHex = randomInteger.toString(16);
    digits.push(randomHex);

    if (i === 7 || i === 11 || i === 15) digits.push('-');
  }

  return digits.join('');
};

export const bookValid = (book: BookItem): boolean => {
  const { name, files } = book;
  return name !== '' && files.size > 0;
};

export const fetchHomeDir = async (): Promise<string> => {
  const ipcService = new IpcService();
  const homeDir = await ipcService.send<string>(ChannelNames.HOME_DIRECTORY);
  return `${homeDir}${SLASH}`;
};

export const updateFilesWithAudioSrc = (
  files: Map<string, FileItem>,
  audio: { audioSrc: string; path: string }[]
): Map<string, FileItem> => {
  const newFiles = new Map(files);

  audio.forEach((src) => {
    const file = newFiles.get(src.path);
    if (file) {
      newFiles.set(
        src.path,
        FileItem.fromFileItemAndSource(file, src.audioSrc)
      );
    }
  });
  return newFiles;
};

export const processTextBatchChannelResponse = (
  book: BookItem,
  { error, audioChapters }: TextBatchChannelResponse
): BookItem => {
  const newBook: BookItem = { ...book };
  if (error) {
    throw new Error(error);
  } else {
    newBook.files = updateFilesWithAudioSrc(book.files, audioChapters);
  }
  return newBook;
};
