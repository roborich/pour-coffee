import { useCallback, useEffect, useMemo, useState } from 'react';

const getInitialValue = <T extends any>(key: string, defaultValue: T): T => {
  const fromStore = localStorage.getItem(key);
  if (fromStore == null) {
    return defaultValue;
  }
  return JSON.parse(fromStore);
};
const useLocalStorage = <T extends any>(key: string, defaultValue: T): [T, (value: T) => void] => {
  const initialValue = useMemo(() => getInitialValue<T>(key, defaultValue), [key, defaultValue]);
  const [state, setState] = useState<T>(initialValue);
  const setStoredState = useCallback(
    (value: T) => {
      localStorage.setItem(key, JSON.stringify(value));
      setState(value);
    },
    [setState],
  );
  return [state, setStoredState];
};

export default useLocalStorage;
