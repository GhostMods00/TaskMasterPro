"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const validateFields = (fields, required) => {
    for (const field of required) {
        if (!fields[field])
            return `Field ${field} is required.`;
    }
    return null;
};
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const error = validateFields(req.body, ['email', 'password']);
        if (error) {
            return res.status(400).json({ message: error });
        }
        const [user] = yield database_1.sequelize.query(`
      SELECT id, username, email, password, role 
      FROM users 
      WHERE email = :email
    `, {
            replacements: { email },
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (!user) {
            console.warn(`Login failed: User not found for email ${email}`);
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isValidPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            console.warn(`Login failed: Invalid password for email ${email}`);
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not configured');
            return res.status(500).json({ message: 'Server configuration error' });
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            role: user.role,
        }, process.env.JWT_SECRET, { expiresIn: '24h' });
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
    }
    catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server error during login' });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const error = validateFields(req.body, ['username', 'email', 'password']);
        if (error) {
            return res.status(400).json({ message: error });
        }
        const [existingUser] = yield database_1.sequelize.query(`
      SELECT * FROM users WHERE email = :email OR username = :username
    `, {
            replacements: { email, username },
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (existingUser) {
            console.warn(`Registration failed: User already exists for email ${email} or username ${username}`);
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const [newUser] = yield database_1.sequelize.query(`
      INSERT INTO users (username, email, password, role, created_at, updated_at)
      VALUES (:username, :email, :password, 'user', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING id, username, email, role;
    `, {
            replacements: {
                username,
                email,
                password: hashedPassword,
            },
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (!newUser) {
            throw new Error('Failed to create user');
        }
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not configured');
            return res.status(500).json({ message: 'Server configuration error' });
        }
        const token = jsonwebtoken_1.default.sign({ id: newUser.id, email, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '24h' });
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
    }
    catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Server error during registration' });
    }
});
exports.register = register;
//# sourceMappingURL=auth.controller.js.map