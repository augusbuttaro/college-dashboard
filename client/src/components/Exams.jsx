import { FormRow, FormRowSelect } from "./index";
import { IoMdClose } from "react-icons/io";
import dayjs from "dayjs";

function Exams({ exams, handleExamChange, handleAddExam, handleDeleteExam, gradesList }) {
    return (
        <div className="border-b-2 border-blue flex flex-col justify-center">
            {exams.map((exam, index) => (
                <div key={exam._id} className="flex flex-col items-center xl:flex-row xl:mx-2 xl:gap-4 mb-4">
                    <FormRow
                        type="text"
                        name={`exam-${index}-examName`}
                        labelText="Name"
                        placeholder="Exam"
                        className='bg-picton-blue placeholder:text-blue w-1/3 m-2'
                        value={exam.examName}
                        onChange={(e) => handleExamChange('exam', index, 'examName', e.target.value)}
                        defaultValue={exam.examName}
                    />
                    <div className="flex items-center gap-4 xl:gap-6">
                        <FormRow
                            type="date"
                            name={`exam-${index}-examDate`}
                            labelText="Date"
                            className='bg-picton-blue m-2 mr-0'
                            value={exam.examDate}
                            onChange={(e) => handleExamChange('exam', index, 'examDate', e.target.value)}
                            defaultValue={dayjs(exam.examDate).format('YYYY-MM-DD') || ''}
                        />
                        <FormRow
                            type='text'
                            name={`exam-${index}-examGrade`}
                            labelText="Grade"
                            placeholder="A"
                            value={exam.examGrade || ''}
                            onChange={(e) => handleExamChange('exam', index, 'examGrade', e.target.value)}
                            className='bg-picton-blue placeholder:text-blue text-center m-2'
                            defaultValue={exam.examGrade}
                        />
                        <button
                            type="button"
                            onClick={() => handleDeleteExam(index)}
                            className="bg-red p-2.5 mt-6 mx-2 text-xl xl:mt-7 text-cream w-fit"
                            >
                            <IoMdClose />
                        </button>
                    </div>
                </div>
            ))}
            <button
                type="button"
                onClick={handleAddExam}
                className="my-4 w-fit mx-auto px-4 py-2 bg-blue border-2 border-blue 
                    text-cream rounded-lg hover:border-peach duration-200"
            >
                {exams.length === 0? 'Add Exam':'Add Another Exam'}
            </button>
        </div>
    );
}

export default Exams;