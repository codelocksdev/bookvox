import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export const getAwsCredentials = createSelector(
  (state: RootState) => {
    const { accessKeyId, secretAccessKey } = state.settings;
    return { accessKeyId, secretAccessKey };
  },
  (credentials) => credentials
);

export const isAwsConfigured = createSelector(
  getAwsCredentials,
  (credentials) => {
    const { accessKeyId, secretAccessKey } = credentials;
    return accessKeyId !== '' && secretAccessKey !== '';
  }
);
