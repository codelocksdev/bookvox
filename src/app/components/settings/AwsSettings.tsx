import { HTMLSelect, Icon, Intent, Position, Tooltip } from '@blueprintjs/core';
import styled from 'styled-components';
import { ChangeEvent } from 'react';
import TextInput from '../TextInput';
import Region from '../../../shared/types/Region';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
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
  const handleRegionSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
  };

  return (
    <Container>
      <div>
        <div style={{ color: ' #8abbff', fontWeight: 400, marginLeft: 8 }}>
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
        </div>
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
      <div
        style={{
          marginLeft: 32,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ color: ' #8abbff', fontWeight: 400, marginBottom: 8 }}>
          Region
        </div>
        <HTMLSelect large onChange={handleRegionSelect} defaultValue={region}>
          {Object.values(Region).map((choice) => (
            <option key={choice} value={choice}>
              {choice}
            </option>
          ))}
        </HTMLSelect>
      </div>
    </Container>
  );
};

export default AwsSettings;
