import { Database } from 'bun:sqlite'

export function initDatabase (): Database {
  const db = new Database('bun_hono_task_crud.db')

  console.log('Database created')

  db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT CHECK(role IN ('admin', 'user')) NOT NULL DEFAULT 'user'
    )`)
  console.log('Users table created')

  db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`)
    console.log('Tasks table created')
    
  db.exec("PRAGMA foreign_keys = ON")
  return db;
}