import express, { Router } from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/auth.controller';
import { validate } from '../middleware/validate.middleware';

const router: Router = express.Router();

const registerValidation = [
  body('username').trim().isLength({ min: 3, max: 30 }),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('firstName').trim().optional(),
  body('lastName').trim().optional()
];

const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
];

router.post('/register', validate(registerValidation), register as express.RequestHandler);
router.post('/login', validate(loginValidation), login as express.RequestHandler);

export default router;