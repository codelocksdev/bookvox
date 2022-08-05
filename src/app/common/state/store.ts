import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';

import settingsReducer from './settingsSlice';
import libraryReducer from './librarySlice';

export const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    library: libraryReducer,
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
