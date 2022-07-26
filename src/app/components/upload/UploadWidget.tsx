import styled from 'styled-components';
import { FileInput, Intent } from '@blueprintjs/core';
import Dropzone from 'react-dropzone';
import { useState } from 'react';
import FileUploadListContainer from './FileUploadListContainer';
import Toaster from '../toasters';
import FileUploadItem from './FileUploadItem';

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
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
  border-color: #abb3bf;
  border-radius: 8px;
  border-width: 2px;
  border-style: solid;
  padding: 16px;
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
                  Toaster.show({
                    message: 'Drop files to add to conversion list.',
                    intent: Intent.PRIMARY,
                  }),
              })}
            >
              {/* @ts-ignore */}
              <FileInput {...getInputProps()} />
              <p>Drag and drop .txt chapter files here.</p>
              <FileUploadItem />
            </StyledCard>
          )}
        </Dropzone>
      )}
      <FileUploadListContainer files={fileList} setFiles={setFileList} />
    </Container>
  );
};

export default UploadWidget;
