import styled from 'styled-components';

import { Card } from '@blueprintjs/core';

import Label from './Label';
import TextInput from './TextInput';
import useSettings from '../hooks/useSettings';

const Container = styled(Card)`
  margin: auto;
`;

const AwsCredentialsInput = () => {
  const { setAccessKeyId, setSecretAccessKey, accessKeyId, secretAccessKey } =
    useSettings();

  return (
    <Container>
      <Label>
        <h2>Enter your AWS credentials to proceed.</h2>
      </Label>
      <TextInput
        placeholder={'Access Key Id'}
        text={accessKeyId}
        setText={setAccessKeyId}
      />
      <TextInput
        placeholder={'Secret Access Key'}
        text={secretAccessKey}
        setText={setSecretAccessKey}
      />
    </Container>
  );
};

export default AwsCredentialsInput;
