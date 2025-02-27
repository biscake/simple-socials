class ValidationError extends Error {
  constructor(statusCode, errors) {
    super("Field validation failed");
    this.statusCode = statusCode;
    this.errors = errors;
    this.cause = errors.map(err => err.path);
  }
}

module.exports = ValidationError;