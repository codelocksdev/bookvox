export interface PollyParams {
  Engine?: string;
  LanguageCode?: string;
  SampleRate?: string;
  TextType?: string;
}

export const defaultPollyParams = {
  Engine: 'neural',
  LanguageCode: 'en-US',
  SampleRate: '22050',
  TextType: 'ssml',
};
