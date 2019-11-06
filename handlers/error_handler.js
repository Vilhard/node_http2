const errorHandler = (err, req, res, next) => {
  if (!err.statusCode || err.statusCode === 500) {
    res.status(500).send({
      error: "Internal error!"
    });
  } else {
    res.status(err.statusCode).send({ error: err.message });
  }
};

module.exports = errorHandler;
