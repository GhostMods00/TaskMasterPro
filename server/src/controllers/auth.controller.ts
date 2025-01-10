// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { QueryTypes } from 'sequelize';
import { sequelize } from '../config/database';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  password: string;
}

interface NewUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

// Utility function to validate required fields
const validateFields = (fields: Record<string, any>, required: string[]): string | null => {
  for (const field of required) {
    if (!fields[field]) return `Field ${field} is required.`;
  }
  return null;
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    const error = validateFields(req.body, ['email', 'password']);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const [user] = await sequelize.query<User>(
      `
      SELECT id, username, email, password, role 
      FROM users 
      WHERE email = :email
    `,
      {
        replacements: { email },
        type: QueryTypes.SELECT,
      }
    );

    if (!user) {
      console.warn(`Login failed: User not found for email ${email}`);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.warn(`Login failed: Invalid password for email ${email}`);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not configured');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('Login successful for email:', email);

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error during login' });
  }
};

export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, email, password } = req.body;

    // Validate required fields
    const error = validateFields(req.body, ['username', 'email', 'password']);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const [existingUser] = await sequelize.query(
      `
      SELECT * FROM users WHERE email = :email OR username = :username
    `,
      {
        replacements: { email, username },
        type: QueryTypes.SELECT,
      }
    );

    if (existingUser) {
      console.warn(`Registration failed: User already exists for email ${email} or username ${username}`);
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [newUser] = await sequelize.query<NewUser>(
      `
      INSERT INTO users (username, email, password, role, created_at, updated_at)
      VALUES (:username, :email, :password, 'user', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING id, username, email, role;
    `,
      {
        replacements: {
          username,
          email,
          password: hashedPassword,
        },
        type: QueryTypes.SELECT,
      }
    );

    if (!newUser) {
      throw new Error('Failed to create user');
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not configured');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const token = jwt.sign(
      { id: newUser.id, email, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log(`User registered successfully: ${username} (${email})`);

    return res.status(201).json({
      token,
      user: {
        id: newUser.id,
        username,
        email,
        role: 'user',
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Server error during registration' });
  }
};
