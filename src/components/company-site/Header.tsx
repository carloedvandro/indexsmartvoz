
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export function Header({ activeSection, scrollToSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#0a0a20] z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/cd6b2756-5544-4c48-9377-81de9a245cfc.png" 
              alt="PlayTec Logo" 
              className="h-10"
            />
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { id: 'home', label: 'Início' },
            { id: 'features', label: 'Credenciar Sua Marca' },
            { id: 'about', label: 'Quem Somos' },
            { id: 'contact', label: 'Contato' }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`text-sm font-medium transition-colors ${
                activeSection === section.id 
                  ? 'text-[#ff1d8e]' 
                  : 'text-white hover:text-[#ff1d8e]'
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
        
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a20] py-2">
          <div className="container mx-auto px-4">
            {[
              { id: 'home', label: 'Início' },
              { id: 'features', label: 'Credenciar Sua Marca' },
              { id: 'about', label: 'Quem Somos' },
              { id: 'contact', label: 'Contato' }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  scrollToSection(section.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-2 text-sm font-medium ${
                  activeSection === section.id 
                    ? 'text-[#ff1d8e]' 
                    : 'text-white'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
