
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section id="home" className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600">
            Desperte o Potencial da sua Rede
          </h1>
          <p className="text-xl text-gray-700 mb-10">
            A SmartVoz oferece uma plataforma completa de networking, produtos tecnológicos e oportunidades para transformar seu negócio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/client/register">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              >
                Cadastre-se Agora
              </Button>
            </Link>
            <Link to="/client/login">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                Acessar Plataforma
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
