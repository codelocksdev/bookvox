import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Library } from '../types/Library';
import { BookItem } from '../../objects/BookItem';

const initialState: Library = {
  bookList: {},
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    addOrUpdateBook: (state, { payload }: PayloadAction<BookItem>) => {
      state.bookList[payload.uuid] = payload;
    },
    removeBook: (state, { payload }: PayloadAction<string>) => {
      delete state.bookList[payload];
    },
  },
});

export const { addOrUpdateBook, removeBook } = librarySlice.actions;

export default librarySlice.reducer;
