export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  
  export const isValidPassword = (password: string): {
    isValid: boolean;
    errors: string[];
  } => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push('Password must contain at least one special character (!@#$%^&*)');
    }
  
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  
  export const isValidUsername = (username: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    return usernameRegex.test(username);
  };
  
  export const validateFormField = (
    value: string,
    fieldName: string,
    options: {
      required?: boolean;
      minLength?: number;
      maxLength?: number;
      pattern?: RegExp;
      customValidation?: (value: string) => boolean;
    } = {}
  ): { isValid: boolean; error: string | null } => {
    const {
      required = true,
      minLength,
      maxLength,
      pattern,
      customValidation
    } = options;
  
    // Check if field is required
    if (required && !value.trim()) {
      return { isValid: false, error: `${fieldName} is required` };
    }
  
    // Check minimum length
    if (minLength && value.length < minLength) {
      return {
        isValid: false,
        error: `${fieldName} must be at least ${minLength} characters`
      };
    }
  
    // Check maximum length
    if (maxLength && value.length > maxLength) {
      return {
        isValid: false,
        error: `${fieldName} must not exceed ${maxLength} characters`
      };
    }
  
    // Check pattern
    if (pattern && !pattern.test(value)) {
      return {
        isValid: false,
        error: `${fieldName} format is invalid`
      };
    }
  
    // Custom validation
    if (customValidation && !customValidation(value)) {
      return {
        isValid: false,
        error: `${fieldName} is invalid`
      };
    }
  
    return { isValid: true, error: null };
  };
  
  export const sanitizeInput = (input: string): string => {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  };
  
  export type ValidationResult = {
    isValid: boolean;
    errors: Record<string, string>;
  };
  
  export const validateForm = (
    data: Record<string, any>,
    validations: Record<string, Array<(value: any) => string | null>>
  ): ValidationResult => {
    const errors: Record<string, string> = {};
    let isValid = true;
  
    Object.keys(validations).forEach((key) => {
      const value = data[key];
      const fieldValidations = validations[key];
  
      for (const validate of fieldValidations) {
        const error = validate(value);
        if (error) {
          errors[key] = error;
          isValid = false;
          break;
        }
      }
    });
  
    return { isValid, errors };
  };
  
  // Common validation rules
  export const validationRules = {
    required: (value: any): string | null =>
      !value ? 'This field is required' : null,
  
    minLength: (length: number) => (value: string): string | null =>
      value.length < length ? `Must be at least ${length} characters` : null,
  
    maxLength: (length: number) => (value: string): string | null =>
      value.length > length ? `Must not exceed ${length} characters` : null,
  
    email: (value: string): string | null =>
      !isValidEmail(value) ? 'Invalid email address' : null,
  
    phone: (value: string): string | null =>
      !/^\+?[\d\s-]{10,}$/.test(value) ? 'Invalid phone number' : null,
  
    url: (value: string): string | null =>
      !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value)
        ? 'Invalid URL'
        : null,
  
    numeric: (value: string): string | null =>
      !/^\d+$/.test(value) ? 'Must contain only numbers' : null,
  
    alphanumeric: (value: string): string | null =>
      !/^[a-zA-Z0-9]+$/.test(value) ? 'Must contain only letters and numbers' : null,
  };