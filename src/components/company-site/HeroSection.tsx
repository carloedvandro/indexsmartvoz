
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center overflow-hidden bg-[#030225]"
      style={{
        backgroundImage: "url('/lovable-uploads/a7775e16-601e-4ca9-82ce-5caa986933a8.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-5xl mx-auto pt-20 pb-20"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-white leading-tight">
            Seu Parceiro de <span className="text-brand-pink">Confiança</span> no Mercado<br/>
            Móvel <span className="text-brand-pink">Com Cobertura Imbatível</span>
          </h1>
          
          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
            Transforme sua empresa em uma operadora digital de telefonia móvel com a Play Tec. Oferecemos uma plataforma completa, da infraestrutura ao atendimento, para impulsionar seu sucesso e garantir o crescimento da sua empresa no mercado de telecomunicações.
          </p>
          
          <Link to="/client/register">
            <Button 
              size="lg" 
              className="bg-brand-pink hover:bg-[#ff1a75] text-white rounded-full px-8 py-6 text-base font-medium"
            >
              Inscreva-se para Expandir Sua Marca
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Add decorative network graphics similar to the image */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 opacity-70 w-1/3 h-1/2 pointer-events-none">
        <img 
          src="/lovable-uploads/f022b81e-7533-4e36-ae24-0a886fa5c775.png" 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="absolute right-0 bottom-0 opacity-70 w-1/3 h-1/2 pointer-events-none">
        <img 
          src="/lovable-uploads/4466d3c0-c9b2-44c7-9f5a-3797eb461412.png" 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>
    </section>
  );
}
