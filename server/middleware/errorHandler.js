const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'Validation error',
        errors: err.errors.map(e => ({
          field: e.path,
          message: e.message
        }))
      });
    }
  
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        message: 'Resource already exists',
        errors: err.errors.map(e => ({
          field: e.path,
          message: e.message
        }))
      });
    }
  
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        message: 'Invalid authentication token'
      });
    }
  
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Authentication token expired'
      });
    }
  
    // Default error
    res.status(500).json({
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  };
  
  module.exports = errorHandler;