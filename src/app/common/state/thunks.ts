import { createAsyncThunk } from '@reduxjs/toolkit';
import { Intent } from '@blueprintjs/core';

import IpcService from '../ipc/IpcService';
import ChannelNames from '../../../shared/ChannelNames';
import { IpcResponse } from '../../../shared/responses/IpcResponse';
import { setAwsCredentials } from './settingsSlice';
import Toaster from '../../components/toasters';

// eslint-disable-next-line import/prefer-default-export
export const updateAwsCredentials = createAsyncThunk(
  'settings/verify-and-set-aws-credentials',
  async (
    {
      accessKeyId,
      secretAccessKey,
    }: { accessKeyId: string; secretAccessKey: string },
    thunkAPI
  ) => {
    const ipcService = new IpcService();
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

    thunkAPI.dispatch(
      setAwsCredentials({
        accessKeyId,
        secretAccessKey,
        credentialsVerified,
      })
    );
  }
);
