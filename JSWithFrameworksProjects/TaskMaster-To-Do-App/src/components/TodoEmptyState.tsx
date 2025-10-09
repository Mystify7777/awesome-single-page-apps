import React from 'react';
import { CheckCircle2, ListTodo } from 'lucide-react';
import { TodoFilter } from '../types/todo';

interface TodoEmptyStateProps {
  filter: TodoFilter;
}

export function TodoEmptyState({ filter }: TodoEmptyStateProps) {
  const getEmptyMessage = () => {
    switch (filter) {
      case 'all':
        return {
          icon: <ListTodo size={40} className="text-slate-300" />,
          title: 'No tasks yet',
          message: 'Add your first task to get started!'
        };
      case 'active':
        return {
          icon: <CheckCircle2 size={40} className="text-green-300" />,
          title: 'All tasks complete!',
          message: 'Nicely done. Add more tasks or take a break.'
        };
      case 'completed':
        return {
          icon: <CheckCircle2 size={40} className="text-slate-300" />,
          title: 'No completed tasks',
          message: 'Complete some tasks to see them here.'
        };
      default:
        return {
          icon: <ListTodo size={40} className="text-slate-300" />,
          title: 'No tasks found',
          message: 'Try a different filter or add new tasks.'
        };
    }
  };

  const { icon, title, message } = getEmptyMessage();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-slate-200 rounded-lg bg-slate-50">
      <div className="mb-3">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-slate-700 mb-1">{title}</h3>
      <p className="text-slate-500 text-center">{message}</p>
    </div>
  );
}