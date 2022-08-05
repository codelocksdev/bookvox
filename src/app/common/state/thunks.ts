import { Intent } from '@blueprintjs/core';

import IpcService from '../ipc/IpcService';
import ChannelNames from '../../../shared/ChannelNames';
import { IpcResponse } from '../../../shared/responses/IpcResponse';
import { setAwsCredentials } from './settingsSlice';
import Toaster from '../../components/toasters';
import { addOrUpdateBook } from './librarySlice';
import { TextBatchChannelResponse } from '../../../shared/responses/TextBatchChannelResponse';
import { processTextBatchChannelResponse } from '../utils';
import { BookItem } from '../../objects/BookItem';
import { createTxtBatchRequest } from '../../../shared/requests/TextFileBatchRequest';
import { createAppAsyncThunk } from './typedReduxMethods';

const ipcService = new IpcService();

export const configAws = createAppAsyncThunk<
  void,
  { accessKeyId: string; secretAccessKey: string }
>(`polly/config`, async ({ accessKeyId, secretAccessKey }, { getState }) => {
  const {
    settings: { region, VoiceId, OutputFormat, Engine, speed, outputDirectory },
  } = getState();

  if (accessKeyId && secretAccessKey && region) {
    await ipcService.send(ChannelNames.AWS_CONFIG, {
      params: {
        credentials: { accessKeyId, secretAccessKey, region },
        options: { VoiceId, OutputFormat, Engine, speed, outputDirectory },
      },
    });
  }
});

export const updateAwsCredentials = createAppAsyncThunk<
  void,
  { accessKeyId: string; secretAccessKey: string }
>(
  'settings/verify-and-set-aws-credentials',
  async (
    {
      accessKeyId,
      secretAccessKey,
    }: { accessKeyId: string; secretAccessKey: string },
    { dispatch }
  ) => {
    await dispatch(configAws({ accessKeyId, secretAccessKey }));

    const { error } = await ipcService.send<IpcResponse>(
      ChannelNames.VERIFY_AWS
    );
    const credentialsVerified = !error;
    if (error) {
      Toaster.show({ message: error, intent: Intent.DANGER });
    } else {
      Toaster.show({
        message: 'AWS Polly Credentials Verified Successfully!',
        intent: Intent.SUCCESS,
      });
    }

    dispatch(
      setAwsCredentials({
        accessKeyId,
        secretAccessKey,
        credentialsVerified,
      })
    );
  }
);

const setProcessing = createAppAsyncThunk<void, BookItem>(
  'library/set-processing',
  (book, { dispatch }) => {
    dispatch(
      addOrUpdateBook({
        ...book,
        processing: true,
      })
    );
  }
);

const closeBook = createAppAsyncThunk<void, BookItem>(
  'library/close-book',
  (book, { dispatch }) => {
    dispatch(
      addOrUpdateBook({
        ...book,
        processing: false,
        converted: true,
      })
    );
  }
);

const cancelBook = createAppAsyncThunk<void, BookItem>(
  'library/cancel-book-convert',
  (book, { dispatch }) => {
    dispatch(
      addOrUpdateBook({
        ...book,
        processing: false,
        converted: false,
      })
    );
  }
);

export const convertBook = createAppAsyncThunk<
  void,
  { book: BookItem; ipcService: IpcService }
>('library/convert-book', async ({ book }, { dispatch, getState }) => {
  const { converted } = book;
  const bookvoxMainDirectory = getState().settings.outputDirectory;

  if (!converted) {
    dispatch(setProcessing(book));

    ipcService
      .send<TextBatchChannelResponse>(
        ChannelNames.PROCESS_TEXT_FILES_BATCH,
        createTxtBatchRequest(book, bookvoxMainDirectory)
      )
      .then((response) => processTextBatchChannelResponse(book, response))
      .then((newBook) => dispatch(closeBook(newBook)))
      .catch((err) => dispatch(cancelBook({ ...book, processingError: err })));
  }
});

export const convertQueue = createAppAsyncThunk(
  'library/convert-queue',
  async (_arg, { getState, dispatch }) => {
    const {
      library: { bookList },
    } = getState();

    const books: BookItem[] = Object.values(bookList);

    books.forEach((book) => {
      dispatch(convertBook({ book, ipcService }));
    });
  }
);
