import { useState, useEffect } from 'react';
import { Todo, TodoFilter, TodoSort } from '../types/todo';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  const [filter, setFilter] = useState<TodoFilter>('all');
  const [sort, setSort] = useState<TodoSort>('newest');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    if (text.trim() === '') return;
    
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now()
    };
    
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sort === 'newest') return b.createdAt - a.createdAt;
    if (sort === 'oldest') return a.createdAt - b.createdAt;
    if (sort === 'alphabetical') return a.text.localeCompare(b.text);
    return 0;
  });

  return {
    todos: sortedTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    filter,
    setFilter,
    sort,
    setSort,
    todoCount: todos.length,
    activeCount: todos.filter(todo => !todo.completed).length,
    completedCount: todos.filter(todo => todo.completed).length,
  };
}