import styled from 'styled-components';

import { Card } from '@blueprintjs/core';

import Label from '../../Label';
import KeysInput from './KeysInput';

const Container = styled(Card)`
  margin: auto;
`;

const AwsCredentialsInput = () => {
  return (
    <Container>
      <Label>
        <h2>Enter your AWS credentials to proceed.</h2>
      </Label>
      <KeysInput />
    </Container>
  );
};

export default AwsCredentialsInput;
