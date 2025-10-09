import React from 'react';
import { useTodos } from '../hooks/useTodos';
import { TodoItem } from './TodoItem';
import { TodoForm } from './TodoForm';
import { TodoFilters } from './TodoFilters';
import { TodoEmptyState } from './TodoEmptyState';

export function TodoList() {
  const { 
    todos, 
    addTodo, 
    toggleTodo, 
    deleteTodo, 
    filter, 
    setFilter, 
    sort, 
    setSort, 
    todoCount, 
    activeCount, 
    completedCount 
  } = useTodos();

  return (
    <div className="w-full max-w-xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-indigo-600 mb-2">TaskMaster</h1>
        <p className="text-slate-500">Organize your tasks with style</p>
      </header>
      
      <TodoForm onAddTodo={addTodo} />
      
      <TodoFilters 
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
        counts={{
          total: todoCount,
          active: activeCount,
          completed: completedCount
        }}
      />
      
      {todos.length > 0 ? (
        <ul className="todo-list">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      ) : (
        <TodoEmptyState filter={filter} />
      )}
    </div>
  );
}