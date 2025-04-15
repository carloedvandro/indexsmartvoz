
import { Link } from 'react-router-dom';

interface HeaderProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export function Header({ activeSection, scrollToSection }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#020721] z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/49635a23-d82d-406f-949c-9a8dc02dc345.png" 
            alt="SmartVoz Logo" 
            className="h-10 w-auto"
          />
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { id: 'home', label: 'Início' },
            { id: 'credentials', label: 'Credenciar Sua Marca' },
            { id: 'about', label: 'Quem Somos' },
            { id: 'contact', label: 'Contato' }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`text-sm font-medium transition-colors ${
                activeSection === section.id 
                  ? 'text-[#ff2c78]' 
                  : 'text-white hover:text-[#ff2c78]'
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
        
        <div className="md:hidden">
          <button className="text-white">Menu</button>
        </div>
      </div>
    </header>
  );
}
