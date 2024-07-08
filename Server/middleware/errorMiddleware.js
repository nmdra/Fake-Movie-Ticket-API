const errorMiddleware = (error, req, res, next) => {
    const statusCode = error.statusCode ? error.statusCode : 500

    let response

    if (process.env.NODE_ENV === 'dev') {
        response = {
            message: error.message,
            statusCode,
            method: req.method,
            requestUrl: req.originalUrl,
            stack: error.stack,
        }
    } else {
        response = {
            message: error.message,
        }
    }

    res.status(statusCode).json(response)

    next()
}

export default errorMiddleware

// https://expressjs.com/en/guide/error-handling.html
