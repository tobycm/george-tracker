import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// create database folder if not exists
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbDir = path.join(__dirname, "db");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// hi lily i switched from sqlite3 to better-sqlite3
// it should be very similar with less code

const db = new Database(path.join(dbDir, "george_sightings.db"));

// create table: location, date, time, notes, image
export function createTable() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      location TEXT,
      date TEXT,
      notes TEXT,
      image TEXT
    )
  `);
}

// insert data into database
export function newSighting(location, date, notes, image) {
  const stmt = db.prepare("INSERT INTO users (location, date, notes, image) VALUES (?, ?, ?, ?)");
  const info = stmt.run(location, date, notes, image);
  return {
    id: Number(info.lastInsertRowid),
    location,
    date,
    notes,
    image,
  };
}

// query the database
export function getSightings() {
  return db.prepare("SELECT * FROM users ORDER BY id DESC").all();
}

export function getSighting(id) {
  return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
}

// delete data
export function deleteSighting(id) {
  const stmt = db.prepare("DELETE FROM users WHERE id = ?");
  const info = stmt.run(id);
  return { changes: info.changes };
}
