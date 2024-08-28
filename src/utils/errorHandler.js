const errorHandler = (err, req, res, next) => {
    console.error(err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor';

    res.status(statusCode).json({
        error: {
            message: message,
            name: err.name
        }
    });
};

module.exports = errorHandler;