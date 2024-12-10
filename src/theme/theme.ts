import { Theme } from '@react-navigation/native';
import colorPalette from './colorPalette';

interface ExtendedTheme extends Theme {
  customColors: {
    primary: {
      main: string;
      light: string;
      dark: string;
    };
    secondary: {
      main: string;
      light: string;
      dark: string;
    };
    background: {
      default: string;
      paper: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
    error: {
      main: string;
      light: string;
      dark: string;
    };
    action: {
      active: string;
    };
    divider: string;
  };
}

export const lightTheme: ExtendedTheme = {
  dark: false,
  colors: {
    primary: colorPalette.light.primary.main,
    background: colorPalette.light.background.default,
    card: colorPalette.light.background.paper,
    text: colorPalette.light.text.primary,
    border: colorPalette.light.divider,
    notification: colorPalette.light.error.main,
  },
  customColors: colorPalette.light,
  fonts: {
    regular: {
      fontFamily: 'Roboto-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Roboto-Medium',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Roboto-Bold',
      fontWeight: 'bold',
    },
    heavy: {
      fontFamily: 'Roboto-Heavy',
      fontWeight: '900',
    },
  },
};

export const darkTheme: ExtendedTheme = {
  dark: true,
  colors: {
    primary: colorPalette.dark.primary.main,
    background: colorPalette.dark.background.default,
    card: colorPalette.dark.background.paper,
    text: colorPalette.dark.text.primary,
    border: colorPalette.dark.divider,
    notification: colorPalette.dark.error.main,
  },
  customColors: colorPalette.dark,
  fonts: {
    regular: {
      fontFamily: 'Roboto-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Roboto-Medium',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Roboto-Bold',
      fontWeight: 'bold',
    },
    heavy: {
      fontFamily: 'Roboto-Heavy',
      fontWeight: '900',
    },
  },
};

export type CustomTheme = typeof lightTheme;
