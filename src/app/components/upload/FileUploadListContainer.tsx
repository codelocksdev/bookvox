import styled from 'styled-components';
import { Button, Card, Icon, Intent } from '@blueprintjs/core';
import IpcService from '../../common/ipc/IpcService';
import { useMemo } from 'react';

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
  const ipcService = useMemo(() => new IpcService(), []);
  const onSubmit = () => {
    const filePaths = files.map((file) => file.path);
    ipcService
      .send('batch-text', {
        params: {
          filePaths,
        },
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  const onReset = () => {
    setFiles([]);
  };
  return (
    <>
      {files.length !== 0 && (
        <Card style={{ flex: 1 }}>
          <Container>
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
          </Container>
        </Card>
      )}
    </>
  );
};

export default FileUploadListContainer;
