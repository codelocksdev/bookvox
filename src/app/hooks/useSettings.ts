import { useCallback, useState } from 'react';
import { Intent } from '@blueprintjs/core';

import { Toaster } from '../components/toasters';

interface Settings {
  accessKeyId?: string;
  secretAccessKey?: string;
  region: string;
  Engine: string;
  LanguageCode: string;
  SampleRate: string;
  TextType: string;
  OutputFormat: string;
  VoiceId: string;
  outputDirectory: string;
  speed: string;
}

const defaultSettings: Settings = {
  region: 'us-east-1',
  Engine: 'neural',
  LanguageCode: 'en-US',
  SampleRate: '22050',
  TextType: 'ssml',
  outputDirectory: 'bookvox',
  OutputFormat: 'mp3',
  VoiceId: 'Salli',
  speed: '95%',
};

const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const updateSettings = (newSettings: { [key: string]: string }) => {
    setSettings((prevState) => ({
      ...prevState,
      ...newSettings,
    }));

    Toaster.show({ message: 'Settings Saved!', intent: Intent.SUCCESS });
  };

  const setAccessKeyId = useCallback(
    (key: string) => updateSettings({ accessKeyId: key }),
    []
  );

  const setSecretAccessKey = useCallback(
    (key: string) => updateSettings({ secretAccessKey: key }),
    []
  );

  const setRegion = useCallback(
    (region: string) => updateSettings({ region }),
    []
  );

  const setEngine = useCallback(
    (engine: string) => updateSettings({ Engine: engine }),
    []
  );

  const setOutputDirectory = useCallback(
    (outputDirectory: string) => updateSettings({ outputDirectory }),
    []
  );

  const setOutputFormat = useCallback(
    (format: string) => updateSettings({ OutputFormat: format }),
    []
  );

  const setVoiceId = useCallback(
    (voiceId: string) => updateSettings({ VoiceId: voiceId }),
    []
  );

  const setSpeed = useCallback(
    (speed: string) => updateSettings({ speed }),
    []
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
