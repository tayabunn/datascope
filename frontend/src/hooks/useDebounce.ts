"use client";

import { useState, useEffect } from "react";

/**
 * useDebounce Hook
 * Delays updating the debounced value until after the specified delay has elapsed
 * since the last keystroke/update. Essential for preventing excessive API search calls.
 *
 * @param value The value to debounce (e.g. search keyword)
 * @param delay Delay duration in milliseconds (default: 300ms)
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
