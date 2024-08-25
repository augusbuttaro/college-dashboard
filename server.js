import 'express-async-errors'
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import morgan from 'morgan'
import { nanoid } from 'nanoid'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cloudinary from 'cloudinary'
import helmet from 'helmet'
import mongSanitize from 'express-mongo-sanitize'

import classRouter from './routes/classRouter.js'
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'
import { authenticateUser } from './middleware/authMiddleware.js'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(express.static(path.resolve(__dirname, './client/dist')))
app.use(cookieParser())
app.use(express.json())
app.use(helmet())
app.use(mongSanitize())

app.use('/api/v1/classes',authenticateUser, classRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', authenticateUser, userRouter)

app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'))
})

app.use('*', (req, res)=>{
    res.status(404).json({msg:'not found'})
})

app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

try {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(port, () =>{
        console.log(`Server running on port ${port}`)
    })
} catch (error) {
    console.log(error)
}
 
