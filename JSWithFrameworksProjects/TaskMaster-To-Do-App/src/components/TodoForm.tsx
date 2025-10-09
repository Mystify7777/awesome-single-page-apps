import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TodoFormProps {
  onAddTodo: (text: string) => void;
}

export function TodoForm({ onAddTodo }: TodoFormProps) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (text.trim() === '') {
      setError('Task cannot be empty');
      return;
    }
    
    if (text.length > 100) {
      setError('Task is too long (max 100 characters)');
      return;
    }
    
    onAddTodo(text);
    setText('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error) setError('');
            }}
            placeholder="Add a new task..."
            className={`w-full px-4 py-3 pr-12 rounded-lg border ${
              error ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-indigo-500'
            } focus:outline-none focus:ring-2 transition-all`}
            maxLength={100}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
            <span className={`text-xs ${text.length > 80 ? 'text-amber-500' : 'text-slate-400'}`}>
              {text.length}/100
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="ml-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center justify-center"
        >
          <Plus size={20} />
          <span className="ml-1 hidden sm:inline">Add</span>
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </form>
  );
}