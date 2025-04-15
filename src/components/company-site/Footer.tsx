
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-10 bg-[#030225] text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/lovable-uploads/ced30205-7362-4aa6-882d-4e55a0f46378.png" 
                alt="SmartVoz Logo" 
                className="h-10 w-auto"
              />
              <div className="text-2xl font-bold">
                SMARTVOZ
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              CNPJ: 12.345.678/0001-90
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Conquiste Fronteiras com a SmartVoz: De Empresário a Operadora Nacional. 
            </h3>
            <p className="text-gray-400 mb-4">
              Nossa expertise em telecomunicações não apenas garante sua Homologação na Anatel, mas também oferece suporte para posicionar sua marca como líder em um mercado dinâmico.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#ff0066] transition-colors p-2 bg-[#05052d] rounded-full">
                <MessageCircle size={24} />
              </a>
              <a href="#" className="text-white hover:text-[#ff0066] transition-colors p-2 bg-[#05052d] rounded-full">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-white hover:text-[#ff0066] transition-colors p-2 bg-[#05052d] rounded-full">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
          SmartVoz - Copyright © {new Date().getFullYear()} | Desenvolvido por Lovable
        </div>
      </div>
    </footer>
  );
}
