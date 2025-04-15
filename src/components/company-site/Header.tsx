
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
              className="h-12 w-auto"
            />
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/client/login" className="text-white hover:text-[#ff0066] transition-colors">
            Login
          </Link>
          <Link to="/client/register" className="bg-[#ff0066] hover:bg-[#d4004f] text-white px-6 py-2 rounded-full transition-colors">
            Cadastre-se
          </Link>
        </div>
      </div>
    </header>
  );
}
