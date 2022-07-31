import UploadWidget from '../components/upload/UploadWidget';
import AwsCredentialsInput from '../components/AwsCredentialsInput';
import { useAppSelector } from '../common/state/hooks';
import { isAwsConfigured } from '../common/state/selectors';

const Home = () => {
  const awsConfig = useAppSelector(isAwsConfigured);

  return <>{(awsConfig && <UploadWidget />) || <AwsCredentialsInput />}</>;
};

export default Home;
