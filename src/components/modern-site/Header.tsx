
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export function Header({ activeSection, scrollToSection }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/">
          <Button variant="ghost" className="flex items-center gap-2">
            <ChevronLeft size={20} />
            Voltar
          </Button>
        </Link>
        
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            SmartVoz
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { id: 'home', label: 'Início' },
            { id: 'features', label: 'Recursos' },
            { id: 'services', label: 'Serviços' },
            { id: 'about', label: 'Sobre' },
            { id: 'contact', label: 'Contato' }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`text-sm font-medium transition-colors ${
                activeSection === section.id 
                  ? 'text-purple-600' 
                  : 'text-gray-600 hover:text-purple-500'
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
        
        <div className="md:hidden">
          <Button variant="ghost" size="sm" className="text-gray-700">
            Menu
          </Button>
        </div>
      </div>
    </header>
  );
}

