import {
  addListener,
  TypedAddListener,
  TypedStartListening,
} from '@reduxjs/toolkit';
import { setSettings } from './settingsSlice';
import { configAws } from './thunks';
import { AppDispatch, listenerMiddleware, RootState } from './store';

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening;

export const addAppListener = addListener as TypedAddListener<
  RootState,
  AppDispatch
>;

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
startAppListening({
  actionCreator: setSettings,
  effect: async (_, { dispatch, getState }) => {
    const {
      settings: { accessKeyId, secretAccessKey },
    } = getState();

    dispatch(configAws({ accessKeyId, secretAccessKey }));
  },
});
