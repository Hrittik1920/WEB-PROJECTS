import { useState, useEffect } from 'react'
import { BiEditAlt } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Navbar from './Components/Navbar'
import Footer from './Components/Footer';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todosString = localStorage.getItem("todos");
    if (todosString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const toggleFinished = () => {
    setShowFinished(!showFinished)
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS();
  }

  const handleEdit = (e, id) => {
    let selectedTodo = todos.filter(item => item.id === id);
    setTodo(selectedTodo[0].todo);
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  }

  const handleDelete = (e, id) => {
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  }

  return (
    <>
      <Navbar />
      <div className="container md:mx-auto md:my-5 rounded-xl p-5 md:p-10 bg-purple-100 md:w-3/5 min-h-[83vh]">
        <div className="heading text-2xl font-bold text-center mb-4">iTask - Manage your todos at one place</div>
        <div className="addTodos mb-5">
          <h2 className='text-lg font-bold mb-2 ml-2'>Add a Todo</h2>
          <div className='flex'>
            <input onChange={handleChange} value={todo} className='w-full p-2 py-1 rounded-full' type="text"/>
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-purple-800 rounded-full px-4 py-2 font-semibold text-white text-sm disabled:opacity-70 hover:font-bold hover:bg-purple-900 ml-3'>Add</button>
          </div>
        </div>
        <div>
          <input className='mb-2' onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
          <div className='bg-black h-[1px] opacity-30 m-3'></div>
          <h2 className='text-lg font-bold'>Your Todos</h2>
          <div className="todos">
            {todos.length === 0 && <div className='my-2'>No Todos to Display</div>}

            {todos.map(item => {
              return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-2 md:w-3/4 justify-between">
                <div className='flex gap-3'>
                  <input name={item.id} onChange={handleCheckBox} type="checkbox" checked={item.isCompleted} />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => handleEdit(e, item.id)} className='bg-purple-800 rounded-md px-2 py-1 font-semibold text-white text-sm hover:font-bold hover:bg-purple-900 ml-3'><BiEditAlt /></button>
                  <button onClick={(e) => handleDelete(e, item.id)} className='bg-purple-800 rounded-md px-2 py-1 font-semibold text-white text-sm hover:font-bold hover:bg-purple-900 ml-3'><MdOutlineDeleteOutline /></button>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default App
