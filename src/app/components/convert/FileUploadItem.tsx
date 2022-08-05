import { Button } from '@blueprintjs/core';
import ReactAudioPlayer from 'react-audio-player';

import useAudioControls from '../../hooks/useAudioControls';
import FileItem from '../../objects/FileItem';
import { AudioPlayer, FileUploadItemContainer } from '../styled';

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
    <FileUploadItemContainer isEven={index % 2 === 0}>
      {name.replace('.txt', '')}
      {src && (
        <AudioPlayer>
          <ReactAudioPlayer
            ref={(element) => {
              player.current = element?.audioEl.current;
            }}
            src={src}
          />
          <Button icon={'stop'} onClick={stop} minimal />
          <Button icon={'pause'} onClick={pause} minimal />
          <Button icon={'play'} onClick={play} minimal />
        </AudioPlayer>
      )}
    </FileUploadItemContainer>
  );
};

export default FileUploadItem;
