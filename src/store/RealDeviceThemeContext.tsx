import { createContext, useContext } from 'react';
import { ColorSchemeName } from 'react-native';

const RealDeviceThemeContext = createContext<ColorSchemeName>(null);

export const RealDeviceThemeProvider = RealDeviceThemeContext.Provider;
export const useRealDeviceTheme = () => useContext(RealDeviceThemeContext);
