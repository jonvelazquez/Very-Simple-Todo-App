import TodoItem from './TodoItem';

function TodoList({ todos, updateTodo, deleteTodo, toggleComplete, editingId, setEditingId }) {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
          editingId={editingId}
          setEditingId={setEditingId}
        />
      ))}
    </div>
  );
}

export default TodoList;
