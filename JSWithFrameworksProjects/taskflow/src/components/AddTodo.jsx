import React, { useState } from "react";

const AddTodo = ({ addTodo, showToast }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [priority, setPriority] = useState("none");

    const submit = (e) => {
        e.preventDefault();
        if (!title || !desc) {
            showToast("Please enter both a title and a description!", "warning");
            return;
        }
        addTodo(title, desc, priority);
        setTitle("");
        setDesc("");
        setPriority("none");
    };

    return (
        <div className="container my-4 shadow">
            <h3 className="text-center">Add a Todo</h3>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label htmlFor="title">Todo Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="m-1 border-0 shadow form-control input-theme"
                        id="title"
                        placeholder="Enter title..."
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="desc">Todo Description</label>
                    <input
                        type="text"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className="m-1 border-0 shadow form-control input-theme"
                        id="desc"
                        placeholder="Enter description..."
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="m-1 border-0 shadow form-select bg-theme text-theme"
                        id="priority"
                    >
                        <option value="none" className="flex items-center justify-center gap-2">
                            <i className="bi bi-circle"></i> None
                        </option>
                        <option value="high">
                            <i className="bi bi-circle"></i>High
                        </option>
                        <option value="medium">
                            <i className="bi bi-circle"></i>Medium
                        </option>
                        <option value="low">
                            <i className="bi bi-circle"></i>Low
                        </option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="p-1 m-2 text-white shadow-sm btn btn-sm bg-primary"
                >
                    <i className="bi bi-plus-lg"></i> Add Todo
                </button>
            </form>
        </div>
    );
};

export default AddTodo;
