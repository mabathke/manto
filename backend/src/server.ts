// src/server.ts
import express, { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';

const app = express();
const db = new sqlite3.Database('./data/users.db');
const SECRET_KEY = 'your_secret_key'; // Replace with a better secret in production

app.use(bodyParser.json());

// Define the User interface
interface User {
  id: number;
  username: string;
  password: string;
}

// Create users table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`);

// Register a new user
app.post('/register', (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Hash the password before storing it
  const hashedPassword = bcrypt.hashSync(password, 8);

  const query = `INSERT INTO users (username, password) VALUES (?, ?)`;

  db.run(query, [username, hashedPassword], function (err) {
    if (err) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const token = jwt.sign({ id: this.lastID }, SECRET_KEY, { expiresIn: '24h' });
    res.status(201).json({ message: 'User registered successfully', token });
  });
});

// Login a user
app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM users WHERE username = ?`;

  // Fetch the user and explicitly type the result as User or undefined
  db.get(query, [username], (err, user: User | undefined) => {
    if (err || !user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if password matches
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ message: 'Login successful', token });
  });
});

// Protected route (optional for future use)
app.get('/home', (req: Request, res: Response) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token.split(' ')[1], SECRET_KEY, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    res.json({ message: `Welcome user ${decoded.id}` });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
