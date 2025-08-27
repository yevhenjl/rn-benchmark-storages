import Storage from 'expo-sqlite/kv-store';

const key = 'k';
Storage.setItemSync(key, 'hello');

export function getFromExpoKvStorageSync(): string | null {
  return Storage.getItemSync('key');
}

export function getFromExpoKvStorageAsync(): Promise<string | null> {
  return Storage.getItemAsync('key');
}
