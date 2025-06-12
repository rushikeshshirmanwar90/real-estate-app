import React, { createContext, useContext, ReactNode } from 'react';
import defaultTheme, { ThemeColors } from './applicationTheme';

// Create a context for the theme
const ThemeContext = createContext<ThemeColors>(defaultTheme);

// Custom hook to use the theme
export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
  theme?: ThemeColors;
}

/**
 * ThemeProvider component that provides the theme to all child components
 * 
 * @param {ReactNode} children - Child components
 * @param {ThemeColors} theme - Optional custom theme to override the default theme
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme = defaultTheme
}) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;