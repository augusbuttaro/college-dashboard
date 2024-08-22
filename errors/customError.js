import { StatusCodes } from "http-status-codes";
import { Error } from "mongoose";

export class NotFoundError extends Error{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

export class BadRequestError extends Error{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
        Error.captureStackTrace(this, this.constructor)
    }
}

export class UnauthenticatedError extends Error{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

export class UnauthorizedError extends Error{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.FORBIDDEN
    }
}