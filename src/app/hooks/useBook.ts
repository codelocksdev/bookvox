import { useCallback, useEffect, useMemo, useState } from 'react';
import { Intent } from '@blueprintjs/core';

import IpcService from '../common/ipc/IpcService';
import ChannelNames from '../../shared/ChannelNames';
import { BookUploadItemProps } from '../components/upload/BookUploadItemProps';
import { TextBatchChannelResponse } from '../../shared/responses/TextBatchChannelResponse';
import Toaster from '../components/toasters';

const useBook = ({
  book: { name, files },
  runConvert,
  convertDone,
}: BookUploadItemProps) => {
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
        params: { bookName: name, filePaths: files.map((file) => file.path) },
      }
    );

    if (response.error) throw new Error(response.error);

    setSources(response.audioChapters);
    setProcessing(false);
    setConverted(true);
  }, [name, files, setConverted, setProcessing, setSources, ipcService]);

  useEffect(() => {
    (async function checkAndConvert() {
      if (runConvert && !converted) {
        processBook().catch((e: Error) => {
          Toaster.show({
            message: e.message,
            intent: Intent.DANGER,
            timeout: 8_000,
          });
          setProcessing(false);
          if (convertDone) convertDone();
        });
      }
    })();
  }, [runConvert, converted, processBook, convertDone]);

  useEffect(() => {
    if (converted && convertDone) convertDone();
  }, [converted, convertDone]);

  return { sources, processing, converted, bookName, setName, processBook };
};

export default useBook;
