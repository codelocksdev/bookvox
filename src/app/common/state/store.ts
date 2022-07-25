import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import settingsReducer, { setSettings } from './settingsSlice';
import IpcService from '../ipc/IpcService';

const listenerMiddleware = createListenerMiddleware();
const ipcService = new IpcService();

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
listenerMiddleware.startListening({
  actionCreator: setSettings,
  effect: async (_, listenerApi) => {
    const {
      settings: {
        accessKeyId,
        secretAccessKey,
        region,
        VoiceId,
        OutputFormat,
        Engine,
        speed,
        outputDirectory,
      },
    } = listenerApi.getState() as RootState;

    if (accessKeyId && secretAccessKey && region) {
      ipcService
        .send('aws-credentials', {
          params: {
            credentials: { accessKeyId, secretAccessKey, region },
            options: { VoiceId, OutputFormat, Engine, speed, outputDirectory },
          },
        })
        .then(() => null)
        .catch(() => {
          // todo
        });
    }

    // Pause until action dispatched or state changed
    // if (await listenerApi.condition(matchSomeAction)) {
    // }
  },
});

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
  },
  // Add the listener middleware to the store.
  // NOTE: Since this can receive actions with functions inside,
  // it should go before the serializability check middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
