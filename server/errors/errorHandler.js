module.exports = (err, req, res, next) => {
  console.log(err);
  // res.status(err.statusCode || 500).send(err.message);
  res.send(err.message);
  // res.json({errors: err});
}