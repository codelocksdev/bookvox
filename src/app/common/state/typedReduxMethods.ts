import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import {
  AsyncThunk,
  AsyncThunkOptions,
  AsyncThunkPayloadCreator,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import type { AppDispatch, RootState } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type TypedCreateAsyncThunk<ThunkApiConfig> = <Returned, ThunkArg = void>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, ThunkApiConfig>,
  options?: AsyncThunkOptions<ThunkArg, ThunkApiConfig>
) => AsyncThunk<Returned, ThunkArg, ThunkApiConfig>;

export const createAppAsyncThunk: TypedCreateAsyncThunk<{
  state: RootState;
}> = createAsyncThunk;
