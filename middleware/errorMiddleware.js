const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  res.status = statusCode;
  res.json({ message: err.message });
};

const notFoundHandler = (err, req, res, next) => {
  res.status(404).json({
    error: 404,
    message: "Route not found.",
  });
};

module.exports = { errorHandler, notFoundHandler };
