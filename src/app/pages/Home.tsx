import UploadWidget from '../components/convert/UploadWidget';
import AwsCredentialsInput from '../components/settings/credentials/AwsCredentialsInput';
import { useAppSelector } from '../common/state/typedReduxMethods';
import { RootState } from '../common/state/store';

const Home = () => {
  const awsConfig = useAppSelector(
    (state: RootState) => state.settings.credentialsVerified
  );

  return <>{(awsConfig && <UploadWidget />) || <AwsCredentialsInput />}</>;
};

export default Home;
