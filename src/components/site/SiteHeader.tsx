
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Set initial state to true
  const navigate = useNavigate();

  // Initialize dark mode state on component mount
  useEffect(() => {
    // Sync state with document class (in case it was set elsewhere)
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const handleNavigation = (id: string) => {
    if (id.startsWith('#')) {
      // Handle anchor navigation
      const element = document.getElementById(id.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    }
  };

  const toggleDarkMode = () => {
    // Toggle dark mode state
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    // Apply dark mode to the document element
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center">
          <Link to="/site/home" className="flex items-center space-x-2">
            <img 
              src="https://maelrohlhrhihntydydh.supabase.co/storage/v1/object/public/images//smartvoz_chip_favicon.png" 
              alt="Smartvoz Logo" 
              className="w-8 h-8" 
            />
            <span className="text-xl font-bold text-purple-800 dark:text-purple-400">Smartvoz</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/site/home" className="text-sm font-medium text-gray-700 hover:text-purple-800 dark:text-gray-300 dark:hover:text-purple-400">
            Início
          </Link>
          <button
            onClick={() => handleNavigation('#features')}
            className="text-sm font-medium text-gray-700 hover:text-purple-800 dark:text-gray-300 dark:hover:text-purple-400 bg-transparent border-none cursor-pointer"
          >
            Recursos
          </button>
          <button
            onClick={() => handleNavigation('#plans')}
            className="text-sm font-medium text-gray-700 hover:text-purple-800 dark:text-gray-300 dark:hover:text-purple-400 bg-transparent border-none cursor-pointer"
          >
            Planos
          </button>
          <button
            onClick={() => handleNavigation('#testimonials')}
            className="text-sm font-medium text-gray-700 hover:text-purple-800 dark:text-gray-300 dark:hover:text-purple-400 bg-transparent border-none cursor-pointer"
          >
            Depoimentos
          </button>
          <button
            onClick={() => handleNavigation('#contact')}
            className="text-sm font-medium text-gray-700 hover:text-purple-800 dark:text-gray-300 dark:hover:text-purple-400 bg-transparent border-none cursor-pointer"
          >
            Contato
          </button>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/home">
            <Button variant="outline" className="mr-2 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
              Portal do Cliente
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className="p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} className="dark:text-gray-300" /> : <Menu size={24} className="dark:text-gray-300" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/site/home"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-800 dark:text-gray-300 dark:hover:text-purple-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <button
              onClick={() => handleNavigation('#features')}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-800 dark:text-gray-300 dark:hover:text-purple-400 bg-transparent border-none"
            >
              Recursos
            </button>
            <button
              onClick={() => handleNavigation('#plans')}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-800 dark:text-gray-300 dark:hover:text-purple-400 bg-transparent border-none"
            >
              Planos
            </button>
            <button
              onClick={() => handleNavigation('#testimonials')}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-800 dark:text-gray-300 dark:hover:text-purple-400 bg-transparent border-none"
            >
              Depoimentos
            </button>
            <button
              onClick={() => handleNavigation('#contact')}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-800 dark:text-gray-300 dark:hover:text-purple-400 bg-transparent border-none"
            >
              Contato
            </button>
            <Link
              to="/home"
              className="block px-3 py-2 text-base font-medium text-purple-800 dark:text-purple-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Portal do Cliente
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
