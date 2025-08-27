import {type NitroSQLiteConnection, open} from 'react-native-nitro-sqlite';

const dbName = 'NitroSQLiteDatabase';

let db: NitroSQLiteConnection | null = null;

function openDatabase() {
  try {
    db = open({name: dbName});
  } catch (e) {
    console.error('NitroSQLite: Failed to open database!', e);
  }
}

export function closeNitroSQLiteDatabase() {
  if (db) {
    db.close();
    db = null;
  }
}

export async function initNitroSQLite() {
  openDatabase();

  if (!db) {
    throw new Error('ExpoSQLite: Database not initialized!');
  }

  try {
    await db.executeAsync('DROP TABLE IF EXISTS Benchmark');
  } catch (e) {
    console.error('ExpoSQLite: Failed to drop table!', e);
  }

  try {
    await db.executeAsync('CREATE TABLE IF NOT EXISTS Benchmark(value VARCHAR(30))');
  } catch (e) {
    console.error('ExpoSQLite: Failed to create table!', e);
  }

  try {
    await db.executeAsync('INSERT INTO Benchmark (value) VALUES (?)', ['hello']);
  } catch (e) {
    console.error('ExpoSQLite: Failed to insert value!', e);
  }
}

export async function getFromNitroSQLite(): Promise<string | undefined> {
  if (!db) {
    throw new Error('NitroSQLite: Database not initialized!');
  }

  const {rows} = await db.executeAsync<{value: string}>('SELECT value FROM Benchmark');

  if (!rows || rows.length < 1) {
    throw new Error('NitroSQLite: Failed to get Values!');
  }

  return rows.item(0)?.value;
}
