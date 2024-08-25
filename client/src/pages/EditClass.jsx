import { Form, useNavigation, redirect, useOutletContext, useParams, useLoaderData } from "react-router-dom"
import { toast } from "react-toastify"
import customFetch from "../utils/customFetch"
import { FormRow, FormRowSelect, ClassInfo, Notes, Exams, TodoList } from "../components"
import { useState } from "react"
import { v4 as uuidv4} from "uuid"

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/classes/${params.id}`);
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect(`/dashboard/single-class/${params.id}`);
  }
};

export const action = (queryClient)=> async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const todos = [];
  const exams = [];
  const notes =[];

  for (let [key, value] of formData.entries()) {
    if (key.startsWith('todo-')) {
      const [_, index, field] = key.split('-');
      todos[index] = todos[index] || {};
      todos[index][field] = value;
    } else if (key.startsWith('exam-')) {
      const [_, index, field] = key.split('-');
      exams[index] = exams[index] || {};
      exams[index][field] = value;
    } else if (key.startsWith('note-')) {
      const [_, index, field] = key.split('-');
      notes[index] = notes[index] || {};
      notes[index][field] = value;
    }
  }

  data.todos = todos;
  data.exams = exams;
  data.notes = notes;

  try {
    await customFetch.patch(`/classes/${params.id}`, data);
    queryClient.invalidateQueries(['classes'])
    toast.success('Class updated successfully!');
    return redirect(`/dashboard/single-class/${params.id}`);
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

function EditClass() {
  const { user } = useOutletContext();
  const { data } = useLoaderData();
  const oneClass = data.classData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const [todos, setTodos] = useState(oneClass.todos || []);
  const [exams, setExams] = useState(oneClass.exams || []);
  const [notes, setNotes] = useState(oneClass.notes || []);

  const handleItemChange = (type, index, field, value) => {
    if (type === 'todo') {
      const updatedTodos = [...todos];
      updatedTodos[index][field] = value;
      setTodos(updatedTodos);
    } else if (type === 'exam') {
      const updatedExams = [...exams];
      updatedExams[index][field] = value;
      setExams(updatedExams);
    } else if (type === 'note') {
      const updatedNotes = [...notes];
      updatedNotes[index][field] = value;
      setNotes(updatedNotes);
    }
  };

  const handleAddItem = (type) => {
    if (type === 'todo') {
      setTodos([...todos, { _id: uuidv4(), taskName: '', deadline: '', todoStatus: 'Not started' }]);
    } else if (type === 'exam') {
      setExams([...exams, { _id: uuidv4(), subject: '', date: '', grade: '' }]);
    } else if (type === 'note') {
      setNotes([...notes, { _id: uuidv4(), text: '' }]);
    }
  };

  const handleDeleteItem = (type, index) => {
    console.log(`Deleting ${type} at index:`, index);
    if (type === 'todo') {
      const updatedTodos = todos.filter((_, i) => i !== index);
      setTodos(updatedTodos);
      console.log(updatedTodos)
    } else if (type === 'exam') {
      const updatedExams = exams.filter((_, i) => i !== index);
      setExams(updatedExams);
    } else if (type === 'note') {
      const updatedNotes = notes.filter((_, i) => i !== index);
      setNotes(updatedNotes);
    }
  };


    const statusList = ['Not started', 'In progress', 'Completed']
    return (
        <div className="w-4/5 mx-auto">
          <Form method='post' className="flex flex-col justify-center">
            <h1 className="text-peach w-full text-center text-xl xl:my-10 my-6 font-semibold xl:text-3xl">EDIT CLASS</h1>
            <ClassInfo user={user} classInfo={oneClass}/>
            <div className="xl:w-4/5 xl:mx-auto my-6">
              <h2 className="text-peach font-semibold text-xl mb-4 xl:my-4  xl:text-2xl">Edit tasks from your To-Do list</h2>
              <TodoList 
                todos={todos} 
                handleTodoChange={(type, index, field, value) =>handleItemChange('todo', index, field, value)} 
                handleAddTodo={() => handleAddItem('todo')} 
                handleDeleteTodo={(index) => handleDeleteItem('todo', index)}
                statusList={statusList} 
              />
            </div>
            <div className="mb-6 py-4  xl:w-4/5 xl:mx-auto">
              <h2 className="text-peach font-semibold text-xl mb-4 xl:my-4 xl:mx-2 xl:text-2xl">Edit Exams</h2>
              <Exams
              exams={exams}
              handleExamChange={(type, index, field, value) => handleItemChange('exam', index, field, value)}
              handleAddExam={() => handleAddItem('exam')}
              handleDeleteExam={(index) => handleDeleteItem('exam', index)}
            />
            </div>
            <div className="mb-6 py-4  xl:w-4/5 xl:mx-auto">
              <h2 className="text-peach font-semibold text-xl mb-4 xl:my-4 xl:mx-2 xl:text-2xl">Edit Notes</h2>
              <Notes
              notes={notes}
              handleNoteChange={( index, field, value) => handleItemChange('note', index, field, value)}
              handleAddNote={() => handleAddItem('note')}
              handleDeleteNote={(index) => handleDeleteItem('note', index)}
            />
            </div>
            <button type="submit" disabled={isSubmitting} className="my-6 xl:w-2/5 w-full xl:my-10 mx-auto bg-peach py-1 rounded-lg text-dark-blue
                font-medium duration-200 hover:bg-dark-blue hover:text-peach">
                { isSubmitting? 'EDITING...' : 'EDIT' }
            </button>
          </Form>
        </div>
    )
}

export default EditClass