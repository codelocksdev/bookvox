import { useCallback, useEffect, useMemo, useState } from 'react';
import { Intent } from '@blueprintjs/core';

import IpcService from '../common/ipc/IpcService';
import ChannelNames from '../../shared/ChannelNames';
import { BookUploadItemProps } from '../components/upload/BookUploadItemProps';
import { TextBatchChannelResponse } from '../../shared/responses/TextBatchChannelResponse';
import Toaster from '../components/toasters';
import { useAppSelector } from '../common/state/hooks';
import { RootState } from '../common/state/store';

const useBook = ({ book, runConvert, convertDone }: BookUploadItemProps) => {
  const { name, files } = book;
  const bookvoxMainDirectory = useAppSelector(
    (state: RootState) => state.settings.outputDirectory
  );
  const ipcService = useMemo(() => new IpcService(), []);
  const [bookName, setName] = useState(name);
  const [sources, setSources] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);
  const [converted, setConverted] = useState(false);

  const processBook = useCallback(async () => {
    setProcessing(true);
    const response = await ipcService.send<TextBatchChannelResponse>(
      ChannelNames.PROCESS_TEXT_FILES_BATCH,
      {
        params: {
          bookvoxMainDirectory,
          bookName: name,
          fileInfo: files.map((file) => file.getInfo()),
        },
      }
    );

    if (response.error) throw new Error(response.error);

    setSources(response.audioChapters);
    setProcessing(false);
    setConverted(true);
  }, [
    name,
    files,
    setConverted,
    setProcessing,
    setSources,
    ipcService,
    bookvoxMainDirectory,
  ]);

  const convert = useCallback(() => {
    processBook().catch((e: Error) => {
      Toaster.show({
        message: e.message,
        intent: Intent.DANGER,
        timeout: 8_000,
      });
      setProcessing(false);
      if (convertDone) convertDone();
    });
  }, [processBook, setProcessing, convertDone]);

  useEffect(() => {
    if (runConvert && !converted) {
      convert();
    }
  }, [runConvert, converted, convert]);

  useEffect(() => {
    if (converted && convertDone) convertDone();
  }, [converted, convertDone]);

  return { book, sources, processing, converted, bookName, setName, convert };
};

export default useBook;
