interface VoiceSettingsProps {
  Engine: string;
  setEngine(engine: 'standard' | 'neural'): void;
  TextType: string;
  setTextType(textType: string): void;
  outputFormat: string;
  setOutputFormat(format: string): void;
  voiceId: string;
  setVoiceId(voiceId: string): void;
}

const VoiceSettings = ({}: VoiceSettingsProps) => {
  return <>Voice Speed Neural/Standard</>;
};

export default VoiceSettings;
