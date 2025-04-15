
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section id="home" className="pt-32 pb-20 bg-[#020721] min-h-screen relative overflow-hidden">
      {/* Rede de pontos à esquerda */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[350px] h-[350px]">
        <img 
          src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png" 
          alt="Network Mesh" 
          className="w-full opacity-90"
        />
      </div>

      {/* Rede de pontos à direita/inferior */}
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] overflow-hidden">
        <img 
          src="/lovable-uploads/f022b81e-7533-4e36-ae24-0a886fa5c775.png" 
          alt="Network Mesh" 
          className="w-full opacity-90"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
            Seu Parceiro de <span className="text-[#ff2c78]">Confiança</span> no Mercado Móvel <span className="text-[#ff2c78]">Com Cobertura Imbatível</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto">
            Transforme sua empresa em uma operadora digital de telefonia móvel com a Play Tec. Oferecemos uma 
            plataforma completa, da infraestrutura ao atendimento, para impulsionar seu sucesso e garantir o 
            crescimento da sua empresa no mercado de telecomunicações.
          </p>
          
          <div className="flex justify-center mt-8">
            <Button 
              size="lg" 
              className="bg-[#ff2c78] hover:bg-[#ff2c78]/90 text-white px-8 py-6 text-lg rounded-full"
            >
              Inscreva-se para Expandir Sua Marca
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
