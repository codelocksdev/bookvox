import { Icon, Intent, Position, Tooltip } from '@blueprintjs/core';
import styled from 'styled-components';

import TextInput from '../TextInput';
import Region from '../../../shared/types/Region';
import DropdownChooser from '../DropdownChooser';
import Label from '../Label';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 32px;
`;

interface AwsSettingsProps {
  accessKeyId?: string;
  setAccessKeyId(key: string): void;
  secretAccessKey?: string;
  setSecretAccessKey(key: string): void;
  region: string;
  setRegion(region: string): void;
}

const AwsSettings = ({
  accessKeyId,
  setAccessKeyId,
  secretAccessKey,
  setSecretAccessKey,
  region = Region.US_EAST_1,
  setRegion,
}: AwsSettingsProps) => {
  return (
    <Container>
      <div>
        <Label style={{ color: ' #8abbff', fontWeight: 400, marginLeft: 8 }}>
          Credentials
          <Tooltip
            content={
              'AWS access key and secret credentials. Click for more information on obtaining an access key.'
            }
            position={Position.RIGHT}
          >
            <Icon
              icon={'info-sign'}
              intent={Intent.PRIMARY}
              style={{ marginLeft: 8 }}
            />
          </Tooltip>
        </Label>
        <TextInput
          placeholder={'Access Key Id'}
          text={accessKeyId || ''}
          setText={setAccessKeyId}
        />
        <TextInput
          placeholder={'Secret Access Key'}
          text={secretAccessKey || ''}
          setText={setSecretAccessKey}
        />
      </div>
      <DropdownChooser
        label={'Region'}
        options={Object.values(Region)}
        selected={region}
        setSelection={setRegion}
      />
    </Container>
  );
};

export default AwsSettings;
