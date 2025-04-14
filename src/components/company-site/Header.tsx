
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/LanguageSelector';

interface HeaderProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export function Header({ activeSection, scrollToSection }: HeaderProps) {
  const { t } = useTranslation();
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="https://maelrohlhrhihntydydh.supabase.co/storage/v1/object/public/images//smartvoz_chip_favicon.png" 
            alt="SmartVoz Logo" 
            className="h-8 w-8"
          />
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            SmartVoz
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { id: 'home', label: t('navigation.home') },
            { id: 'features', label: t('navigation.features') },
            { id: 'services', label: t('navigation.services') },
            { id: 'about', label: t('navigation.about') },
            { id: 'contact', label: t('navigation.contact') }
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
        
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <Link to="/client/login">
            <Button variant="outline" size="sm" className="hidden md:flex">
              Login
            </Button>
          </Link>
          <Link to="/client/register">
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 hidden md:flex">
              Cadastre-se
            </Button>
          </Link>
          <div className="md:hidden">
            <Button variant="ghost" size="sm" className="text-gray-700">
              Menu
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
