import {getFromAsyncStorage} from './AsyncStorage';
import {getFromExpoKvStorageAsync, getFromExpoKvStorageSync} from './ExpoKVStorage';
import {getFromExpoSQLite} from './ExpoSQLite';
import {getFromExpoSecureStorage} from './ExpoSecureStorage';
import {getFromMMKV} from './MMKV';
import {getFromMMKVEncrypted} from './MMKVEncrypted';
import {getFromNitroSQLite} from './NitroSQLite';
import {getFromReactNativeKeychain} from './ReactNativeKeychain';
import {getFromRealm} from './Realm';
import {getFromWatermelonDB} from './WatermealonDB';

export const benchmarks: Record<string, () => unknown | Promise<unknown>> = {
  'MMKV (sync)': getFromMMKV,
  'MMKV Encrypt (sync)': getFromMMKVEncrypted,
  'AsyncStorage (async)': getFromAsyncStorage,
  'Expo Key-value Storage (sync)': getFromExpoKvStorageSync,
  'Expo Key-value Storage (async)': getFromExpoKvStorageAsync,
  'Expo Secure Storage (async)': getFromExpoSecureStorage,
  'React Native Keychain (async)': getFromReactNativeKeychain,
  'ExpoSQLite DB': getFromExpoSQLite,
  'NitroSQLite DB': getFromNitroSQLite,
  RealmDB: getFromRealm,
  WatermelonDB: getFromWatermelonDB,
};

export type BenchmarksType = keyof typeof benchmarks;
