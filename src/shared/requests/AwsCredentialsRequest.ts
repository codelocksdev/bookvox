import { IpcRequest } from './IpcRequest';
import { AwsCredentials } from '../types/AwsCredentials';

export interface AwsCredentialsRequest extends IpcRequest {
  params: AwsCredentials;
}
