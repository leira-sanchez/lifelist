import { useState, useEffect } from 'react';

const useThemeState = (key, defaultVal = false) => {
  function getLocalStorage() {
    let value;
    try {
      console.log(key, defaultVal);
      value = JSON.parse(
        window.localStorage.getItem(key) || String(defaultVal)
      );
      console.log(value);
    } catch (e) {
      console.log('No default value was given or:', e)
      value = defaultVal;
    }

    return value;
  }
  const toggleTheme = () => {
    setState(!state);
  };
  const [state, setState] = useState(getLocalStorage);

  // use useEffect to update localStorage when state changes
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state]);
  return [state, toggleTheme];
};

export { useThemeState };
