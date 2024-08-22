import { FormRow, FormRowSelect } from "./index"
import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import dayjs from "dayjs";

function TodoList({ todos, handleTodoChange, handleAddTodo, handleDeleteTodo, statusList }){
    return (
        <div className="py-4 border-b-2 border-blue flex flex-col justify-center">
              {todos.map((todo, index) => (
                <div key={todo._id} className="flex flex-col items-center xl:flex-row mb-4">
                    <div className="xl:grid w-full xl:grid-cols-2 xl:mx-2 xl:gap-4">
                      <FormRow 
                      type="text" 
                      name={`todo-${index}-taskName`} 
                      labelText="Name" 
                      placeholder="Task" 
                      className='bg-picton-blue placeholder:text-blue m-2'
                      value={todo.taskName} 
                      onChange={(e) => handleTodoChange('todo', index, 'taskName', e.target.value)}
                      defaultValue={todo.taskName} />
                      <div className="flex flex-col w-full xl:gap-4 xl:flex-row xl:justify-between">
                        <div className="xl:w-1/3 ">
                          <label className="block sm:text-xl text-cream" htmlFor={`todo-${index}-deadline`}>Deadline</label>
                          <input 
                            type='date'
                            id={`todo-${index}-deadline`} 
                            name={`todo-${index}-deadline`}
                            className='block py-2 px-4 w-full font-semibold outline-none rounded-sm 
                                bg-picton-blue placeholder:text-blue m-2'
                            onChange={(e) => handleTodoChange('todo', index, 'deadline', e.target.value)}
                            value={dayjs(todo.deadline).format('YYYY-MM-DD') || ''}
                          />
                        </div>
                        <div className="flex gap-4 xl:gap-6 items-center">
                          <FormRowSelect 
                            className='text-peach xl:text-lg w-full' 
                            name={`todo-${index}-todoStatus`} 
                            labelText='Status' 
                            value={todo.todoStatus}
                            onChange={(e) => handleTodoChange('todo', index, 'todoStatus', e.target.value)}
                            list={statusList}/>
                          <button
                            type="button"
                            onClick={() => handleDeleteTodo(index)}
                            className="bg-red p-2.5 mt-6 text-xl xl:mt-7 text-cream w-fit"
                          >
                            <IoMdClose />
                          </button>
                        </div>
                      </div>
                    </div>
                </div>
              ))}
              <button type="button" onClick={handleAddTodo} className="my-4 w-fit mx-auto px-4 py-2 bg-blue border-2 border-blue 
                text-cream rounded-lg hover:border-peach duration-200">
                {todos.length === 0? 'Add Task':'Add Another Task'}
              </button>
            </div>
    )
}

export default TodoList