import { useCallback, useEffect } from 'react';
import { Intent } from '@blueprintjs/core';

import Toaster from '../components/toasters';
import {
  useAppDispatch,
  useAppSelector,
} from '../common/state/typedReduxMethods';
import { setSettings } from '../common/state/settingsSlice';
import { getAwsCredentials } from '../common/state/selectors';
import { updateAwsCredentials } from '../common/state/thunks';

const useSettings = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((store) => store.settings);
  const { accessKeyId, secretAccessKey } = useAppSelector(getAwsCredentials);

  useEffect(() => {
    (async function validateAndUpdate() {
      if (accessKeyId !== '' && secretAccessKey !== '') {
        dispatch(updateAwsCredentials({ accessKeyId, secretAccessKey }));
      }
    })();
  }, [dispatch, secretAccessKey, accessKeyId]);

  const updateSettings = useCallback(
    (newSettings: { [key: string]: string }) => {
      let equal = true;

      Object.entries(newSettings).forEach(([key, value]) => {
        if (settings[key] !== value) equal = false;
      });

      if (!equal) {
        dispatch(setSettings(newSettings));
        Toaster.show({ message: 'Settings Saved!', intent: Intent.SUCCESS });
      }
    },
    [dispatch, settings]
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
