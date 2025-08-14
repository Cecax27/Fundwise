export const palette = {
  white: '#F6F6F6',
  black: '#1A1A1A',
  gray100: '#F5F6F7',
  gray200: '#E3E3E3',
  gray300: '#B8B8B8',
  gray700: '#495057',
  gray900: '#242424',
  blue600: '#1E90FF',
  red600: '#E03131',
  green600: '#2F9E44',
  mustard: '#FFD166',
  mint: '#A8E6CF',
  coral: '#FF6F61'
};

export const lightTheme = {
  name: 'light',
  background: palette.white,
  surface: palette.gray100,
  text: palette.gray900,
  subtext: palette.gray700,
  primary: palette.mustard,
  border: palette.gray200,
  success: palette.green600,
  error: palette.red600,
  income: palette.mint,
  spending: palette.coral,
};

export const darkTheme = {
  name: 'dark',
  background: palette.gray900,
  surface: '#121212',
  text: palette.white,
  subtext: palette.gray300,
  primary: palette.mustard,
  border: '#2A2A2A',
  success: palette.green600,
  error: palette.red600,
  income: palette.mint,
  spending: palette.coral,
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
