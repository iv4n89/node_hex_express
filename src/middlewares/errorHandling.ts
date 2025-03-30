import {NextFunction, Request, Response} from 'express-serve-static-core';

function errorHandling(err: Error, req: Request, res: Response, next: NextFunction) {
    res.status(Math.max(res.statusCode, 400)).send({
        message: err.message,
        code: Math.max(res.statusCode, 400),
    });
}

module.exports = errorHandling;
