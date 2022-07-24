import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';

import DropdownChooser from '../DropdownChooser';
import { OutputFormats } from '../../../shared/types/AwsConstants';
import TextInput from '../TextInput';
import Label from '../Label';
import IpcService from '../../common/ipc/IpcService';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  font-size: 20px;
`;

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
      const homeDir = await ipcService.send<string>('fetch-home-directory');
      setHomeDirectory(`${homeDir}\\`);
    })();
  }, [ipcService, setHomeDirectory]);

  return (
    <Container>
      <div>
        <Label>Output</Label>
        <Row>
          {homeDirectory}
          <TextInput
            placeholder={'Output Directory'}
            text={outputDirectory}
            setText={setOutputDirectory}
          />
        </Row>
      </div>
      <DropdownChooser
        label={'File Format'}
        options={OutputFormats}
        selected={OutputFormat}
        setSelection={setOutputFormat}
      />
    </Container>
  );
};

export default OutputSettings;
