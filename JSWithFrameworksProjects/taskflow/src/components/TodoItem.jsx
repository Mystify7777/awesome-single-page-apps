import React, { useState } from "react";

const TodoItem = ({ todo, onDelete, onToggleComplete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDesc, setEditedDesc] = useState(todo.desc);

  if (!todo?.title?.trim() && !todo?.desc?.trim()) return null;

  const getPriorityBadge = (priority) => {
    switch ((priority || "").toLowerCase()) {
      case "high":
        return "danger";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "secondary";
    }
  };

  const handleEdit = () => {
    if (!editedTitle.trim() || !editedDesc.trim()) return;
    onEdit(todo.sno, editedTitle.trim(), editedDesc.trim());
    setIsEditing(false);
  };

  return (
    <div className="card p-4 rounded-4 shadow-lg mb-3 border-0">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center flex-wrap">
          <input
            id="checkbox"
            name="checkbox"
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleComplete(todo.sno)}
            className="form-check-input me-2 rounded-2"
          />

          {isEditing ? (
            <input
              id="text"
              name="text"
              type="text"
              className="form-control form-control-sm m-2 border-0 rounded-5"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          ) : (
            <h4 className="text-theme me-2 mb-0">{todo.title}</h4>
          )}

          {todo.priority && !isEditing && (
            <span
              className={`badge bg-${getPriorityBadge(
                todo.priority
              )} ms-3 me-3`}
            >
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </span>
          )}
        </div>

        <div className="d-flex gap-2">
          {isEditing ? (
            <>
              <button
                className="btn btn-sm btn-success rounded-5 border-0"
                onClick={handleEdit}
              >
                Save
              </button>
              <button
                className="btn btn-sm btn-danger rounded-5 border-0"
                onClick={() => {
                  setEditedTitle(todo.title);
                  setEditedDesc(todo.desc);
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-sm" onClick={() => setIsEditing(true)}>
                <i className="bi bi-pencil text-theme"></i>
              </button>
              <button
                className="btn btn-sm btn-danger border-0 rounded-circle p-1"
                onClick={() => onDelete(todo)}
              >
                <i className="bi bi-trash-fill"></i>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="d-flex align-items-center mx-4 mt-2">
        <i
          className="bi bi-bar-chart-fill small mb-0 text-theme-50"
          style={{ transform: "rotateZ(90deg)" }}
        ></i>
        {isEditing ? (
          <input
            id="text"
            name="text"
            type="text"
            className="form-control form-control-sm ms-2 rounded-5 border-0"
            value={editedDesc}
            onChange={(e) => setEditedDesc(e.target.value)}
          />
        ) : (
          <p className="text-theme-50 small mb-0 me-2 rounded-5 border-0">
            {todo.desc}
          </p>
        )}
      </div>
    </div>
  );
};

export default TodoItem;