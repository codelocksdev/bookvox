import { useState } from 'react';
import { Intent } from '@blueprintjs/core';

import { SuccessToaster } from '../components/toasters';

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
};

const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const updateSettings = (newSettings: { [key: string]: string }) => {
    setSettings((prevState) => ({
      ...prevState,
      ...newSettings,
    }));

    SuccessToaster.show({ message: 'Settings Saved!', intent: Intent.SUCCESS });
  };

  return {
    ...settings,
    setAccessKeyId: (key: string) => updateSettings({ accessKeyId: key }),
    setSecretAccessKey: (key: string) =>
      updateSettings({ secretAccessKey: key }),
    setRegion: (region: string) => updateSettings({ region }),
    setEngine: (engine: 'standard' | 'neural') =>
      updateSettings({ Engine: engine }),
    setTextType: (textType: string) => updateSettings({ TextType: textType }),
    setOutputDirectory: (outputDirectory: string) =>
      updateSettings({ outputDirectory }),
    setOutputFormat: (format: string) =>
      updateSettings({ OutputFormat: format }),
    setVoiceId: (voiceId: string) => updateSettings({ VoiceId: voiceId }),
  };
};

export default useSettings;
