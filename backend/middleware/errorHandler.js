function errorHandler(err, req, res, next) {

  const status = err.status || 500;
  const response = {
    success: false,
    message: err.message || 'Internal server error',
    type: err.type || 'UNKNOWN_ERROR'
  };

  if (err.errors) {
    response.errors = err.errors;
  }

  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(status).json(response);
}

module.exports = errorHandler;