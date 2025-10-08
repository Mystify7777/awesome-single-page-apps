import React, { useState } from 'react';
import { Check, Trash2, AlertCircle } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  
  const handleDelete = () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      // Auto-reset after 3 seconds
      setTimeout(() => setDeleteConfirm(false), 3000);
      return;
    }
    
    onDelete(todo.id);
  };

  return (
    <li 
      className={`group flex items-center p-3 border rounded-lg mb-2 transition-all duration-200 ${
        todo.completed 
          ? 'bg-slate-50 border-slate-200' 
          : 'bg-white border-slate-200 hover:border-indigo-200'
      }`}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border mr-3 flex items-center justify-center transition-colors ${
          todo.completed 
            ? 'bg-indigo-500 border-indigo-600 text-white' 
            : 'border-slate-300 hover:border-indigo-400'
        }`}
        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {todo.completed && <Check size={14} />}
      </button>
      
      <span 
        className={`flex-grow font-medium ${
          todo.completed ? 'text-slate-500 line-through' : 'text-slate-700'
        }`}
      >
        {todo.text}
      </span>
      
      <button
        onClick={handleDelete}
        className={`ml-2 p-1.5 rounded-full transition-colors ${
          deleteConfirm
            ? 'bg-red-100 text-red-500'
            : 'text-slate-400 opacity-0 group-hover:opacity-100 hover:bg-slate-100 hover:text-slate-600'
        }`}
        aria-label={deleteConfirm ? "Confirm delete" : "Delete"}
      >
        {deleteConfirm ? <AlertCircle size={18} /> : <Trash2 size={18} />}
      </button>
    </li>
  );
}