import { useState } from 'react';

const useThemeState = (defaultVal = false) => {
  const [isDarkMode, setIsDarkMode] = useState(defaultVal);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return [isDarkMode, toggleTheme];
};

export { useThemeState };
