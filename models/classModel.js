import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
  taskName: {
    type: String,
  },
  deadline: {
    type: Date,
    default: null,
  },
  todoStatus: {
    type: String,
    enum: ['Not started', 'In progress', 'Completed'],
    default: 'Not started',
  },
});

const examSchema = new mongoose.Schema({
  examName: {
    type: String,
  },
  examDate: {
    type: Date,
  },
  examGrade: {
    type: String,
  },
});

const noteSchema = new mongoose.Schema({
  text: {
    type: String,
  },
});

const classSchema = new mongoose.Schema({
    className: {
      type: String,
    },
    schedule: {
      type: String,
    },
    code: {
      type: String,
    },
    credits: {
      type: Number,
    },
    semester: {
      type: String,
    },
    year: {
      type: String,
    },
    professorName: {
      type: String,
    },
    professorContact: {
      type: String,
    },
    todos: [todoSchema],
    exams:[examSchema],
    notes:[noteSchema],
    createdBy:{
      type:mongoose.Types.ObjectId,
      ref:'User'
    }
  }, {timestamps:true});

  export default mongoose.model('classSchema', classSchema)

