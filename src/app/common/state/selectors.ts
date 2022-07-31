import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

// eslint-disable-next-line import/prefer-default-export
export const getAwsCredentials = createSelector(
  (state: RootState) => {
    const { accessKeyId, secretAccessKey } = state.settings;
    return { accessKeyId, secretAccessKey };
  },
  (credentials) => credentials
);
