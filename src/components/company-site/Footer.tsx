
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, MessageSquare } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-10 bg-[#0a0a20] text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <span className="text-[#ff1d8e] font-bold text-2xl">
                PLAYTEC
              </span>
            </div>
            <p className="text-gray-400">
              CNPJ: 33.093.462/0001-50
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-10">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white">Conquiste Fronteiras com a Play</h3>
              <p className="text-gray-400 max-w-md">
                De Empresário a Operadora Nacional. Nossa expertise em telecomunicações não apenas 
                garante sua Homologação na Anatel, mas também oferece suporte para posicionar sua marca 
                como líder em um mercado dinâmico.
              </p>
            </div>
          </div>
          
          <div className="mt-6 md:mt-0 flex gap-4">
            <a href="https://api.whatsapp.com/send?phone=5511999999999" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#ff1d8e] transition-colors">
              <MessageSquare size={24} />
            </a>
            <a href="https://www.instagram.com/playtec" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#ff1d8e] transition-colors">
              <Instagram size={24} />
            </a>
            <a href="https://www.linkedin.com/company/playtec" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#ff1d8e] transition-colors">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
          Play Tecnologia - Copyright © {new Date().getFullYear()} | Produzido por We Connect
        </div>
      </div>
    </footer>
  );
}
