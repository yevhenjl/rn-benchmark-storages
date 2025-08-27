import * as SQLite from 'expo-sqlite';

const dbName = 'ExpoSQLiteDatabase';

let db: SQLite.SQLiteDatabase | null = null;

async function openDatabase() {
  try {
    db = await SQLite.openDatabaseAsync(dbName);
  } catch (e) {
    console.error('ExpoSQLite: Failed to open database!', e);
  }
}

export async function closeExpoSQLiteDatabase() {
  if (db) {
    await db.closeAsync();
    db = null;
  }
}

export async function initExpoSQLite() {
  await openDatabase();

  if (!db) {
    throw new Error('ExpoSQLite: Database not initialized!');
  }

  try {
    await db.runAsync('DROP TABLE IF EXISTS Benchmark');
  } catch (e) {
    console.error('ExpoSQLite: Failed to drop table!', e);
  }

  try {
    await db.runAsync('CREATE TABLE IF NOT EXISTS Benchmark(value VARCHAR(30))');
  } catch (e) {
    console.error('ExpoSQLite: Failed to create table!', e);
  }

  try {
    await db.runAsync('INSERT INTO Benchmark (value) VALUES (?)', ['hello']);
  } catch (e) {
    console.error('ExpoSQLite: Failed to insert value!', e);
  }
}

export async function getFromExpoSQLite(): Promise<string | undefined> {
  if (!db) {
    throw new Error('ExpoSQLite: Database not initialized!');
  }

  const row = await db.getFirstAsync<{value: string}>('SELECT value FROM Benchmark');

  if (row == null) {
    throw new Error('ExpoSQLite: Failed to get Values!');
  }

  return row.value;
}
