import { useState } from 'react';
import { SuccessToaster } from '../components/toasters';
import { Intent } from '@blueprintjs/core';

interface Settings {
  accessKeyId?: string;
  secretAccessKey?: string;
  region: string;
  Engine: string;
  LanguageCode: string;
  SampleRate: string;
  TextType: string;
  outputDirectory: string;
}

const defaultSettings: Settings = {
  region: 'us-east-1',
  Engine: 'neural',
  LanguageCode: 'en-US',
  SampleRate: '22050',
  TextType: 'ssml',
  outputDirectory: '/bookvox',
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
    setLanguageCode: (code: string) => updateSettings({ LanguageCode: code }),
    setSampleRate: (rate: string) => updateSettings({ SampleRate: rate }),
    setTextType: (textType: string) => updateSettings({ TextType: textType }),
    setOutputDirectory: (outputDirectory: string) =>
      updateSettings({ outputDirectory }),
  };
};

export default useSettings;
