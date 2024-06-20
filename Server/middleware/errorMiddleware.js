const errorMiddleware = async (error, _req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode).json({
        message: error.message,
        stack: process.env.NODE_ENV === 'dev' ? error.stack : null,
    });

    next();
}

export default errorMiddleware;