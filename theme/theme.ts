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
    border: {
      default: string;
    };
    modal: {
      background: string;
      overlay: string;
    };
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
    border: {
      default: '#E0E0E0',
    },
    modal: {
      background: '#FFFFFF',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
  },
};

export const darkTheme: ExtendedTheme = {
  dark: true,
  colors: {
    // React Navigation required colors
    primary: '#4ADE80',
    background: '#111827',
    card: '#1F2937',
    text: '#F9FAFB',
    border: '#374151',
    notification: '#EF4444',
  },
  // Our custom colors
  customColors: {
    primary: {
      main: '#4ADE80',
      light: '#86EFAC',
      dark: '#22C55E',
    },
    secondary: {
      main: '#818CF8',
      light: '#A5B4FC',
      dark: '#6366F1',
    },
    background: {
      default: '#111827',
      paper: '#1F2937',
    },
    text: {
      primary: '#F9FAFB',
      secondary: '#D1D5DB',
    },
    error: {
      main: '#EF4444',
      light: '#FCA5A5',
      dark: '#DC2626',
    },
    success: {
      main: '#4ADE80',
      light: '#86EFAC',
      dark: '#22C55E',
    },
    divider: '#374151',
    border: {
      default: '#374151',
    },
    modal: {
      background: '#1F2937',
      overlay: 'rgba(0, 0, 0, 0.7)',
    },
  },
};

export type CustomTheme = typeof lightTheme;