interface VoiceSettingsProps {
  region: string;
  setRegion(region: string): void;
  Engine: string;
  setEngine(engine: 'standard' | 'neural'): void;
  LanguageCode: string;
  setLanguageCode(code: string): void;
  SampleRate: string;
  setSampleRate(rate: string): void;
  TextType: string;
  setTextType(textType: string): void;
}

const VoiceSettings = ({}: VoiceSettingsProps) => {
  return <>Voice Speed Neural/Standard</>;
};

export default VoiceSettings;
