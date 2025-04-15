
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ParticlesBackground from '@/components/client/products/ParticlesBackground';

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <section id="home" className="relative pt-24 pb-28 min-h-screen flex items-center overflow-hidden bg-[#020017]">
      {mounted && (
        <div className="absolute inset-0 z-0">
          <ParticlesBackground style="matrix" />
        </div>
      )}
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="network-sphere"
            >
              <img 
                src="/lovable-uploads/9ee1a154-fd44-4a5d-b838-9b1d4ba12e1b.png" 
                alt="Network Sphere" 
                className="max-w-full md:max-w-md mx-auto md:mx-0"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              <span className="text-white">Seu Parceiro de </span>
              <span className="text-[#ff1d8e]">Confiança</span>
              <span className="text-white"> no Mercado</span>
              <br />
              <span className="text-white">Móvel </span>
              <span className="text-[#ff1d8e]">Com Cobertura Imbatível</span>
            </h1>
            
            <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto md:mx-0">
              Transforme sua empresa em uma operadora digital de telefonia móvel com a Play Tec. 
              Oferecemos uma plataforma completa, da infraestrutura ao atendimento, para impulsionar 
              seu sucesso e garantir o crescimento da sua empresa no mercado de telecomunicações.
            </p>
            
            <div className="flex justify-center md:justify-start">
              <Link to="/client/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#ff1d8e] hover:bg-[#ff1d8e]/90 text-white font-medium py-3 px-8 rounded-full transition-colors"
                >
                  Inscreva-se para Expandir Sua Marca
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute right-0 bottom-0 z-0 w-1/2 h-1/2 pointer-events-none"
      >
        <img 
          src="/lovable-uploads/9ee1a154-fd44-4a5d-b838-9b1d4ba12e1b.png" 
          alt="Network Decoration" 
          className="w-full h-full object-contain object-right-bottom opacity-50"
        />
      </motion.div>
    </section>
  );
}
