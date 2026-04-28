import { useState, useEffect, useRef } from 'react';

function TodoItem({
  todo,
  updateTodo,
  deleteTodo,
  toggleComplete,
  editingId,
  setEditingId,
}) {
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [localEditing, setLocalEditing] = useState(false);

  const isControlled = typeof setEditingId === 'function';
  const isEditing = isControlled ? editingId === todo.id : localEditing;

  // ref for the textarea so we can focus when entering edit mode
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      setEditText(todo.text);
      setEditPriority(todo.priority);
      // focus the textarea on next tick
      setTimeout(() => textareaRef.current?.focus(), 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);

  // Escape to cancel edit
  useEffect(() => {
    if (!isEditing) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (isControlled) setEditingId(null);
        else setLocalEditing(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isEditing, isControlled, setEditingId]);

  const priorityClass =
    todo.priority === '1'
      ? 'priority-high'
      : todo.priority === '2'
        ? 'priority-medium'
        : 'priority-low';

  const handleSave = () => {
    updateTodo(todo.id, { text: editText.trim(), priority: editPriority });
    if (isControlled) setEditingId(null);
    else setLocalEditing(false);
  };

  const enterEdit = () => {
    if (isControlled) setEditingId(todo.id);
    else setLocalEditing(true);
  };

  const cancelEdit = () => {
    if (isControlled) setEditingId(null);
    else setLocalEditing(false);
  };

  return (
    <div className={`todo-item ${priorityClass}`} data-testid="todo-item">
      {isEditing ? (
        <div className="todo-edit-form" role="region" aria-label={`Edit todo ${todo.text}`}>
          <div className="todo-edit-row">
            <div className="todo-edit-col todo-edit-desc">
              <label htmlFor={`update-text-${todo.id}`}>Description</label>
              <textarea
                id={`update-text-${todo.id}`}
                ref={textareaRef}
                data-testid="update-todo-text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                rows={3}
                aria-label="Edit todo description"
              />
            </div>

            <div className="todo-edit-col todo-edit-priority">
              <label htmlFor={`update-priority-${todo.id}`}>Priority</label>
              <select
                id={`update-priority-${todo.id}`}
                data-testid="update-todo-priority"
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
                aria-label="Edit todo priority"
              >
                <option value="1">High Priority</option>
                <option value="2">Medium Priority</option>
                <option value="3">Low Priority</option>
              </select>
            </div>
          </div>

          <div className="edit-actions">
            <button data-testid="update-todo" onClick={handleSave} aria-label="Save todo">
              Save
            </button>
            <button type="button" className="cancel-btn" onClick={cancelEdit} aria-label="Cancel edit">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="todo-main">
            <input
              type="checkbox"
              checked={!!todo.completed}
              onChange={() => toggleComplete(todo.id)}
              aria-label={`Mark ${todo.text} as ${todo.completed ? 'incomplete' : 'complete'}`}
            />
            <p className={`todo-text ${todo.completed ? 'completed' : ''}`}>{todo.text}</p>
          </div>

          <div className="todo-actions">
            <button
              type="button"
              data-testid="edit-todo"
              onClick={enterEdit}
              aria-label={`Edit ${todo.text}`}
            >
              Edit
            </button>

            <button
              type="button"
              data-testid="delete-todo"
              onClick={() => deleteTodo(todo.id)}
              aria-label={`Delete ${todo.text}`}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoItem;
