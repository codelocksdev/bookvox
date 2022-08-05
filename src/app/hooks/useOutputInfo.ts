import { useEffect, useMemo, useState } from 'react';

import { useAppSelector } from '../common/state/typedReduxMethods';
import IpcService from '../common/ipc/IpcService';
import ChannelNames from '../../shared/ChannelNames';

const slash = window.navigator.platform === 'Win32' ? '\\' : '/';

const useOutputInfo = (name: string) => {
  const ipcService = useMemo(() => new IpcService(), []);
  const { outputDirectory } = useAppSelector((state) => state.settings);
  const [homePath, setHomePath] = useState('');

  useEffect(() => {
    (async function getHomePath() {
      const path = await ipcService.send<string>(ChannelNames.HOME_DIRECTORY);
      setHomePath(path);
    })();
  }, [setHomePath, ipcService]);

  return `${homePath}${slash}${outputDirectory}${slash}${name}`;
};

export default useOutputInfo;
