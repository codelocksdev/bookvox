interface Settings {
  accessKeyId: string;
  secretAccessKey: string;
  credentialsVerified: boolean;
  region: string;
  Engine: string;
  LanguageCode: string;
  SampleRate: string;
  TextType: string;
  OutputFormat: string;
  VoiceId: string;
  outputDirectory: string;
  speed: string;
  [key: string]: string | boolean;
}

export default Settings;
