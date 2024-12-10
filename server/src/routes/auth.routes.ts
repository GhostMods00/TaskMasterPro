// server/src/routes/auth.routes.ts
import express from 'express';
import { login } from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', login);

// Add debug route
router.get('/check-user/:email', async (req, res) => {
  try {
    const [user] = await sequelize.query(
      'SELECT email, username, role FROM users WHERE email = :email',
      {
        replacements: { email: req.params.email },
        type: sequelize.QueryTypes.SELECT
      }
    );
    res.json({ exists: !!user, user });
  } catch (error) {
    res.status(500).json({ error: 'Error checking user' });
  }
});

export default router;