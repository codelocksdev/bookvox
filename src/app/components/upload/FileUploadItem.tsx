import styled from 'styled-components';

import Label from '../Label';
import { useState } from 'react';
import { Icon } from '@blueprintjs/core';
import ReactAudioPlayer from 'react-audio-player';
import useAudioControls from '../../hooks/useAudioControls';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  background-color: #383e47;
  padding: 16px;
  width: 100%;
  border-radius: 8px;
`;

const Player = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const FileUploadItem = () => {
  const [src, setSrc] = useState('');
  const { play, pause, stop, player } = useAudioControls({ base64Src: src });

  return (
    <Container>
      <Label>filename.txt</Label>
      <Player>
        <ReactAudioPlayer
          ref={(element) => (player.current = element?.audioEl.current)}
          src={src}
        />
        <Icon icon={'stop'} onClick={stop} />
        <Icon icon={'pause'} onClick={pause} />
        <Icon icon={'play'} onClick={play} />
      </Player>
    </Container>
  );
};

export default FileUploadItem;
