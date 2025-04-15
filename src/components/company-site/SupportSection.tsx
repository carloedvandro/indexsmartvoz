
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export function SupportSection() {
  return (
    <section id="support" className="py-16 bg-[#0a0a20]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="w-full md:max-w-md relative">
              <div className="absolute top-0 left-0 grid grid-cols-10 gap-1 w-[60%] h-[60%] -ml-8 -mt-8">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-[#ff1d8e] opacity-40"></div>
                ))}
              </div>
              <img 
                src="/lovable-uploads/2f877919-1b1c-42fb-9440-d3cd74e9b0f8.png" 
                alt="Suporte técnico" 
                className="rounded-lg relative z-10 w-full"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#ff1d8e]">
              Suporte Técnico de Confiança
            </h2>
            <p className="text-gray-300 mb-8">
              Nosso objetivo é proporcionar um atendimento eficiente e amigável, garantindo que o usuário tenha a melhor experiência possível com nossos serviços.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                "Consultas sobre Planos",
                "Verificação de Cobertura",
                "Portabilidade Numérica",
                "Troca de Titularidade",
                "Faturas e Pagamentos",
                "Ofertas e Promoções"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="text-[#ff1d8e] h-5 w-5 flex-shrink-0" />
                  <span className="text-white">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">CLIENTES ATENDIDOS POR MÊS</h3>
                <div className="h-3 bg-white bg-opacity-20 rounded-full">
                  <div className="h-3 bg-[#ff1d8e] rounded-full w-[85%]"></div>
                </div>
                <div className="mt-2 text-white">9.000 +</div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">TEMPO DE ESPERA MÉDIO</h3>
                <div className="h-3 bg-white bg-opacity-20 rounded-full">
                  <div className="h-3 bg-[#ff1d8e] rounded-full w-[40%]"></div>
                </div>
                <div className="mt-2 text-white">120 segundos</div>
              </div>
            </div>
            
            <button className="mt-8 bg-[#ff1d8e] hover:bg-[#d4157a] text-white font-medium py-3 px-8 rounded-full transition-colors">
              Inscreva-se para Expandir Sua Marca
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
