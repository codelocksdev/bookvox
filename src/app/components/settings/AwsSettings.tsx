import { Icon, Intent, Position } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';

import Region from '../../../shared/types/Region';
import DropdownChooser from '../DropdownChooser';
import { AwsSettingsCard, Label } from '../styled';
import KeysInput from './credentials/KeysInput';

interface AwsSettingsProps {
  region: string;
  setRegion(region: string): void;
}

const AwsSettings = ({
  region = Region.US_EAST_1,
  setRegion,
}: AwsSettingsProps) => {
  return (
    <AwsSettingsCard>
      <div>
        <Label style={{ color: ' #8abbff', fontWeight: 400, marginLeft: 8 }}>
          Credentials
          <Tooltip2
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
          </Tooltip2>
        </Label>
        <KeysInput />
      </div>
      <DropdownChooser
        label={'Region'}
        options={Object.values(Region)}
        selected={region}
        setSelection={setRegion}
      />
    </AwsSettingsCard>
  );
};

export default AwsSettings;
