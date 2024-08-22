import { toast } from "react-toastify" 
import customFetch from "../utils/customFetch"
import { useLoaderData, Link, useParams, Form } from "react-router-dom"
import { FaUser, FaBook, FaCalendarAlt, FaChalkboardTeacher, FaCheckSquare } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi'
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat'
day.extend(advancedFormat)

export const loader = async ({ params }) =>{
    try {
        const { data } = await customFetch.get(`/classes/${params.id}`)
        return {data} 
    } catch (error) {
        toast.error(error?.response?.data?.msg)
        return error
    }
}

function SingleClass (){
    const { data } = useLoaderData()
    const oneClass = data.classData

    const date = day(oneClass.createdAt).format('DD/MM/YYYY')
    const initial = oneClass.className.charAt(0);
    const upcomingExams = oneClass.exams.filter(exam => day(exam.examDate).isAfter(day()));
    const pastExams = oneClass.exams.filter(exam => day(exam.examDate).isBefore(day()));
    const nonEmptyTodos = oneClass.todos.filter(todo => todo.taskName.trim() !== '');
    const nonEmptyUpcomingExams = upcomingExams.filter(exam => exam.examName.trim() !== '');
    const nonEmptyPastExams = pastExams.filter(exam => exam.examName.trim() !== '');
    const nonEmptyNotes = oneClass.notes.filter(note => note.text.trim() !== '');

    return (
      <div className="flex flex-col xl:p-8">
        {/* Hero Section */}
        <div className="text-dark-blue flex flex-col xl:flex-row justify-between p-6">
          <div className="flex">
            <div className="bg-orange text-white rounded w-16 h-16 flex items-center justify-center text-3xl font-bold">
              {oneClass.className.charAt(0)}
            </div>
            <div className="ml-4">
              <h1 className="text-2xl xl:text-4xl font-bold text-cream uppercase">{oneClass.className}</h1>
              <p className="text-sm text-peach">Course Code: {oneClass.code}</p>
              <p className="text-sm text-peach">Created on: {date}</p>
            </div>
          </div>
          <div className="text-picton-blue mt-4 xl:m-0 self-start">
            <div className="flex items-center gap-2">
                <FaChalkboardTeacher className="text-lg" />
                <p className="text-cream">{oneClass.professorName}</p>
            </div>
            <div className="flex items-center gap-2">
                <HiMail className="text-lg" />
                <p className="text-cream">{oneClass.professorContact}</p>
            </div>
          </div>
        </div>
  
        {/* Content Sections */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-6 h-1/3 min-h-80">
          {/* Exams Section */}
          <div className="bg-dark-blue rounded-lg shadow-lg overflow-y-auto">
              <h2 className="text-xl xl:text-2xl py-3 px-6 bg-picton-blue text-dark-blue font-medium">Exams</h2>
              <div className="flex flex-col xl:flex-row xl:gap-4 justify-around mt-4 px-4 xl:px-6">
                <div>
                    <h3 className="text-lg xl:text-xl text-picton-blue">Next Tests</h3>
                    {nonEmptyUpcomingExams.length > 0 ? (
                        nonEmptyUpcomingExams.map((exam) => (
                            <div key={exam._id} className="flex gap-2 mt-2 xl:text-lg text-cream items-center">
                                <FaCalendarAlt className="xl:hidden" />
                                <p>
                                  {exam.examName} on {day(exam.examDate).format('DD/MM/YY')}
                                </p>
                                <p className="ml-4 bg-picton-blue text-dark-blue font-medium self-center px-2 rounded-lg text-center">{exam.examGrade || '-'}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-peach text-center mt-6 text-lg xl:text-xl">No upcoming exams.</p>
                    )}
                </div>
                <div className="border-t-2 xl:border-t-0 py-6 mt-6 xl:mt-0 xl:py-0 border-light-blue">
                    <h3 className="text-lg xl:text-xl text-picton-blue">Past Tests</h3>
                    {nonEmptyPastExams.length > 0 ? (
                        nonEmptyPastExams.map((exam) => (
                            <div key={exam._id} className="flex gap-2 mt-2 xl:text-lg text-cream items-center">
                                <FaCalendarAlt className="xl:hidden"/>
                                <p>
                                  {exam.examName} on {day(exam.examDate).format('DD/MM/YY')}
                                </p>
                                <p className="bg-picton-blue text-dark-blue font-medium self-center px-2 rounded-lg text-center">{exam.examGrade || '-'}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-peach text-center mt-6 text-lg xl:text-xl">No past exams.</p>
                    )}
                </div>
              </div>
          </div>
  
          {/* Notes Section */}
          <div className="bg-dark-blue rounded-lg shadow-lg overflow-y-auto">
            <h2 className="text-xl xl:text-2xl py-3 px-6 font-medium bg-dark-blue text-picton-blue">Notes</h2>
            {nonEmptyNotes.length > 0 ? (
              <ul className="mt-4 list-disc px-8">
                {nonEmptyNotes.map((note, index) => (
                  <li key={index} className="xl:text-lg text-cream mb-2">
                    {note.text}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-peach text-center my-6 text-lg xl:text-2xl">No notes available.</p>
            )}
          </div>
        </div>
  
        {/* Todos Section */}
        <div className="bg-dark-blue mx-6 relative rounded-lg shadow-lg h-1/4 overflow-y-auto min-h-60">
            <h2 className="text-xl xl:text-2xl px-6 py-3 bg-picton-blue font-medium text-dark-blue ">To-Dos</h2>
            <div className="px-8 text-peach py-2">
              {nonEmptyTodos.length > 0 ? (
                <ul className="mt-4 grid gap-8 xl:grid-cols-2">
                  {nonEmptyTodos.map((todo, index) => (
                    <li key={index} className="xl:text-lg grid xl:grid-cols-3 gap-2 xl:gap-6 mb-2 bg-[#38B6FF33] rounded-lg px-4 py-2">
                      <p className="break-all text-center xl:text-justify self-center">{todo.taskName}</p>
                      <p className="text-center self-center xl:border-x-2 border-light-blue">{day(todo.deadline).format('DD/MM/YYYY')}</p>
                      <p className={`${todo.todoStatus === 'Not started'?'bg-red'
                        : todo.todoStatus === 'In progress'?'bg-yellow':'bg-green'}
                        text-dark-blue font-medium self-center rounded-full text-center max-h-10 px-2 py-1`}>{todo.todoStatus}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-peach text-center mt-6 text-lg xl:text-2xl">No tasks added yet.</p>
              )}
            </div>
          </div>
          <div className="flex justify-center gap-4 text-xl text-dark-blue my-12 w-full">
            <Link className="bg-picton-blue px-4 py-2 rounded-lg border-2 
                border-picton-blue hover:bg-dark-blue hover:text-picton-blue duration-200" to={`/dashboard/edit-class/${oneClass._id}`}>
                    EDIT
            </Link>
            <Form method="post" action={`../delete-class/${oneClass._id}`}>
              <button className="bg-picton-blue px-4 py-2 rounded-lg border-2 
                  border-picton-blue hover:bg-dark-blue hover:text-picton-blue duration-200" to={`../delete-class/${oneClass._id}`}>
                      DELETE
              </button>
            </Form>
          </div>
      </div>
    );
}

export default SingleClass