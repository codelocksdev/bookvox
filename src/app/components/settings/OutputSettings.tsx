import { useEffect, useMemo, useState } from 'react';

import DropdownChooser from '../DropdownChooser';
import { OutputFormats } from '../../../shared/types/AwsConstants';
import TextInput from '../TextInput';
import IpcService from '../../common/ipc/IpcService';
import ChannelNames from '../../../shared/ChannelNames';
import { Label, OutputSettingsCard, OutputSettingsHeader } from '../styled';

const slash = window.navigator.platform === 'Win32' ? '\\' : '/';

interface OutputSettingsProps {
  outputDirectory: string;
  setOutputDirectory(outputDirectory: string): void;
  OutputFormat: string;
  setOutputFormat(format: string): void;
}

const OutputSettings = ({
  OutputFormat,
  setOutputFormat,
  outputDirectory,
  setOutputDirectory,
}: OutputSettingsProps) => {
  const ipcService = useMemo(() => new IpcService(), []);
  const [homeDirectory, setHomeDirectory] = useState<string>('');

  useEffect(() => {
    (async function fetchHomeDir() {
      const homeDir = await ipcService.send<string>(
        ChannelNames.HOME_DIRECTORY
      );
      setHomeDirectory(`${homeDir}${slash}`);
    })();
  }, [ipcService, setHomeDirectory]);

  return (
    <OutputSettingsCard>
      <div>
        <Label>Output</Label>
        <OutputSettingsHeader>
          {homeDirectory}
          <TextInput
            placeholder={'Output Directory'}
            text={outputDirectory}
            setText={setOutputDirectory}
          />
        </OutputSettingsHeader>
      </div>
      <DropdownChooser
        label={'File Format'}
        options={OutputFormats}
        selected={OutputFormat}
        setSelection={setOutputFormat}
      />
    </OutputSettingsCard>
  );
};

export default OutputSettings;
