function TodoList({ todoList, deleteTodo, toggleTodo }) {

    return (
    <ul>
        {todoList.map(todo => (
        <li
            key={todo.id}
            style={{
            textDecoration: todo.completed
                ? "line-through"
                : "none"
            }}
        >
            {todo.text}

            <button
            style={{marginLeft: "20px"}}
            onClick={() => deleteTodo(todo.id)}
            >
            -
            </button>

        </li>
        ))}
    </ul>
    )
}

export default TodoList