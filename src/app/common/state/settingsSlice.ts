import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import Settings from '../types/Settings';

// Define the initial state using that type
const initialState: Settings = {
  accessKeyId: '',
  secretAccessKey: '',
  credentialsVerified: false,
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

const settingsSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<{ [key: string]: string }>) => {
      return { ...state, ...action.payload };
    },
    setAwsCredentials: (
      state,
      {
        payload: { accessKeyId, secretAccessKey, credentialsVerified },
      }: PayloadAction<{
        accessKeyId: string;
        secretAccessKey: string;
        credentialsVerified: boolean;
      }>
    ) => {
      state.accessKeyId = accessKeyId;
      state.secretAccessKey = secretAccessKey;
      state.credentialsVerified = credentialsVerified;
    },
  },
});

export const { setSettings, setAwsCredentials } = settingsSlice.actions;

export default settingsSlice.reducer;
