
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section id="home" className="pt-32 pb-20 bg-[#050118] min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Left network graphic */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 opacity-80 max-w-md">
        <img 
          src="/lovable-uploads/b4296a05-cf41-49a8-a40f-4666754b788f.png" 
          alt="Network Grid" 
          className="w-full"
        />
      </div>
      
      {/* Right network graphic */}
      <div className="absolute right-0 bottom-0 opacity-80 max-w-md">
        <img 
          src="/lovable-uploads/b4296a05-cf41-49a8-a40f-4666754b788f.png" 
          alt="Network Grid" 
          className="w-full"
        />
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Seu Parceiro de <span className="text-[#ff0066]">Confiança</span> no Mercado Móvel <span className="text-[#ff0066]">Com Cobertura Imbatível</span>
          </h1>
          
          <p className="text-lg text-gray-300 mb-10">
            Transforme sua empresa em uma operadora digital de telefonia móvel com a Play Tec. Oferecemos uma plataforma completa, da infraestrutura ao atendimento, para impulsionar seu sucesso e garantir o crescimento da sua empresa no mercado de telecomunicações.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-[#ff0066] hover:bg-[#cc0052] text-white rounded-full py-6 px-8"
            >
              Inscreva-se para Expandir Sua Marca
            </Button>
          </div>
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4 mt-40">
        <h2 className="text-4xl font-bold text-center text-[#ff0066]">Crie e Transforme sua Operadora com a Parceria PlayTec</h2>
      </div>
    </section>
  );
}
