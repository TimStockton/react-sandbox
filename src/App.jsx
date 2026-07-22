import { useState } from 'react'
import { useEffect } from 'react'
import TodoList from "./TodoList"
import './App.css'

function App() {
  // counter
  const [count, setCount] = useState(0)
  // todo list
  const [todoList, setTodoList] = useState([])
  const [inputText, setInputText] = useState("")
  // search / filter
  const [searchText, setSearchText] = useState("")
  // accordion
  const [isOpen, setIsOpen] = useState(false)
  // modal
  const [showModal, setShowModal] = useState(false)
  // editable list
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState("")
  // API fetch
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  //errors
  const [error, setError] = useState("")

  // update the todoList array w/ the new element and clear the input field
  function addTodo() {
    // avoid empty entries
    if (inputText.trim() === "") return

    // spread operator ... creates a new array, appending the new value
    // add elements as objects, not strings
    setTodoList([
      ...todoList,
      {
        id: crypto.randomUUID(),
        text: inputText,
        completed: false
      }
    ])
    setInputText("")
  }

  function saveTodo(id) {
    setTodoList(
      todoList.map(todo =>
        todo.id === id
          ? {
            ...todo,
            text: editText
          }
          : todo
      )
    )

    setEditingId(null)
  }

  function toggleTodo(id) {
    setTodoList(
      todoList.map(todo =>
        todo.id === id
          ? {
            ...todo,
            completed: !todo.completed
          }
          : todo
      )
    )
  }

  // remove element specified by index from the todoList array
  function deleteTodo(idToRemove) {
    // keep all elements that do not share the index with the index to be removed
    setTodoList(
      todoList.filter(todo => todo.id !== idToRemove)
    )
  }

  useEffect(() => {
    async function loadUsers() {
      // hit a real API that returns fake data
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        )

        if (!response.ok) {
          throw new Error("Request failed")
        }

        const data = await response.json()

        setUsers(data)
      }
      catch (err) {
        setError(err.message)
      }
      finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  return (
    <>
      <section id="center">
        <br></br>
        <div className="hero">
          <h1>WELCOME TO THE REACT SANDBOX</h1>
        </div>
        <p>----------</p>
        <div>
          <p>This is a basic counter that utilizes the useState hook</p>
          <p>Current count is: {count}</p>
          <button onClick={() => setCount((count) => count + 1)}>Increment</button>
        </div>
        <p>----------</p>
        <div>
          <p>This is a basic todo list that uses map and filter</p>
          <ul>
              <TodoList
                todoList={todoList}
                deleteTodo={deleteTodo}
                toggleTodo={toggleTodo}
              />
          </ul>
          <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTodo()
                }
              }}
          />
          <button onClick={addTodo}>+</button>
        </div>
        <p>----------</p>
        <div>
          <p>This is a basic search/filter list that uses the todo elements</p>
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
          />
          <ul>
            {todoList
              .filter(todo =>
                todo.text.toLowerCase().includes(searchText.toLowerCase())
              ).map((todo, index) => (
                <li key={todo.id}>{todo.text}
                  <button style={{marginLeft: 20 + 'px'}} onClick={() => deleteTodo(todo.id)}>-</button>
                </li>
            ))}
          </ul>
        </div>
        <p>----------</p>
        <div>
          <p>This is a basic accordion</p>
          <button onClick={() => setIsOpen(!isOpen)}>
            Toggle
          </button>

          {isOpen && (
            <p>
              Hidden content!
            </p>
          )}
        </div>
        <p>----------</p>
        <div>
          <p>This is a basic modal</p>
          <button onClick={() => setShowModal(true)}>
            Open Modal
          </button>

          {showModal && (
            <div className="overlay">
              <div className="modal">
                <h2>Hello!</h2>

                <button onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
        <p>----------</p>
        <div>
          <p>This is a basic editable list that uses the todo elements</p>

          {todoList.map(todo => (
            <div key={todo.id}>

              {editingId === todo.id ? (
                <>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />

                  <button onClick={() => saveTodo(todo.id)}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  {todo.text}

                  <button
                    onClick={() => {
                      setEditingId(todo.id)
                      setEditText(todo.text)
                    }}
                  >
                    Edit
                  </button>
                </>
              )}

            </div>
          ))}

        </div>
        <p>----------</p>
        <div>
          <p>This is a basic API data display</p>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <ul>
            {users.map(user => (
              <li key={user.id}>
                {user.name}
              </li>
            ))}
          </ul>
        </div>
        <br></br>
      </section>
    </>
  )
}

export default App
