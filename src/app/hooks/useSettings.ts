import { useState } from 'react';

interface Settings {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  Engine: string;
  LanguageCode: string;
  SampleRate: string;
  TextType: string;
  outputDirectory: string;
}

const defaultSettings: Settings = {};

const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  return { ...settings };
};

export default useSettings;
