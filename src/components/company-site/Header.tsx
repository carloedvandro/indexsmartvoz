
import { Link } from 'react-router-dom';

interface HeaderProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export function Header({ activeSection, scrollToSection }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#010120] z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/ffee1b21-56a4-4279-9c06-57f74c7c6a1f.png" 
                alt="Logo" 
                className="h-10 w-auto"
              />
            </div>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-10">
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
