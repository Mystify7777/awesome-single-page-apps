import React from 'react';
import { SortAsc, SortDesc, Calendar, Check } from 'lucide-react';
import { TodoFilter, TodoSort } from '../types/todo';

interface TodoFiltersProps {
  filter: TodoFilter;
  setFilter: (filter: TodoFilter) => void;
  sort: TodoSort;
  setSort: (sort: TodoSort) => void;
  counts: {
    total: number;
    active: number;
    completed: number;
  };
}

export function TodoFilters({ filter, setFilter, sort, setSort, counts }: TodoFiltersProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
        <div className="flex space-x-2">
          <FilterButton 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
            count={counts.total}
          >
            All
          </FilterButton>
          <FilterButton 
            active={filter === 'active'} 
            onClick={() => setFilter('active')}
            count={counts.active}
          >
            Active
          </FilterButton>
          <FilterButton 
            active={filter === 'completed'} 
            onClick={() => setFilter('completed')}
            count={counts.completed}
          >
            Completed
          </FilterButton>
        </div>
        
        <div className="flex space-x-2">
          <SortButton 
            active={sort === 'newest'} 
            onClick={() => setSort('newest')}
            icon={<Calendar size={14} />}
          >
            Newest
          </SortButton>
          <SortButton 
            active={sort === 'oldest'} 
            onClick={() => setSort('oldest')}
            icon={<Calendar size={14} />}
          >
            Oldest
          </SortButton>
          <SortButton 
            active={sort === 'alphabetical'} 
            onClick={() => setSort('alphabetical')}
            icon={sort === 'alphabetical' ? <SortAsc size={14} /> : <SortDesc size={14} />}
          >
            A-Z
          </SortButton>
        </div>
      </div>
    </div>
  );
}

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  count: number;
}

function FilterButton({ active, onClick, children, count }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
        active 
          ? 'bg-indigo-100 text-indigo-800' 
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      }`}
    >
      {children}
      <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
        active ? 'bg-indigo-200' : 'bg-slate-200'
      }`}>
        {count}
      </span>
    </button>
  );
}

interface SortButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon: React.ReactNode;
}

function SortButton({ active, onClick, children, icon }: SortButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center transition-colors ${
        active 
          ? 'bg-pink-100 text-pink-800' 
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      }`}
    >
      <span className="mr-1.5">{icon}</span>
      {children}
    </button>
  );
}