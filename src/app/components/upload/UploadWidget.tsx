import styled from 'styled-components';
import { Card, FileInput } from '@blueprintjs/core';
import Dropzone from 'react-dropzone';
import { useState } from 'react';
import FileUploadListContainer from './FileUploadListContainer';

const Container = styled.div`
  margin: auto;
  padding: 32px;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
`;

const StyledCard = styled(Card)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadWidget = () => {
  const [fileList, setFileList] = useState<File[]>([]);

  const handleDrop = (files: File[]) => {
    setFileList(files);
  };

  return (
    <Container>
      <FileInput style={{ marginBottom: 16 }} text={'Choose destination...'} />
      {fileList.length === 0 && (
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <StyledCard {...getRootProps()}>
              {/* @ts-ignore */}
              <FileInput {...getInputProps()} />
              <p>Drag and drop some files here, or click to select files</p>
            </StyledCard>
          )}
        </Dropzone>
      )}
      <FileUploadListContainer files={fileList} />
    </Container>
  );
};

export default UploadWidget;
