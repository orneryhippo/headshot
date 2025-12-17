export interface HeadshotStyle {
  id: string;
  name: string;
  description: string;
  promptModifier: string;
  icon: string;
}

export type AppState = 'upload' | 'style-selection' | 'generating' | 'result';

export interface GeneratedImage {
  data: string; // Base64 string
  mimeType: string;
}
