import { Request, Response, NextFunction } from 'express';
import { body, param, ValidationChain } from 'express-validator';

// Common validation chains
export const commonValidators = {
  // ID parameter validation
  idParam: param('id')
    .isNumeric()
    .withMessage('ID must be a number'),

  // User validators
  username: body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters'),

  email: body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email address'),

  password: body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  // Project validators
  projectTitle: body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Project title must be between 1 and 100 characters'),

  projectDescription: body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Project description cannot exceed 500 characters'),

  // Task validators
  taskTitle: body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Task title must be between 1 and 100 characters'),

  taskDescription: body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Task description cannot exceed 500 characters'),

  taskPriority: body('priority')
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be either low, medium, or high'),

  taskStatus: body('status')
    .isIn(['todo', 'in-progress', 'review', 'done'])
    .withMessage('Invalid task status'),

  // Date validators
  dateValidator: (field: string): ValidationChain => 
    body(field)
      .optional()
      .isISO8601()
      .withMessage('Must be a valid date')
      .toDate(),

  // Number validators
  estimatedHours: body('estimatedHours')
    .optional()
    .isFloat({ min: 0, max: 999.99 })
    .withMessage('Estimated hours must be between 0 and 999.99')
};

// Validator middleware generator
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
      return;
    }

    res.status(400).json({
      message: 'Validation error',
      errors: errors.array()
    });
  };
};

// Helper to validate ID parameters
export const validateId = (req: Request, res: Response, next: NextFunction): void => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: 'Invalid ID parameter' });
    return;
  }
  next();
};

// Project validation chains
export const projectValidationRules = [
  commonValidators.projectTitle,
  commonValidators.projectDescription,
  commonValidators.dateValidator('startDate'),
  commonValidators.dateValidator('dueDate')
];

// Task validation chains
export const taskValidationRules = [
  commonValidators.taskTitle,
  commonValidators.taskDescription,
  commonValidators.taskPriority,
  body('projectId').isInt().withMessage('Project ID must be an integer'),
  commonValidators.dateValidator('startDate'),
  commonValidators.dateValidator('dueDate'),
  commonValidators.estimatedHours
];

// User validation chains
export const userValidationRules = {
  register: [
    commonValidators.username,
    commonValidators.email,
    commonValidators.password,
    body('firstName').optional().trim().isLength({ max: 50 }),
    body('lastName').optional().trim().isLength({ max: 50 })
  ],
  login: [
    commonValidators.email,
    body('password').exists().withMessage('Password is required')
  ]
};

// Helper to validate date ranges
export const validateDateRange = (startDate: Date, endDate: Date): boolean => {
  if (!startDate || !endDate) return true;
  return new Date(startDate) <= new Date(endDate);
};

// Custom validation middleware for date ranges
export const dateRangeValidator = (
  startDateField: string,
  endDateField: string
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const startDate = req.body[startDateField];
    const endDate = req.body[endDateField];

    if (startDate && endDate && !validateDateRange(startDate, endDate)) {
      res.status(400).json({
        message: 'Validation error',
        errors: [{
          msg: 'End date must be after start date',
          param: endDateField
        }]
      });
      return;
    }
    next();
  };
};

// Helper function to get validation result
export const validationResult = require('express-validator').validationResult;

// Export types for use in other files
export type ValidationRules = ValidationChain[];