import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSelector() {
  const { i18n } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <img 
          src={i18n.language === 'pt' ? "/br-flag.svg" : "/us-flag.svg"} 
          alt="Language" 
          className="h-4 w-4" 
        />
        <span>{i18n.language === 'pt' ? 'Português' : 'English'}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => i18n.changeLanguage('pt')}>
          <img src="/br-flag.svg" alt="Português" className="h-4 w-4 mr-2" />
          Português
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => i18n.changeLanguage('en')}>
          <img src="/us-flag.svg" alt="English" className="h-4 w-4 mr-2" />
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}