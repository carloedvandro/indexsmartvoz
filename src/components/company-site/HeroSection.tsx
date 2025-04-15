
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section id="home" className="pt-28 pb-20 bg-[#030225] min-h-screen flex items-center relative overflow-hidden">
      {/* Rede de pontos à esquerda - decorativa */}
      <div className="absolute left-0 top-1/4 -translate-y-1/2">
        <img
          src="/lovable-uploads/979653e9-7956-495c-8934-c2c232085a8c.png"
          alt="Network Globe"
          className="w-[350px] h-auto"
        />
      </div>
      
      {/* Rede de pontos à direita - decorativa */}
      <div className="absolute right-0 bottom-0">
        <img
          src="/lovable-uploads/6b03e1aa-3ebb-4ac3-b299-f2b4fb8f89d0.png"
          alt="Network Mesh"
          className="w-[400px] h-auto opacity-80"
        />
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-5xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Seu Parceiro de <span className="text-[#ff0066]">Confiança</span> no Mercado Móvel <span className="text-[#ff0066]">Com Cobertura Imbatível</span>
          </h1>
          
          <p className="text-lg text-gray-300 mb-10 max-w-3xl mx-auto">
            Transforme sua empresa em uma operadora digital de telefonia móvel com a SmartVoz. Oferecemos uma plataforma completa, da infraestrutura ao atendimento, para impulsionar seu sucesso e garantir o crescimento da sua empresa no mercado de telecomunicações.
          </p>
          
          <Link to="/client/register">
            <Button 
              size="lg" 
              className="bg-[#ff0066] hover:bg-[#d4004f] text-white rounded-full px-8 py-3 text-base"
            >
              Inscreva-se para Expandir Sua Marca
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
