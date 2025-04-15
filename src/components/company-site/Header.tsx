
import { Link } from 'react-router-dom';

interface HeaderProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export function Header({ activeSection, scrollToSection }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#050118] z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/e65ccdf5-8066-4d38-b0b6-ce48ff7ea28c.png" 
            alt="PlayTec Logo" 
            className="h-10 w-auto"
          />
        </div>
        
        <nav className="hidden md:flex items-center space-x-12">
          {[
            { id: 'home', label: 'Início', color: 'text-[#ff0066]' },
            { id: 'features', label: 'Credenciar Sua Marca', color: 'text-white' },
            { id: 'about', label: 'Quem Somos', color: 'text-white' },
            { id: 'contact', label: 'Contato', color: 'text-white' }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`text-sm font-medium transition-colors ${
                activeSection === section.id 
                  ? 'text-[#ff0066]' 
                  : section.color + ' hover:text-[#ff0066]'
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
