import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type SetValue<T> = Dispatch<SetStateAction<T>>;
type RemoveValue = () => void;
type UseLocalStorageResult<T> = [T, SetValue<T>, RemoveValue];

export const useLocalStorage = <T>(key: string, initialValue: T): UseLocalStorageResult<T> => {
  const [value, setValue] = useState<T>(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    }
    return initialValue;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  const updateValue: SetValue<T> = (newValue) => {
    setValue(newValue);
  };

  const removeValue: RemoveValue = () => {
    setValue(initialValue);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  };

  return [value, updateValue, removeValue];
};