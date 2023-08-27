const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // next() will pass the error to the error handler
};

// Error handler middleware
// Path: server\middleware\errorMiddleware.js
// Compare this snippet from server\middleware\errorMiddleware.js:

const errorHandler = (err, req, res, next) => {
  // Set the status code to 500 if the status code is not set
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
