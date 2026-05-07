import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme] = useState<Theme>('dark');

  // Apply theme to DOM
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add('dark');
    root.classList.remove('light');
    
    // Also remove from localStorage to avoid confusion if someone checks
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('theme');
    }
  }, []);

  const toggleTheme = () => {
    // No-op in forced dark mode
    console.log('Theme is locked to dark mode');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};