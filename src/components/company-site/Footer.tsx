
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-10 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-blue-400">
                PlayTec
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Sua plataforma completa de jogos e entretenimento digital para todas as idades.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Produtos</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-400 hover:text-blue-400 transition-colors">PlayTec Pass</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-blue-400 transition-colors">PlayTec Ultimate</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-blue-400 transition-colors">PlayTec Kids</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-blue-400 transition-colors">PlayTec Store</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-400 hover:text-blue-400 transition-colors">Sobre Nós</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-blue-400 transition-colors">Termos de Uso</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-blue-400 transition-colors">Política de Privacidade</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-blue-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">contato@playtec.com.br</li>
              <li className="text-gray-400">(11) 4002-8922</li>
              <li className="text-gray-400">Av. Paulista, 1000 - São Paulo</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} PlayTec. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
