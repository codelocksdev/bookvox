import { Label, CenteredCard } from '../../styled';
import KeysInput from './KeysInput';

const AwsCredentialsInput = () => {
  return (
    <CenteredCard>
      <Label>
        <h2>Enter your AWS credentials to proceed.</h2>
      </Label>
      <KeysInput />
    </CenteredCard>
  );
};

export default AwsCredentialsInput;
