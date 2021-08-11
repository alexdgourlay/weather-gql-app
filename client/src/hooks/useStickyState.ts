import { useState, useEffect } from "preact/hooks";

// Generic function for preserving react state in browser storage.
function useStickyState<Type>(
  storage: Storage,
  defaultValue: Type,
  key: string
): [Type, Function] {
  const [value, setValue] = useState<Type>(() => {
    const stickyValue = storage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  useEffect(() => {
    storage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

// Generic function for preserving react state in session storage.
export function useSessionStorageState<Type>(
  defaultValue: Type,
  key: string
): [Type, Function] {
  return useStickyState<Type>(window.sessionStorage, defaultValue, key);
}

// Generic function for preserving react state in local storage.
export function useLocalStorageState<Type>(
  defaultValue: Type,
  key: string
): [Type, Function] {
  return useStickyState<Type>(window.localStorage, defaultValue, key);
}
