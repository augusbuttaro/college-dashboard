import { FaCalendarAlt, FaUser, FaBook, FaBell, FaChalkboardTeacher } from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat'
day.extend(advancedFormat)

function Class ({
    _id,
    className,
    schedule,
    code,
    credits,
    semester,
    year,
    professorName,
    professorContact,
    createdAt,
    exams,
}){
    const date = day(createdAt).format('DD/MM/YYYY')
    const initial = className.charAt(0);

    const upcomingExam = exams
    .filter(exam => exam.examDate) 
    .map(exam => ({
      ...exam,
      date: day(exam.examDate, 'YYYY-MM-DD') 
    }))
    .filter(exam => exam.date.isAfter(day())) 
    .sort((a, b) => a.date.diff(b.date)) 
    .find(exam => exam.date.isAfter(day())); 

    console.log(exams)
    console.log(upcomingExam)

  const nextExam = upcomingExam
    ? `${upcomingExam.date.format('DD/MM/YYYY')}`
    : '';

    return(
        <Link to={`single-class/${_id}`}>
            <div className="bg-blue w-full border-picton-blue hover:bg-light-blue duration-500 cursor-pointer 
                rounded-lg p-4 shadow-lg hover:shadow-xl">
                <div className="flex items-center mb-4">
                    <div className="bg-orange text-white rounded-lg w-10 h-10 flex items-center justify-center text-lg font-bold mr-3">
                        {initial}
                    </div>
                    <div className='flex w-full justify-between'>
                        <div>
                        <h2 className="text-xl text-peach font-semibold font-poppins uppercase">{className}</h2>
                        <p className="text-sm text-gray-400">{code}</p>
                        </div>
                        <div className="text-gray-400 text-sm">
                            {semester} {year}
                        </div>
                    </div>
                </div>
            
                <div className="flex flex-col gap-3 mb-4">
                    <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-dark-blue" />
                        <span className="text-gray-200">
                            {upcomingExam?'Next test on ':'No upcoming tests'}
                            {nextExam}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaBook className="text-dark-blue" />
                        <span className="text-gray-200">{schedule}</span>
                    </div>
                </div>
            
                <div className="flex justify-between items-center border-t border-orange pt-3">
                    <div className="flex items-center gap-2">
                    <FaUser className="text-dark-blue" />
                    <div>
                        <p className="text-gray-200">{professorName}</p>
                        <p className="text-gray-400 text-sm">{professorContact}</p>
                    </div>
                    </div>
                    <div className="text-gray-400 text-sm">{credits} {credits === 1?'Credit':'Credits'}</div>
                </div>
            </div>
        </Link>
    )
}

export default Class