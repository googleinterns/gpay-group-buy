/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {useState, useCallback} from 'react';

/**
 * Code referenced from: https://usehooks.com/useLocalStorage/
 * useLocalStorage hook that syncs state to local storage so it persists through
 * a page refresh.
 * @param key Local storage key
 * @param initialValue Default value if key does not exist in local storage
 */
const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (currValue: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  /**
   * Sets stored value to a value, or perform an operation on the currently stored value.
   * @param value New value to be stored, or a function to perform an operation
   * on the currently stored value
   */
  const setValue = useCallback(
    (value: T | ((currValue: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.log(error);
      }
    },
    [storedValue, key]
  );

  return [storedValue, setValue];
};

export default useLocalStorage;
