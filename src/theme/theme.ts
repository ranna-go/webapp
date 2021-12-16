export interface Theme {
  background: string;
  accent: string;
  accentLight: string;
  accentDark: string;
  text: string;
  gray: string;
  darkGray: string;
  textRed: string;
}

export const DefaultTheme: Theme = {
  background: '#1e1e1e',
  accent: '#00acd7',
  accentLight: '#0081d7',
  accentDark: '#001419',
  text: '#f4f4f5',
  gray: '#455a64',
  darkGray: '#263238',
  textRed: '#EF5350',
};
