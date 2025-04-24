import { Database } from 'bun:sqlite'

async function sqliteDemo () {
  // Create a new database or open an existing one
  const db = new Database('bundb.sqlite')

  // Create a table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP)
    `)
  console.log('Table users created')

  // Insert a user
  const insertUser = db.prepare(
    `INSERT OR IGNORE INTO users (name, email) VALUES (?, ?)`
  ) // Prevents SQL Injections
  insertUser.run('John Doe', 'jhondoe@example.com')
  insertUser.run('Jane Simith', 'janesmith@example.com')
  insertUser.run('Baby Doe', 'babydoe@example.com')

  const extractUsers = db.prepare(`SELECT * FROM users`).all()
  console.log('Users:', extractUsers)

  db.run(`UPDATE users set name = ? WHERE email = ?`, [
    'Nirmal Perera',
    'jhondoe@example.com'
  ])
  const updatedUser = db.prepare(`SELECT * FROM users WHERE email = ?`).get('jhondoe@example.com')
  console.log('Updated User:', updatedUser);
  
  db.run(`DELETE FROM users WHERE email = ?`, ['jhondoe@example.com'])

  const extractRemainingUsers = db.prepare(`SELECT * FROM users`).all()
  console.log('Remaining Users:', extractRemainingUsers)
}

sqliteDemo()
