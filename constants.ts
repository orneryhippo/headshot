import { HeadshotStyle } from './types';

export const HEADSHOT_STYLES: HeadshotStyle[] = [
  {
    id: 'corporate',
    name: 'Corporate Executive',
    description: 'Clean grey or neutral backdrop, suit or blazer, soft studio lighting.',
    promptModifier: 'Corporate Grey Backdrop, wearing a professional navy or charcoal suit, soft studio lighting, confident expression',
    icon: '🏢'
  },
  {
    id: 'tech',
    name: 'Modern Tech',
    description: 'Open office background, smart casual attire (polo or button-up), bright natural light.',
    promptModifier: 'Modern Tech Office background, slightly blurred, wearing smart casual tech attire like a premium t-shirt or open button-down, bright and approachable',
    icon: '💻'
  },
  {
    id: 'outdoor',
    name: 'Natural Outdoor',
    description: 'Blurred park or city background, golden hour lighting, approachable vibe.',
    promptModifier: 'Outdoor Natural Light, blurred greenery or city park background, golden hour sun flare, casual yet professional look',
    icon: '🌳'
  },
  {
    id: 'studio-bw',
    name: 'Studio B&W',
    description: 'High contrast black and white, dramatic lighting, artistic and serious.',
    promptModifier: 'Black and White Studio Portrait, high contrast, dramatic side lighting, artistic and serious tone',
    icon: '📸'
  }
];
