
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Monitor, Gamepad2, ShoppingBag } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="home" className="pt-32 pb-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-700">
            Jogos, Diversão e Tecnologia
          </h1>
          <p className="text-xl text-gray-700 mb-10 leading-relaxed">
            A PlayTec oferece uma plataforma completa de jogos, produtos tecnológicos e serviços para transformar sua experiência de entretenimento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/client/register">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white w-full sm:w-auto"
              >
                Começar Agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/client/products">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-blue-300 text-blue-700 hover:bg-blue-50 w-full sm:w-auto"
              >
                Ver Produtos
              </Button>
            </Link>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Monitor className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Jogos Online</h3>
            <p className="text-gray-600">Acesso a uma biblioteca de jogos online com múltiplas opções.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Gamepad2 className="text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Console Gaming</h3>
            <p className="text-gray-600">Os melhores jogos e acessórios para sua experiência em console.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <ShoppingBag className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Loja Virtual</h3>
            <p className="text-gray-600">Compre jogos, consoles e acessórios com entrega rápida e segura.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
