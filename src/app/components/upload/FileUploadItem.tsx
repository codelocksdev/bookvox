import styled from 'styled-components';
import { Button } from '@blueprintjs/core';
import ReactAudioPlayer from 'react-audio-player';
import useAudioControls from '../../hooks/useAudioControls';
import FileItem from '../../objects/FileItem';

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

const FileUploadItem = ({
  file: { name, audioBase64Src },
  index,
}: {
  file: FileItem;
  index: number;
}) => {
  const { src, play, pause, stop, player } = useAudioControls({
    base64Src: audioBase64Src,
  });

  return (
    <Container isEven={index % 2 === 0}>
      {name.replace('.txt', '')}
      {src && (
        <Player>
          <ReactAudioPlayer
            ref={(element) => {
              player.current = element?.audioEl.current;
            }}
            src={src}
          />
          <Button icon={'stop'} onClick={stop} minimal />
          <Button icon={'pause'} onClick={pause} minimal />
          <Button icon={'play'} onClick={play} minimal />
        </Player>
      )}
    </Container>
  );
};

export default FileUploadItem;
