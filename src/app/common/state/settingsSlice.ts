import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import Settings from '../types/Settings';

// Define the initial state using that type
const initialState: Settings = {
  accessKeyId: '',
  secretAccessKey: '',
  region: 'us-east-1',
  Engine: 'neural',
  LanguageCode: 'en-US',
  SampleRate: '22050',
  TextType: 'ssml',
  outputDirectory: 'bookvox',
  OutputFormat: 'mp3',
  VoiceId: 'Salli',
  speed: '95%',
};

export const settingsSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<{ [key: string]: string }>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
