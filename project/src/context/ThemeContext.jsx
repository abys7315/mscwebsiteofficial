import React, { createContext, useContext } from 'react';

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const theme = 'dark';

  const toggleTheme = () => {
    // No-op since we only support dark theme
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}