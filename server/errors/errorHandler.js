const QueryError = require("./QueryError");
const ValidationError = require("./ValidationError");
const AuthenticationError = require("./AuthenticationError");

module.exports = (err, req, res, next) => {
  console.log(err);
  let statusCode = err.statusCode || 500;
  let msg = err.message || 'An unexpected error occurred';

  if (process.env.NODE_ENV === 'production') {
    msg = statusCode === 500 ? 'An unexpected error occurred' : msg;
  }

  if (err instanceof QueryError) {
    return res.status(statusCode).json({
      type: "QueryError",
      success: false,
      errors: [{
        msg
      }]
    })
  }

  if (err instanceof ValidationError) {
    console.log(err.cause);
    return res.status(statusCode).json({
      type: "ValidationError",
      success: false,
      errors: err.errors
    })
  }

  if (err instanceof AuthenticationError) {
    return res.status(statusCode).json({
      type: "AuthenticationError",
      success: false,
      errors: [{
        msg
      }]
    })
  }

  return res.status(statusCode).json({ 
    success: false,
    errors: [{
      msg,
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    }]
  });
}