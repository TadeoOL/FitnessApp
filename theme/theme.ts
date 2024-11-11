import { Theme } from '@react-navigation/native';

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
    success: {
      main: string;
      light: string;
      dark: string;
    };
    divider: string;
  };
}

export const lightTheme: ExtendedTheme = {
  dark: false,
  colors: {
    // React Navigation required colors
    primary: '#007AFF',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#000000',
    border: '#E0E0E0',
    notification: '#FF3B30',
  },
  // Our custom colors
  customColors: {
    primary: {
      main: '#007AFF',
      light: '#5856D6',
      dark: '#0056b3',
    },
    secondary: {
      main: '#5856D6',
      light: '#7A79E0',
      dark: '#3634A9',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
    error: {
      main: '#FF3B30',
      light: '#FF6B6B',
      dark: '#C4001D',
    },
    success: {
      main: '#34C759',
      light: '#4CD964',
      dark: '#248A3D',
    },
    divider: '#E0E0E0',
  },
};

export const darkTheme: ExtendedTheme = {
  dark: true,
  colors: {
    // React Navigation required colors
    primary: '#0A84FF',
    background: '#000000',
    card: '#1C1C1E',
    text: '#FFFFFF',
    border: '#38383A',
    notification: '#FF453A',
  },
  // Our custom colors
  customColors: {
    primary: {
      main: '#0A84FF',
      light: '#5E5CE6',
      dark: '#0056b3',
    },
    secondary: {
      main: '#5E5CE6',
      light: '#7A79E0',
      dark: '#3634A9',
    },
    background: {
      default: '#000000',
      paper: '#1C1C1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#EBEBF5',
    },
    error: {
      main: '#FF453A',
      light: '#FF6B6B',
      dark: '#C4001D',
    },
    success: {
      main: '#32D74B',
      light: '#4CD964',
      dark: '#248A3D',
    },
    divider: '#38383A',
  },
};

export type CustomTheme = typeof lightTheme;