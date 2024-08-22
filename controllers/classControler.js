import classSchema from '../models/classModel.js'
import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import day from 'dayjs'

export const getAllClasses = async (req,res)=>{
    const { search, sort } = req.query
    const queryObject = {
        createdBy:req.user.userId
    }
    if(search){
        queryObject.$or = [{ className: { $regex:search, $options:'i' } }]
    }
    const sortOptions = {
        newest:'-createdAt',
        oldest:'createdAt',
        'A-Z':'className',
        'Z-A':'-className',
    }
    const sortKey = sortOptions[sort] || sortOptions.newest

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 6
    const skip = (page-1) * limit

    const classes = await classSchema.find(queryObject).sort(sortKey).skip(skip).limit(limit)

    const totalClasses = await classSchema.countDocuments(queryObject)
    const numOfPages = Math.ceil(totalClasses/limit)
    res.status(StatusCodes.OK).json({totalClasses, numOfPages, currentPage:page, classes})
}

export const addClass = async (req,res)=>{
    req.body.createdBy = req.user.userId
    const classData = await classSchema.create(req.body)
    res.status(StatusCodes.CREATED).json({classData})
}

export const getSingleClass = async (req,res)=>{
    const classData = await classSchema.findById(req.params.id)
    res.status(StatusCodes.OK).json({classData})
}

export const editClass = async (req,res)=>{
    const updatedClass = await classSchema.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.status(StatusCodes.OK).json({updatedClass})
}

export const deleteClass = async (req, res)=>{
    const deletedClass = await classSchema.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.OK).json({deletedClass})
}

export const showStats = async(req, res)=>{

    let stats = await classSchema.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } }, 
        { $unwind: "$todos" },
        { $group: { _id: "$todos.todoStatus", count: { $sum: 1 } } },
      ])
      stats = stats.reduce((acc,curr)=>{
        const {_id:title, count} = curr
        acc[title] = count
        return acc
    },{})

    const defaultStats = {
        notStartedTasks: stats['Not started'] || 0,
        inProgressTasks:stats['In progress'] || 0,
        completedTasks:stats.Completed || 0,
    }
    let monthlyClasses = await classSchema.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        {$group: {
                _id:{ year: {$year: '$createdAt'}, month: {$month: '$createdAt'}},
                count: { $sum: 1 }
            },
        },
        { $sort: {'_id.year':-1, '_id.month':-1 } },
        { $limit: 12 }

    ])

    monthlyClasses = monthlyClasses.map((item) =>{
        const {_id:{year, month}, count} = item
        const date = day().month(month -1).year(year).format('MMM YY')
        return { date, count }
    }).reverse()

    console.log(monthlyClasses)
    res.status(StatusCodes.OK).json({defaultStats, monthlyClasses})
}