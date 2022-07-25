import { IpcRequest } from './IpcRequest';
import { AwsCredentials } from '../types/AwsCredentials';
import { PollyParams } from '../types/PollyParams';

export interface AwsConfigRequest extends IpcRequest {
  params: {
    credentials: AwsCredentials;
    options: PollyParams;
  };
}
