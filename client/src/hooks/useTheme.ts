import { useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';

type Theme = 'light' | 'dark' | 'system';

interface UseTheme {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const useTheme = (): UseTheme => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  const { theme, setTheme, isDarkMode } = context;

  // Update document class when theme changes
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('dark');
    } else {
      // If system preference, set explicitly to opposite of current
      setTheme(isDarkMode ? 'light' : 'dark');
    }
  };

  return {
    theme,
    setTheme,
    isDarkMode,
    toggleTheme,
  };
};

// Helper functions for theme
export const getSystemTheme = (): 'dark' | 'light' => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

export const isValidTheme = (theme: unknown): theme is Theme => {
  return typeof theme === 'string' && ['light', 'dark', 'system'].includes(theme);
};