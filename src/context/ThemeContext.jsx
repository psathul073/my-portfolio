import { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState(() =>
    localStorage.getItem('theme') || 'system'
  );

  useEffect( () => {
    const body = document.body;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () =>  {
          const isDark = theme === 'dark' || (theme === 'system' && mediaQuery.matches);
      body.classList.toggle('dark', isDark);
    }
     applyTheme();
    localStorage.setItem('theme', theme);

     if (theme === 'system') {
      mediaQuery.addEventListener('change', applyTheme);
      return () => mediaQuery.removeEventListener('change', applyTheme);
    };

  },[theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );

};

export const useTheme = () => useContext(ThemeContext);
