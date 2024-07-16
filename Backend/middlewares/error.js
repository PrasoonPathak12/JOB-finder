class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}

const errorMiddleware = (err, req, res, next)=>{
    err.message = err.message || 'Internal server error';
    err.statusCode = err.statusCode || 500;

    const message = '';
    if(err.name === 'CaseError') {
        message = `Resource not found. Invalid ${err.path}`;
    }
    if(err.code === 11000) {
        message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    }
    if(err.name === 'JsonWebTokenError') {
        message = `JWT us invalid, try again!`;
    }
    if(err.name === 'TokenExpiredError') {
        message = `JWT is expired, try again!`;
    }

    err = new ErrorHandler(message, 400);

    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};

module.exports = errorMiddleware;