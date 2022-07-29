import { useCallback, useEffect, useMemo, useState } from 'react';
import IpcService from '../common/ipc/IpcService';
import ChannelNames from '../../shared/ChannelNames';
import { BookUploadItemProps } from '../components/upload/BookUploadItemProps';

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

  const processBook = useCallback(
    () => async () => {
      setProcessing(true);
      const base64Sources = await ipcService.send<string[]>(
        ChannelNames.PROCESS_TEXT_FILES_BATCH,
        {
          params: { bookName: name, filePaths: files.map((file) => file.path) },
        }
      );
      setSources(base64Sources);
      setProcessing(false);
      setConverted(true);
    },
    [name, files, setConverted, setProcessing, setSources, ipcService]
  );

  useEffect(() => {
    (async function checkAndConvert() {
      if (runConvert && !converted) {
        await processBook();
      }
    })();
  }, [runConvert, converted, processBook]);

  useEffect(() => {
    if (converted && convertDone) convertDone();
  }, [converted, convertDone]);

  return { sources, processing, converted, bookName, setName };
};

export default useBook;
