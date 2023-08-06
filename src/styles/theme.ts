export const theme = {
  colors: {
    primary: '#040F0F',
    secondary: '#B0C6CE',
    accent: '#659B5E',
    white: '#fff',
    black: '#000',
    grey: '#938BA1',
    lightGrey: '#D2D2D2',
    darkGrey: '#A9A9A9',
    error: '#E53E3E',
    transparent: 'transparent',
  },
  fonts: {
    Inter_400Regular: 'Inter_400Regular',
    Inter_700Bold: 'Inter_700Bold',
  },
  radius: {
    small: 4,
    medium: 8,
    large: 16,
  }
};

export type TColors = keyof typeof theme.colors;
