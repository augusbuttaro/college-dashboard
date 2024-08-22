import { body, param, validationResult } from 'express-validator'
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/customError.js'
import mongoose from 'mongoose'
import classSchema from '../models/classModel.js'
import User from '../models/userModel.js'

const withValidationErrors = (validateValues) =>{
    return [...validateValues,
        (req, res, next)=>{
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg).join(', ');
                console.log(errorMessages)
                if(errorMessages.startsWith('No class')){
                    throw new NotFoundError(errorMessages)
                }
                if(errorMessages.startsWith('Not authorized')){
                    throw new UnauthorizedError(errorMessages)
                }
                throw new BadRequestError(errorMessages)
            }
            next()
        }, ]
}

export const validateClassInput = withValidationErrors([
    body('className').notEmpty().withMessage('Class name is required'),
    body('code').notEmpty().withMessage('Class code is required'),
    body('credits').notEmpty().withMessage('Credits are required').isInt({ gt: 0 }).withMessage('Credits must be greater than 0'),
    body('semester').notEmpty().withMessage('Semester is required'),
    body('year').notEmpty().withMessage('Year is required'),
    body('professorName').notEmpty().withMessage("Professor's name is required"),


])

export const validateIdParam = withValidationErrors([
    param('id')
        .custom( async (value, { req })=>{
            const isValidId =  mongoose.Types.ObjectId.isValid(value)
            if(!isValidId) throw new Error('Invalid MongoDB ID')
            const classData = await classSchema.findById(value)
            if(!classData) throw new Error(`No class with the id of ${value}`)
            const isAdmin = req.user.role === 'admin'
            const isOwner = req.user.userId === classData.createdBy.toString()
            if (!isAdmin && !isOwner) throw Error('Not authorized to access this route')
        })
])

 export const validateRegisterInput = withValidationErrors([
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format')
        .custom(async (email)=>{
            const user = await User.findOne({email})
            if(user){
                throw new Error('Email already exists')
            }
        }),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({min:8})
        .withMessage('Password must be at least 8 characters long'),
    body('lastName').notEmpty().withMessage('Last Name is required')
 ])

 export const validateLoginInput = withValidationErrors([
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
 ])

 export const validateUpdateUserInput = withValidationErrors([
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format')
        .custom(async (email, { req })=>{
            const user = await User.findOne({email})
            if(user && user._id.toString() !== req.user.userId){
                throw new Error('Email already exists')
            }
        }),
    body('lastName').notEmpty().withMessage('Last Name is required')
 ])

 