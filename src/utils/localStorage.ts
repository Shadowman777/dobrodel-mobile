import {Storage} from 'redux-persist/es/types';
import {MMKV} from 'react-native-mmkv';

export const mmkvStorage = new MMKV();

export const localStorage: Storage = {
  setItem: (key, value): Promise<boolean> => {
    mmkvStorage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key): Promise<string | undefined> => {
    const value = mmkvStorage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key): Promise<void> => {
    mmkvStorage.delete(key);
    return Promise.resolve();
  },
};
