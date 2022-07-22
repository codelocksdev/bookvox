export interface PollyParams {
  Engine?: string;
  LanguageCode?: string;
  OutputFormat?: string;
  SampleRate?: string;
  TextType?: string;
  VoiceId?: string;
}

export const defaultPollyParams = {
  Engine: 'neural',
  LanguageCode: 'en-US',
  SampleRate: '22050',
  TextType: 'ssml',
};
