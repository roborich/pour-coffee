import { useCallback, useEffect, useState } from 'react';

const useLocalStorage = <T extends any>(key: string, defaultValue: T): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(defaultValue);
  const setStoredState = useCallback(
    (value: T) => {
      localStorage.setItem(key, JSON.stringify(value));
      setState(value);
    },
    [setState],
  );
  useEffect(() => {
    const storedState = localStorage.getItem(key);
    if (storedState == null) {
      setStoredState(defaultValue);
      return;
    }
    setState(JSON.parse(storedState));
  }, [key]);
  return [state, setStoredState];
};

export default useLocalStorage;
