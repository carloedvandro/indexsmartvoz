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
          <img
            src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png"
            alt="Smartvoz Logo"
            className="h-[140px] object-contain mx-auto mix-blend-multiply opacity-90 contrast-125"
          />
        </div>

        <nav className="hidden md:flex items-center justify-center flex-grow space-x-12">
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
              className={`text-sm font-medium transition-colors ${activeSection === section.id
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
