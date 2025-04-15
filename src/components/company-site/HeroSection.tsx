
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section id="home" className="pt-32 pb-20 bg-[#020721] min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight text-center lg:text-left">
              Seu Parceiro de <span className="text-[#ff2c78]">Confiança</span> no Mercado<br/>
              Móvel <span className="text-[#ff2c78]">Com Cobertura Imbatível</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl text-center lg:text-left">
              Transforme sua empresa em uma operadora digital de telefonia móvel com a Play Tec. 
              Oferecemos uma plataforma completa, da infraestrutura ao atendimento, para 
              impulsionar seu sucesso e garantir o crescimento da sua empresa no mercado de 
              telecomunicações.
            </p>
            
            <div className="mt-8 flex justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-[#ff2c78] hover:bg-[#ff2c78]/90 text-white px-8 py-6 text-lg rounded-full"
              >
                Inscreva-se para Expandir Sua Marca
              </Button>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center">
            <img 
              src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png" 
              alt="Rede de Conexões" 
              className="w-full max-w-lg"
            />
          </div>
        </div>
      </div>
      
      {/* Imagem da rede no canto esquerdo */}
      <div className="absolute left-0 top-20 md:top-40 w-80 h-80 opacity-80">
        <img 
          src="/lovable-uploads/f022b81e-7533-4e36-ae24-0a886fa5c775.png" 
          alt="Rede de Conexões" 
          className="w-full h-full"
        />
      </div>
      
      {/* Imagem da rede no canto direito */}
      <div className="absolute right-0 bottom-0 w-96 h-96 opacity-80">
        <img 
          src="/lovable-uploads/4466d3c0-c9b2-44c7-9f5a-3797eb461412.png" 
          alt="Rede de Conexões" 
          className="w-full h-full"
        />
      </div>
    </section>
  );
}
