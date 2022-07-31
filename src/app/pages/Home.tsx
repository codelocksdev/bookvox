import UploadWidget from '../components/upload/UploadWidget';
import AwsCredentialsInput from '../components/settings/credentials/AwsCredentialsInput';
import { useAppSelector } from '../common/state/hooks';
import { RootState } from '../common/state/store';

const Home = () => {
  const awsConfig = useAppSelector(
    (state: RootState) => state.settings.credentialsVerified
  );

  return <>{(awsConfig && <UploadWidget />) || <AwsCredentialsInput />}</>;
};

export default Home;
