import styled from 'styled-components';
import { Button, Card, Icon, Intent, ProgressBar } from '@blueprintjs/core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';

import IpcService from '../../common/ipc/IpcService';
import Toaster from '../toasters';

const Container = styled.div``;

const ResetOrSubmit = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const FileUploadListContainer = ({
  files,
  setFiles,
}: {
  files: File[];
  setFiles: (files: File[]) => void;
}) => {
  const [processing, setProcessing] = useState(false);
  const [converted, setConverted] = useState(false);
  const [streams, setStreams] = useState<string[]>([]);

  const ipcService = useMemo(() => new IpcService(), []);

  const onSubmit = () => {
    setProcessing(true);
    const filePaths = files.map((file) => file.path);
    ipcService
      .send<{ audioChapters: string[] }>('batch-text', {
        params: {
          filePaths,
        },
      })
      .then((response) => {
        setProcessing(false);
        setConverted(true);
        setStreams(response.audioChapters);
        console.log(response);
        return null;
      })
      .catch((err) => console.log(err));
  };

  const onReset = useCallback(() => {
    setFiles([]);
  }, [setFiles]);

  useEffect(() => {
    if (converted) {
      Toaster.show({
        message: 'Files Converted Successfully!',
        intent: Intent.SUCCESS,
      });
    }
  }, [converted, onReset]);

  return (
    <>
      {files.length !== 0 && (
        <Card style={{ flex: 1 }}>
          <Container>
            {processing ? (
              <ProgressBar />
            ) : (
              <>
                <ul>
                  {files.map((file) => (
                    <li>{file.name}</li>
                  ))}
                </ul>
                <ResetOrSubmit>
                  <Button
                    large
                    icon={<Icon icon={'cross'} size={24} />}
                    intent={Intent.DANGER}
                    style={{ marginLeft: 8, marginRight: 8 }}
                    onClick={onReset}
                  >
                    Reset
                  </Button>
                  <Button
                    large
                    icon={<Icon icon={'refresh'} size={24} />}
                    intent={Intent.PRIMARY}
                    style={{ marginLeft: 8, marginRight: 8 }}
                    onClick={onSubmit}
                  >
                    Convert
                  </Button>
                </ResetOrSubmit>
              </>
            )}
          </Container>
          {streams.length !== 0 &&
            streams.map((stream) => (
              <ReactAudioPlayer
                src={`data:audio/wav;base64,${stream}`}
                controls
              />
            ))}
        </Card>
      )}
    </>
  );
};

export default FileUploadListContainer;
