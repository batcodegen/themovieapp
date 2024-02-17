import {ExtendedTheme} from './src/theme/colors';

declare module '@react-navigation/native' {
  export function useTheme(): ExtendedTheme;
}
