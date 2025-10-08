import React from 'react';
import { TodoList } from './components/TodoList';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 flex flex-col">
      <main className="flex-grow p-4 sm:p-6 md:p-8 flex items-start justify-center pt-10">
        <TodoList />
      </main>
      
      <footer className="py-4 text-center text-slate-500 text-sm">
        <p>TaskMaster &copy; {new Date().getFullYear()} - Your tasks, beautifully organized</p>
      </footer>
    </div>
  );
}

export default App;