
import { Link } from 'react-router-dom';

interface HeaderProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export function Header({ activeSection, scrollToSection }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            PlayTec
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { id: 'home', label: 'Início' },
            { id: 'features', label: 'Recursos' },
            { id: 'products', label: 'Produtos' },
            { id: 'about', label: 'Sobre' },
            { id: 'contact', label: 'Contato' }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`text-sm font-medium transition-colors ${
                activeSection === section.id 
                  ? 'text-blue-600' 
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link 
            to="/client/login" 
            className="hidden md:inline-flex px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
          >
            Login
          </Link>
          <Link 
            to="/client/register" 
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Cadastre-se
          </Link>
          
          <div className="md:hidden">
            <button className="text-gray-700">Menu</button>
          </div>
        </div>
      </div>
    </header>
  );
}
