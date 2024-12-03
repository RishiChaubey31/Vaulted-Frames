import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Sun, Moon } from 'lucide-react';

const Navbar = ({ mode, toggleTheme }) => {
  const gradientClass = mode === 'light' 
    ? 'bg-gradient-to-r from-purple-900 via-purple-500 to-purple-900' 
    : 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 ';

  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-500 sticky top-0 bg-white dark:bg-gray-900 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center py-3 sm:py-4 gap-3 sm:gap-0">
          {/* Brand Section */}
          <div className="text-center sm:text-left">
            <Link 
              to="/" 
              className="block text-transparent hover:opacity-90 transition-opacity"
            >
              <h1 className={`${gradientClass} font-bold uppercase tracking-wide 
                text-xl sm:text-2xl md:text-3xl lg:text-4xl 
                bg-clip-text text-transparent`}
              >
                Vaulted Frames
              </h1>
            </Link>
            <p className={`${gradientClass} italic bg-clip-text text-transparent
              text-xs sm:text-sm md:text-base 
              mt-1 sm:mt-2`}
            >
              Elevate your memories with timeless designs
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link 
              to="/create" 
              className="inline-flex items-center justify-center p-2 rounded-full
                hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Camera className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7
                ${mode === 'light' ? 'text-purple-600 hover:text-purple-700' : 
                'text-yellow-400 hover:text-yellow-500'}`} 
              />
            </Link>
            <button 
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full 
                transition-colors"
              aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
            >
              {mode === 'light' ? (
                <Sun className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 hover:text-purple-700" />
              ) : (
                <Moon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 hover:text-yellow-500" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;