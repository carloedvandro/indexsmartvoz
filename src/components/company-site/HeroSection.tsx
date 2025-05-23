
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section id="home" className="pt-28 pb-20 bg-[#030225] min-h-screen flex items-center relative overflow-hidden">
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-5xl mx-auto"
        >
          <h1 className="text-2xl md:text-4xl font-extrabold mb-6 text-white font-sans tracking-tight">
            Seu Parceiro de <span className="text-[#ff0066]">Confiança</span> no Mercado <br />
            Móvel <span className="text-[#ff0066]">Com Cobertura Imbatível</span>
          </h1>
          
          <p className="text-lg text-gray-300 mb-10 max-w-3xl mx-auto font-sans">
            Transforme sua empresa em uma operadora digital de telefonia móvel com a SmartVoz. Oferecemos uma plataforma completa, da infraestrutura ao atendimento, para impulsionar seu sucesso e garantir o crescimento da sua empresa no mercado de telecomunicações.
          </p>
          
          <Link to="/client/register">
            <Button 
              size="lg" 
              className="bg-[#ff0066] hover:bg-[#d4004f] text-white rounded-full px-8 py-3 text-base font-sans"
            >
              Inscreva-se para Expandir Sua Marca
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
