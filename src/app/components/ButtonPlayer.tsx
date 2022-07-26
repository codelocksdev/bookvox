import { useEffect, useMemo, useState } from 'react';
import { Button, Spinner } from '@blueprintjs/core';
import ReactAudioPlayer from 'react-audio-player';
import IpcService from '../common/ipc/IpcService';
import { ConvertAudioChannelResponse } from '../../shared/types/ConvertAudioChannelResponse';
import { getSrc } from '../common/utils';
import ChannelNames from '../../shared/ChannelNames';
import useAudioControls from '../hooks/useAudioControls';

interface ButtonPlayerProps {
  text: string;
}

const ButtonPlayer = ({ text }: ButtonPlayerProps) => {
  const [src, setSrc] = useState('');
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const ipcService = useMemo(() => new IpcService(), []);
  const { player, play, stop } = useAudioControls({ base64Src: src });

  useEffect(() => {
    if (player.current) {
      if (playing) {
        play();
      } else {
        stop();
      }
    }
  }, [playing, play, stop, player.current]);

  const handlePlay = async (): Promise<void> => {
    if (player.current && src === '') {
      setLoading(true);
      const { base64EncodedAudio } =
        await ipcService.send<ConvertAudioChannelResponse>(
          ChannelNames.PROCESS_SIMPLE_TEXT,
          {
            params: text,
          }
        );
      setSrc(getSrc(base64EncodedAudio));
      setLoading(false);
      setPlaying(true);
    }
  };

  const handleStop = () => {
    setPlaying(false);
    setLoading(false);
    setSrc('');
  };

  const handleEnded = () => {
    setPlaying(false);
    setSrc('');
  };

  return (
    <>
      <ReactAudioPlayer
        ref={(element) => {
          player.current = element?.audioEl.current;
        }}
        src={src}
        onEnded={handleEnded}
      />
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
