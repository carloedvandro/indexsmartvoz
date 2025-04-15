
import { Link } from 'react-router-dom';

interface HeaderProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export function Header({ activeSection, scrollToSection }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#030225] z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img 
              src="/lovable-uploads/ced30205-7362-4aa6-882d-4e55a0f46378.png" 
              alt="SmartVoz Logo" 
              className="h-14 w-auto"
            />
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center justify-center flex-grow space-x-12">
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
                  ? 'text-[#ff0066]' 
                  : 'text-white hover:text-[#ff0066]'
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
