import { useState } from 'react';

function TodoForm({ addTodo }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('1');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(text, priority);
    setText('');
    setPriority('1');
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Add new todo form">
      <div className="form-group">
        <label htmlFor="create-todo-text" className="form-label">I want to ...</label>
        <textarea
          data-testid="create-todo-text"
          id="create-todo-text"
          aria-label="New todo description"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
        />
      </div>

      <div className="form-group">
        <label htmlFor="create-todo-priority" className="form-label">How much of a priority is this?</label>
        <select
          data-testid="create-todo-priority"
          id="create-todo-priority"
          aria-label="New todo priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="1">High Priority</option>
          <option value="2">Medium Priority</option>
          <option value="3">Low Priority</option>
        </select>
      </div>
    </form>
  );
}

export default TodoForm;
