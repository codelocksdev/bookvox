import { useCallback } from 'react';
import { Intent } from '@blueprintjs/core';

import Toaster from '../components/toasters';
import { useAppDispatch, useAppSelector } from '../common/state/hooks';
import { setSettings } from '../common/state/settingsSlice';

const useSettings = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((store) => store.settings);

  const updateSettings = useCallback(
    (newSettings: { [key: string]: string }) => {
      dispatch(setSettings(newSettings));

      Toaster.show({ message: 'Settings Saved!', intent: Intent.SUCCESS });
    },
    [dispatch]
  );

  const setAccessKeyId = useCallback(
    (key: string) => updateSettings({ accessKeyId: key }),
    [updateSettings]
  );

  const setSecretAccessKey = useCallback(
    (key: string) => updateSettings({ secretAccessKey: key }),
    [updateSettings]
  );

  const setRegion = useCallback(
    (region: string) => updateSettings({ region }),
    [updateSettings]
  );

  const setEngine = useCallback(
    (engine: string) => updateSettings({ Engine: engine }),
    [updateSettings]
  );

  const setOutputDirectory = useCallback(
    (outputDirectory: string) => updateSettings({ outputDirectory }),
    [updateSettings]
  );

  const setOutputFormat = useCallback(
    (format: string) => updateSettings({ OutputFormat: format }),
    [updateSettings]
  );

  const setVoiceId = useCallback(
    (voiceId: string) => updateSettings({ VoiceId: voiceId }),
    [updateSettings]
  );

  const setSpeed = useCallback(
    (speed: string) => updateSettings({ speed }),
    [updateSettings]
  );

  return {
    ...settings,
    setAccessKeyId,
    setSecretAccessKey,
    setRegion,
    setEngine,
    setOutputDirectory,
    setOutputFormat,
    setVoiceId,
    setSpeed,
  };
};

export default useSettings;
