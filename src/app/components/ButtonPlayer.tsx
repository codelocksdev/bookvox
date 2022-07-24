import { useMemo, useRef, useState } from 'react';
import { Button, Intent, Spinner } from '@blueprintjs/core';
import IpcService from '../common/ipc/IpcService';
import { ConvertAudioChannelResponse } from '../../shared/types/ConvertAudioChannelResponse';
import { getSrc } from '../common/utils';
import Toaster from './toasters';

interface ButtonPlayerProps {
  text: string;
}

const ButtonPlayer = ({ text }: ButtonPlayerProps) => {
  const player = useRef<HTMLAudioElement>(null);
  const [src, setSrc] = useState('');
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const ipcService = useMemo(() => new IpcService(), []);

  const handlePlay = async (): Promise<void> => {
    if (player.current && src === '') {
      setLoading(true);
      const { base64EncodedAudio } =
        await ipcService.send<ConvertAudioChannelResponse>('convert-audio', {
          params: text,
        });
      setSrc(getSrc(base64EncodedAudio));
      setLoading(false);
      player.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => {
          Toaster.show({
            message: 'Failed to process text.',
            intent: Intent.DANGER,
          });
          setSrc('');
        });
    }
  };

  const handleStop = () => {
    setPlaying(false);
    setLoading(false);
    setSrc('');
  };

  return (
    <>
      <audio src={src} style={{ display: 'none' }} ref={player} />
      {loading && <Spinner />}
      {playing ? (
        <Button
          icon={'stop'}
          text={'stop'}
          onClick={handleStop}
          loading={loading}
        />
      ) : (
        <Button
          icon={'play'}
          text={'Listen'}
          onClick={handlePlay}
          loading={loading}
        />
      )}{' '}
    </>
  );
};

export default ButtonPlayer;
