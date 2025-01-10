"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.errorHandler = exports.AppError = void 0;
class AppError extends Error {
    constructor(statusCode, message, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
exports.AppError = AppError;
const errorHandler = (err, req, res, next) => {
    const errorResponse = {
        status: 'error',
        message: err.message || 'Internal server error'
    };
    if (err instanceof AppError) {
        errorResponse.status = err.statusCode < 500 ? 'fail' : 'error';
        if (process.env.NODE_ENV === 'development') {
            errorResponse.stack = err.stack;
        }
        return res.status(err.statusCode).json(errorResponse);
    }
    if (err.name === 'SequelizeValidationError') {
        errorResponse.status = 'fail';
        errorResponse.message = 'Validation error';
        errorResponse.errors = err.errors.map((e) => ({
            field: e.path,
            message: e.message
        }));
        return res.status(400).json(errorResponse);
    }
    if (err.name === 'JsonWebTokenError') {
        errorResponse.status = 'fail';
        errorResponse.message = 'Invalid token';
        return res.status(401).json(errorResponse);
    }
    if (err.name === 'TokenExpiredError') {
        errorResponse.status = 'fail';
        errorResponse.message = 'Token expired';
        return res.status(401).json(errorResponse);
    }
    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack;
    }
    res.status(500).json(errorResponse);
};
exports.errorHandler = errorHandler;
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
exports.asyncHandler = asyncHandler;
//# sourceMappingURL=error.middleware.js.map