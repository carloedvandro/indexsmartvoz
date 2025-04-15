
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section id="home" className="pt-24 pb-16 relative overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center pt-12 md:pt-20">
        <div className="w-full md:w-1/2 relative">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute -top-16 -left-16 md:-left-32 md:-top-32 w-64 h-64 md:w-[400px] md:h-[400px] opacity-40"
          >
            <img 
              src="/lovable-uploads/8d38c1b9-3595-48f6-8449-c5a3c4225e74.png" 
              alt="Network Sphere" 
              className="w-full h-full object-contain"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 text-center md:text-left z-10"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-white">Seu Parceiro de </span>
            <span className="text-[#ff1d8e]">Confiança</span>
            <span className="text-white"> no Mercado Móvel</span>
            <br />
            <span className="text-[#ff1d8e]">Com Cobertura Imbatível</span>
          </h1>
          
          <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-xl">
            Transforme sua empresa em uma operadora digital de telefonia móvel com a Play Tec. 
            Oferecemos uma plataforma completa, da infraestrutura ao atendimento, para impulsionar 
            seu sucesso e garantir o crescimento da sua empresa no mercado de telecomunicações.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/client/register">
              <button className="bg-[#ff1d8e] hover:bg-[#d4157a] text-white font-medium py-3 px-8 rounded-full transition-colors w-full sm:w-auto">
                Inscreva-se para Expandir Sua Marca
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
