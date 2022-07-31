import { Icon, Intent, Position, Tooltip } from '@blueprintjs/core';
import styled from 'styled-components';
import Region from '../../../shared/types/Region';
import DropdownChooser from '../DropdownChooser';
import Label from '../Label';
import KeysInput from './credentials/KeysInput';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 32px;
`;

interface AwsSettingsProps {
  region: string;
  setRegion(region: string): void;
}

const AwsSettings = ({
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
        <KeysInput />
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
