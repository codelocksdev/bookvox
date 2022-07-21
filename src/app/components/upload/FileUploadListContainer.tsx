import styled from 'styled-components';
import { Button, Card, Icon, Intent } from '@blueprintjs/core';

const Container = styled.div``;

const ResetOrSubmit = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const FileUploadListContainer = ({ files }: { files: File[] }) => {
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
              >
                Reset
              </Button>
              <Button
                large
                icon={<Icon icon={'refresh'} size={24} />}
                intent={Intent.PRIMARY}
                style={{ marginLeft: 8, marginRight: 8 }}
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
