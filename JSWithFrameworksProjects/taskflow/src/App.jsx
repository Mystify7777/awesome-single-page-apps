
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Toast from "./components/Toast";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import About from "./components/About";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState({ type: "date", direction: "desc" });
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const [todos, setTodos] = useState(initTodo);

  const onDelete = (todo) => {
    setTodos(todos.filter((e) => e !== todo));
    showToast("Todo deleted!", "danger");
  };

  const addTodo = (title, desc, priority = "none") => {
    if (!title || !desc) {
      showToast("Title or Description can't be empty!", "warning");
      return;
    }
    let sno = todos.length === 0 ? 0 : todos[todos.length - 1].sno + 1;
    const myTodo = { sno, title, desc, priority, completed: false };
    setTodos([...todos, myTodo]);
    showToast("Todo added successfully!", "success");
  };

  const onToggleComplete = (sno) => {
    const updatedTodos = todos.map((todo) =>
      todo.sno === sno ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    showToast("Todo updated!", "info");
  };

  const onEdit = (sno, newTitle, newDesc) => {
    const updatedTodos = todos.map((todo) =>
      todo.sno === sno ? { ...todo, title: newTitle, desc: newDesc } : todo
    );
    setTodos(updatedTodos);
    showToast("Todo edited!", "success");
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = searchQuery
    ? todos.filter(
      (todo) =>
        todo.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.desc?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : todos;

  return (

    <Router>
      <Header
        title="TaskFlow"
        searchBar={true}
        todos={todos}
        theme={theme}
        setTheme={setTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <AddTodo addTodo={addTodo} showToast={showToast} />
              <Todos
                todos={filteredTodos}
                onDelete={onDelete}
                sort={sort}
                setSort={setSort}
                filter={filter}
                setFilter={setFilter}
                onToggleComplete={onToggleComplete}
                onEdit={onEdit}
              />
            </>
          }
        ></Route>
        <Route path="/about" element={<About />} />
      </Routes>

      <Toast message={toast?.message} type={toast?.type} />
      <Footer />
    </Router>
  );
}

export default App;