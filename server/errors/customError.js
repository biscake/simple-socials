class ExistingUserError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = "ExistingUsername";
  }
}

module.exports = ExistingUserError;