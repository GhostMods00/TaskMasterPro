"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityMiddleware = void 0;
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
const env_config_1 = __importDefault(require("../config/env.config"));
const error_middleware_1 = require("./error.middleware");
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later'
});
const corsOptions = {
    origin: env_config_1.default.server.corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    credentials: true,
    maxAge: 600
};
const sanitizeRequest = (req, res, next) => {
    if (req.body) {
        Object.keys(req.body).forEach(key => {
            if (typeof req.body[key] === 'string') {
                req.body[key] = req.body[key].trim();
            }
        });
    }
    next();
};
const validateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (req.path.startsWith('/api/public')) {
        return next();
    }
    if (!apiKey || apiKey !== env_config_1.default.server.apiKey) {
        throw new error_middleware_1.AppError(401, 'Invalid API key');
    }
    next();
};
exports.securityMiddleware = {
    helmet: (0, helmet_1.default)(),
    cors: (0, cors_1.default)(corsOptions),
    rateLimiter: limiter,
    sanitizeRequest,
    validateApiKey
};
//# sourceMappingURL=security.middleware.js.map