import { LegacyRef, useMemo, useRef, useState } from 'react';
import { Button, Spinner } from '@blueprintjs/core';
import IpcService from '../common/ipc/IpcService';

const ButtonPlayer = () => {
  const player = useRef<HTMLAudioElement>(null);
  const [src, setSrc] = useState('');
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const ipcService = useMemo(() => new IpcService(), []);

  const handlePlay = async (): Promise<void> => {
    if (player.current && src === '') {
      await player.current.play();
    }
  };

  const handleStop = () => {};

  return (
    <>
      <audio src={src} style={{ display: 'none' }} ref={player} />
      {loading && <Spinner />}
      {playing ? (
        <Button icon={'stop'} text={'stop'} onClick={handleStop} />
      ) : (
        <Button icon={'play'} text={'Listen'} onClick={handlePlay} />
      )}{' '}
    </>
  );
};

export default ButtonPlayer;
