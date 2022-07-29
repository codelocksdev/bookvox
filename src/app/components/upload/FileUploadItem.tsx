import styled from 'styled-components';
import { Icon } from '@blueprintjs/core';
import ReactAudioPlayer from 'react-audio-player';

import Label from '../Label';
import useAudioControls from '../../hooks/useAudioControls';

const Container = styled.div<{ isEven: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  width: 100%;
  background-color: ${({ isEven }) => (isEven ? '#1C2127' : '#252A31')};
`;

const Player = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export interface FileItem {
  fileName: string;
  base64Src?: string;
}

const FileUploadItem = ({
  file: { fileName, base64Src },
  index,
}: {
  file: FileItem;
  index: number;
}) => {
  const { src, play, pause, stop, player } = useAudioControls({
    base64Src,
  });

  return (
    <Container isEven={index % 2 === 0}>
      {fileName}
      {src && (
        <Player>
          <ReactAudioPlayer
            ref={(element) => {
              player.current = element?.audioEl.current;
            }}
            src={src}
          />
          <Icon icon={'stop'} onClick={stop} />
          <Icon icon={'pause'} onClick={pause} />
          <Icon icon={'play'} onClick={play} />
        </Player>
      )}
    </Container>
  );
};

export default FileUploadItem;
