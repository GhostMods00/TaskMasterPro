"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            if (!req.body) {
                return res.status(400).json({ message: 'No request body provided' });
            }
            next();
        }
        catch (error) {
            return res.status(400).json({ message: 'Validation error', error });
        }
    };
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=validation.middleware.js.map