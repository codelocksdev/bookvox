import { AwsCredentials } from '../../shared/types/AwsCredentials';
import UploadWidget from '../components/upload/UploadWidget';
import AwsCredentialsInput from '../components/AwsCredentialsInput';

const Home = () => {
  const awsCredentials: AwsCredentials = {
    clientId: '',
    clientSecret: '',
  };
  return <>{(awsCredentials && <UploadWidget />) || <AwsCredentialsInput />}</>;
};

export default Home;
