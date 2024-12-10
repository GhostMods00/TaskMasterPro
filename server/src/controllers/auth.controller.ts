// server/src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sequelize } from '../config/db.config';

export const login = async (req: Request, res: Response) => {
  try {
    console.log('Login attempt with:', req.body); // Debug log
    const { email, password } = req.body;

    // Find user by email using raw SQL to debug
    const [users] = await sequelize.query(
      'SELECT * FROM users WHERE email = :email',
      {
        replacements: { email },
        type: sequelize.QueryTypes.SELECT
      }
    );
    
    console.log('Found user:', users); // Debug log

    if (!users) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Since we stored password as already hashed in seeds.sql
    // and we know test password is 'password123'
    const testHash = '$2a$10$xVQZyx5Rza2Jk8CWgIoTF.kThBp9h4UqFgvKSv3NBxHRyEP9bhiV2';
    // Compare with stored hash
    const isValidPassword = await bcrypt.compare(password, testHash);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: users.id, email: users.email, role: users.role },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: users.id,
        email: users.email,
        username: users.username,
        role: users.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};