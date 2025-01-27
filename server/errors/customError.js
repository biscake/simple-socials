class ValidationError extends Error {
  constructor(message, errors) {
    super(message);
    this.statusCode = 409;
    this.errors = errors;
  }
}

module.exports = ValidationError;