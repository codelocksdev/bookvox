import { useMemo, useRef } from 'react';
import { getSrc } from '../common/utils';

export interface PlayerControlProps {
  base64Src?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onStop?: () => void;
  onEnd?: () => void;
}

const useAudioControls = ({
  base64Src,
  onStop,
  onPause,
  onPlay,
}: PlayerControlProps) => {
  const src = useMemo<string | undefined>(
    () => base64Src && getSrc(base64Src),
    [base64Src]
  );
  const player = useRef<HTMLAudioElement | undefined | null>(undefined);

  const play = () => {
    if (player.current && base64Src !== '') player.current.play();
    if (onPlay) onPlay();
  };

  const pause = () => {
    if (player.current) player.current.pause();
    if (onPause) onPause();
  };

  const stop = () => {
    if (player.current) {
      player.current.pause();
      player.current.currentTime = 0;
    }
    if (onStop) onStop();
  };

  return {
    play,
    pause,
    stop,
    src,
    player,
  };
};

export default useAudioControls;
