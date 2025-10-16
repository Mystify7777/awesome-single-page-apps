// src/App.js
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import TextForm from './components/TextForm';
import About from './components/About';

function App() {
  const [mode, setMode] = useState('dark'); // Start in dark mode
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type });
    setTimeout(() => setAlert(null), 2000);
  };

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
      // document.title = 'WordLabs - Dark Mode';
    } else {
      document.documentElement.classList.remove('dark');
      // document.title = 'WordLabs - Light Mode';
    }
  }, [mode]);

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    showAlert(`${newMode.charAt(0).toUpperCase() + newMode.slice(1)} mode enabled`, 'success');
  };

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-[#0d1017] text-black dark:text-white transition-colors duration-300 flex flex-col">
        <Navbar
          title="WordLabs"
          aboutText="About"

          mode={mode}
          toggleMode={toggleMode}
        />
        {alert && <Alert alert={alert} />}
        <main className="flex-grow container mx-auto px-4 py-8 max-w-screen-xl">
          <Routes>
            <Route path="/about" element={<About mode={mode} />} />
            <Route path="/" element={<TextForm showAlert={showAlert} heading="Try WordLabs - Professional Text Utilities" mode={mode} />} />
          </Routes>
        </main>
        <footer className="bg-gray-100 dark:bg-[#010409] py-6 text-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700  transition-colors  duration-300">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            {/* Left Section - Copyright */}
            <p className="text-gray-700 dark:text-gray-300">
              © {new Date().getFullYear()} <span className="font-semibold text-gray-900 dark:text-white">WordLabs</span>. All rights reserved.
            </p>

            {/* Right Section - Author Info */}
            <p>
              Author - {" "}
              <a
                href="https://github.com/Yash-Bandal"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors "
              >
                YB-Productions
              </a>
            </p>
          </div>
        </footer>

      </div>
    </Router>
  );
}

export default App;