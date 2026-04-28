import { useEffect, useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem('vstda-todos');
    return stored ? JSON.parse(stored) : [];
  });

  const [editingId, setEditingId] = useState(null);

  const [sortBy, setSortBy] = useState('none');

  useEffect(() => {
    localStorage.setItem('vstda-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text, priority) => {
    if (!text || !text.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      priority,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const updateTodo = (id, updatedFields) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updatedFields } : todo))
    );
    
    setEditingId(null);
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const getSortedTodos = () => {
    if (sortBy === 'priority') {

      return [...todos].sort((a, b) => Number(a.priority) - Number(b.priority));
    }
    return todos;
  };

  const sortedTodos = getSortedTodos();

  return (
    <div className={`app ${editingId ? 'editing' : ''}`}>
      {/* Header: title top-left with subtitle below */}
      <header className="app-header left-align">
        <div className="title-block">
          <h1>Very Simple Todo App</h1>
          <p className="subtitle">Track all of the things.</p>
        </div>

        <div className="header-controls">
          <label className="sort-label" htmlFor="sort-select">Sort:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
            aria-label="Sort todos"
          >
            <option value="none">None</option>
            <option value="priority">Priority (High → Low)</option>
          </select>

          <button
            onClick={() => document.body.classList.toggle('dark-mode')}
            className="dark-toggle"
            type="button"
            aria-label="Toggle dark mode"
          >
            Toggle Dark Mode
          </button>
        </div>
      </header>

      <main className="app-main">
        {/* Left panel */}
        <section className="panel panel-left">
          <div className="panel-header">
            <h2>Add New Todo</h2>
          </div>

          <div className="panel-body">
            <TodoForm addTodo={addTodo} />
          </div>

          <div className="panel-footer">
            <button
              className="btn-add"
              data-testid="create-todo"
              type="button"
              onClick={() => {
                const form = document.querySelector('.panel-left form');
                if (form) {
                  const evt = new Event('submit', { bubbles: true, cancelable: true });
                  form.dispatchEvent(evt);
                }
              }}
              aria-label="Add todo"
            >
              Add
            </button>
          </div>
        </section>

        <section className={`panel panel-right ${editingId ? 'is-editing' : ''}`}>
          <div className="panel-header">
            <h2>View Todos</h2>
          </div>

          <div className="panel-body">
            {sortedTodos.length === 0 ? (
              <p className="empty-message">
                Welcome to Very Simple Todo App! Get started now by adding a new todo on the left.
              </p>
            ) : (
              <TodoList
                todos={sortedTodos}
                updateTodo={updateTodo}
                deleteTodo={deleteTodo}
                toggleComplete={toggleComplete}
                editingId={editingId}
                setEditingId={setEditingId}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
