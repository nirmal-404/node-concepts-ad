import type { Context } from 'hono'
import { Database } from 'bun:sqlite'
import { User } from '../types/index'
import { password as bunPassword } from 'bun'
import { sign } from 'hono/jwt'

export async function registerUser (c: Context, db: Database) {
  const { username, password, role } = await c.req.json()

  if (!username || !password) {
    return c.json({ error: 'Username and password are required' }, 400)
  }

  if (role && role !== 'admin' && role !== 'user') {
    return c.json({ error: 'Role must be either "admin" or "user"' }, 400)
  }

  try {
    const existingUser = db
      .query('SELECT * FROM users WHERE username = ?')
      .get(username) as User | undefined
    if (existingUser) {
      return c.json(
        {
          error:
            'User already exists with same username. Please try with a differrent username'
        },
        409
      )
    }

    // hash the password
    const hashedPassword = await bunPassword.hash(password)

    // insert the new user into the database
    db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [
      username,
      hashedPassword,
      role
    ])

    return c.json(
      {
        message: 'User registered successfully'
      },
      201
    )
  } catch (error) {
    console.error('Error registering user:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
}

export async function loginUser (c: Context, db: Database) {
  const { username, password } = await c.req.json()

  if (!username || !password) {
    return c.json({ error: 'Username and password are required' }, 400)
  }

  try {
    // get the user from the database
    const user = db
      .query('SELECT * FROM users WHERE username = ?')
      .get(username) as User | undefined

    if (!user) {
      return c.json({ error: 'Invalid username or password' }, 401)
    }

    // check if the password is correct
    const isPasswordValid = await bunPassword.verify(password, user.password)

    if (!isPasswordValid) {
      return c.json({ error: 'Invalid username or password' }, 401)
    }

    const token = await sign(
      {
        userId: user.id,
        role: user.role
      },
      process.env.JWT_SECRET || 'JWT_SECRET'
    )

    return c.json(
      {
        message: 'User logged in successfully',
        token
      },
      200
    )
  } catch (error) {
    console.error('Error logging in user:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
}
