import React from "react";
import TodoItem from "./TodoItem";

export default function Todos({
  todos,
  onDelete,
  onToggleComplete,
  onEdit,
  sort,
  setSort,
  filter,
  setFilter,
}) {
  const sortedTodos = [...todos];

  sortedTodos.sort((a, b) => {
    if (sort.type === "name") {
      return sort.direction === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else if (sort.type === "sno") {
      return sort.direction === "asc" ? a.sno - b.sno : b.sno - a.sno;
    } else if (sort.type === "priority") {
      const priorityOrder = { none: 0, low: 1, medium: 2, high: 3 };
      const aPriority = priorityOrder[a.priority] ?? 0;
      const bPriority = priorityOrder[b.priority] ?? 0;
      return sort.direction === "asc"
        ? aPriority - bPriority
        : bPriority - aPriority;
    }
    return 0;
  });

  const filteredTodos = sortedTodos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  return (
    <div className="container-fluid my-4 px-3">
      <div className="card rounded-5 p-3 shadow border-0">
        <div className="row g-3 flex-wrap align-items-center justify-content-between mb-3">
          <div className="col-md-auto col-12 d-flex flex-wrap align-items-center gap-2">
            <div className="btn-group gap-2">
              <button
                className={`btn btn-sm btn-${
                  filter === "all" ? "primary" : "outline-primary"
                } rounded-5`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={`btn btn-sm btn-${
                  filter === "completed" ? "success" : "outline-success"
                } rounded-5`}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
              <button
                className={`btn btn-sm btn-${
                  filter === "active" ? "warning" : "outline-warning"
                } rounded-5`}
                onClick={() => setFilter("active")}
              >
                Active
              </button>
            </div>
          </div>

          <div className="col-md-auto col-12 d-flex flex-wrap align-items-center gap-2">
            <span className="fw-bold">Sort:</span>
            <button
              className={`btn btn-sm ${
                sort.type === "sno" && sort.direction === "asc"
                  ? "text-primary"
                  : "text-theme"
              } rounded-5`}
              onClick={() => setSort({ type: "sno", direction: "asc" })}
            >
              S.No ↑
            </button>
            <button
              className={`btn btn-sm ${
                sort.type === "sno" && sort.direction === "desc"
                  ? "text-primary"
                  : "text-theme"
              } rounded-5`}
              onClick={() => setSort({ type: "sno", direction: "desc" })}
            >
              S.No ↓
            </button>
            <button
              className={`btn btn-sm ${
                sort.type === "name" && sort.direction === "asc"
                  ? "text-primary"
                  : "text-theme"
              } rounded-5`}
              onClick={() => setSort({ type: "name", direction: "asc" })}
            >
              Name ↑
            </button>
            <button
              className={`btn btn-sm ${
                sort.type === "name" && sort.direction === "desc"
                  ? "text-primary"
                  : "text-theme"
              } rounded-5`}
              onClick={() => setSort({ type: "name", direction: "desc" })}
            >
              Name ↓
            </button>
            <button
              className={`btn btn-sm btn-${
                sort.type === "priority" ? "success" : "outline-primary"
              } rounded-5`}
              onClick={() =>
                setSort({
                  type: "priority",
                  direction: sort.direction === "asc" ? "desc" : "asc",
                })
              }
            >
              Priority ({sort.direction})
            </button>
          </div>
        </div>

        <div className="card bg-theme p-4 rounded-5 shadow border-0">
          <h3 className="text-center text-uppercase font-monospace fs-2 fw-bold text-theme">
            Todos List
          </h3>
          <div className="bg-primary w-75 mx-auto my-3 rounded-pill" style={{ height: "6px" }}></div>

          <div className="card-body">
            {filteredTodos.length === 0 ? (
              <p className="text-center text-muted">No Todos to display</p>
            ) : (
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.sno ?? `${todo.title}-${todo.desc}`}
                  todo={todo}
                  onDelete={onDelete}
                  onToggleComplete={onToggleComplete}
                  onEdit={onEdit}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}