
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

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

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center">
          <Link to="/site/home" className="flex items-center space-x-2">
            <img 
              src="https://maelrohlhrhihntydydh.supabase.co/storage/v1/object/public/images//smartvoz_chip_favicon.png" 
              alt="Smartvoz Logo" 
              className="w-8 h-8" 
            />
            <span className="text-xl font-bold text-purple-800">Smartvoz</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/site/home" className="text-sm font-medium text-gray-700 hover:text-purple-800">
            Início
          </Link>
          <button
            onClick={() => handleNavigation('#features')}
            className="text-sm font-medium text-gray-700 hover:text-purple-800 bg-transparent border-none cursor-pointer"
          >
            Recursos
          </button>
          <button
            onClick={() => handleNavigation('#plans')}
            className="text-sm font-medium text-gray-700 hover:text-purple-800 bg-transparent border-none cursor-pointer"
          >
            Planos
          </button>
          <button
            onClick={() => handleNavigation('#testimonials')}
            className="text-sm font-medium text-gray-700 hover:text-purple-800 bg-transparent border-none cursor-pointer"
          >
            Depoimentos
          </button>
          <button
            onClick={() => handleNavigation('#contact')}
            className="text-sm font-medium text-gray-700 hover:text-purple-800 bg-transparent border-none cursor-pointer"
          >
            Contato
          </button>
        </nav>

        <div className="hidden md:block">
          <Link to="/">
            <Button variant="outline" className="mr-2">
              Portal do Cliente
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="p-2 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/site/home"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <button
              onClick={() => handleNavigation('#features')}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-800 bg-transparent border-none"
            >
              Recursos
            </button>
            <button
              onClick={() => handleNavigation('#plans')}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-800 bg-transparent border-none"
            >
              Planos
            </button>
            <button
              onClick={() => handleNavigation('#testimonials')}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-800 bg-transparent border-none"
            >
              Depoimentos
            </button>
            <button
              onClick={() => handleNavigation('#contact')}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-800 bg-transparent border-none"
            >
              Contato
            </button>
            <Link
              to="/"
              className="block px-3 py-2 text-base font-medium text-purple-800"
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
