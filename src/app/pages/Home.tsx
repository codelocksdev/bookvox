import { useEffect, useMemo } from 'react';
import { AwsCredentials } from '../../shared/types/AwsCredentials';
import UploadWidget from '../components/upload/UploadWidget';
import AwsCredentialsInput from '../components/AwsCredentialsInput';
import IpcService from '../common/ipc/IpcService';
import ChannelNames from '../../shared/ChannelNames';

const Home = () => {
  const credentials: AwsCredentials = useMemo(
    () => ({
      accessKeyId: '',
      secretAccessKey: '',
      region: 'us-west-2',
    }),
    []
  );
  const ipcService = useMemo(() => new IpcService(), []);

  useEffect(() => {
    ipcService.send(ChannelNames.AWS_CONFIG, { params: { credentials } });
  }, [credentials, ipcService]);

  return <>{(credentials && <UploadWidget />) || <AwsCredentialsInput />}</>;
};

export default Home;
