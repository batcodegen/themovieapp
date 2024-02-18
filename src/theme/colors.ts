import {Theme} from '@react-navigation/native';

export interface ExtendedTheme extends Theme {
  dark: boolean;
  colors: Theme['colors'] & {
    error: HEX;
    textAlt: HEX;
  };
}

const LightTheme: ExtendedTheme = {
  dark: false,
  colors: {
    primary: '#171412',
    background: '#FFFFFF',
    card: '#F8F9FA',
    text: '#000000',
    textAlt: '#FFFFFF',
    border: '#E0E0E0',
    notification: '#81D4FA',
    error: '#D9534F',
  },
};

const DarkTheme: ExtendedTheme = {
  dark: true,
  colors: {
    primary: '#FFFFFF',
    background: '#121212',
    card: '#181818',
    text: '#FFFFFF',
    textAlt: '#000000',
    border: '#404040',
    notification: '#F7CA18',
    error: '#C0392B',
  },
};

export {DarkTheme, LightTheme};
