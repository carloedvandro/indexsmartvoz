
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section id="home" className="pt-32 pb-20 bg-[#050118] min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Imagens de fundo */}
      <div className="absolute left-0 bottom-0 opacity-80 max-w-md">
        <img 
          src="/lovable-uploads/36908592-cb8d-4c15-9e3a-89d70637e3a3.png" 
          alt="Network Grid" 
          className="w-full"
        />
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Seu Parceiro de <span className="text-[#ff0066]">Confiança</span> <br />
            no Mercado Móvel <span className="text-[#ff0066]">Com</span> <br />
            <span className="text-[#ff0066]">Cobertura Imbatível</span>
          </h1>
          
          <p className="text-lg text-gray-300 mb-10 max-w-3xl mx-auto">
            Transforme sua empresa em uma operadora digital de telefonia móvel com a Play Tec.
            Oferecemos uma plataforma completa, da infraestrutura ao atendimento, para impulsionar seu
            sucesso e garantir o crescimento da sua empresa no mercado de telecomunicações.
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
      
      <div className="container mx-auto px-4 mt-20">
        <h2 className="text-4xl font-bold text-center text-[#ff0066]">
          Crie e Transforme sua Operadora com a Parceria PlayTec
        </h2>
      </div>
    </section>
  );
}
