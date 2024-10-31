import { useRef } from "react";

export const useDebounce = <T extends unknown[]>(
  fn: (...args: T) => void,
  delay = 1000
) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const returnFn = (...args: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };

  return returnFn;
};
