import styled from 'styled-components';
import { FileInput, Intent } from '@blueprintjs/core';
import Dropzone from 'react-dropzone';
import { useState } from 'react';
import FileUploadListContainer from './FileUploadListContainer';
import { InfoToaster } from '../toasters';

const Container = styled.div`
  margin: auto;
  padding: 32px;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
`;

const StyledCard = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-color: #abb3bf;
  border-radius: 8px;
  border-width: 2px;
  border-style: solid;
`;

const UploadWidget = () => {
  const [fileList, setFileList] = useState<File[]>([]);

  const handleDrop = (files: File[]) => {
    setFileList(files);
  };

  return (
    <Container>
      {fileList.length === 0 && (
        <Dropzone
          onDrop={handleDrop}
          accept={{ 'text/html': ['.txt'] }}
          onDropRejected={() => null}
          noClick
        >
          {({ getRootProps, getInputProps }) => (
            <StyledCard
              {...getRootProps({
                onClick: () =>
                  InfoToaster.show({
                    message: 'Drop files to add to conversion list.',
                    intent: Intent.PRIMARY,
                  }),
              })}
            >
              {/* @ts-ignore */}
              <FileInput {...getInputProps()} />
              <p>Drag and drop .txt chapter files here.</p>
            </StyledCard>
          )}
        </Dropzone>
      )}
      <FileUploadListContainer files={fileList} setFiles={setFileList} />
    </Container>
  );
};

export default UploadWidget;
