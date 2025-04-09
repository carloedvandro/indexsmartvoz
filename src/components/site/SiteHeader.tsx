
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center">
          <Link to="/site" className="flex items-center space-x-2">
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
          <Link to="/site" className="text-sm font-medium text-gray-700 hover:text-purple-800">
            Início
          </Link>
          <a href="#features" className="text-sm font-medium text-gray-700 hover:text-purple-800">
            Recursos
          </a>
          <a href="#plans" className="text-sm font-medium text-gray-700 hover:text-purple-800">
            Planos
          </a>
          <a href="#testimonials" className="text-sm font-medium text-gray-700 hover:text-purple-800">
            Depoimentos
          </a>
          <a href="#contact" className="text-sm font-medium text-gray-700 hover:text-purple-800">
            Contato
          </a>
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
              to="/site"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <a
              href="#features"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Recursos
            </a>
            <a
              href="#plans"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Planos
            </a>
            <a
              href="#testimonials"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Depoimentos
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </a>
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
