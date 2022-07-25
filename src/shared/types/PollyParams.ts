export interface PollyParams {
  Engine: string;
  LanguageCode: string;
  SampleRate: string;
  TextType: string;
  VoiceId: string;
  OutputFormat: string;
}

export const defaultPollyParams: PollyParams = {
  Engine: 'neural',
  LanguageCode: 'en-US',
  SampleRate: '22050',
  TextType: 'ssml',
  VoiceId: 'salli',
  OutputFormat: 'mp3',
};
