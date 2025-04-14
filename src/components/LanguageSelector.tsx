
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
        <span>{i18n.language === 'pt' ? 'Português' : 'English'}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuItem onClick={() => i18n.changeLanguage('pt')} className="hover:bg-gray-100">
          Português
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => i18n.changeLanguage('en')} className="hover:bg-gray-100">
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
