
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export function AboutSection() {
  const supportItems = [
    "Consultas sobre Planos",
    "Troca de Titularidade",
    "Verificação de Cobertura",
    "Faturas e Pagamentos",
    "Portabilidade Numérica",
    "Ofertas e Promoções"
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="bg-[#030225] py-16 text-center mb-16">
          <h2 className="text-2xl font-bold mb-16 text-white px-4">
            Nossa operação proporciona soluções tecnológicas eficientes, suporte contínuo, e ferramentas de gerenciamento personalizadas para garantir o sucesso e crescimento de cada operadora.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-white">95+</div>
              <div className="text-sm text-[#ff0066] uppercase mt-2">Operadoras Homologadas</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white">100%</div>
              <div className="text-sm text-[#ff0066] uppercase mt-2">Dos Municípios Atendidos</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white">90 dias</div>
              <div className="text-sm text-[#ff0066] uppercase mt-2">Regulamentação Completa</div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-5 -left-5 grid grid-cols-10 gap-2">
              {Array(100).fill(null).map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-[#ff0066]"></div>
              ))}
            </div>
            <img 
              src="/lovable-uploads/bd865fe1-2a3e-4444-ab97-5d01b27fbab0.png" 
              alt="Suporte Técnico" 
              className="w-full h-auto rounded-md"
            />
            <div className="absolute -bottom-5 -right-5 grid grid-cols-10 gap-2">
              {Array(100).fill(null).map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-[#ff0066]"></div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-[#ff0066]">Suporte Técnico de Confiança</h2>
            <p className="text-gray-700 mb-6">
              Nosso objetivo é proporcionar um atendimento eficiente e amigável, garantindo que o usuário tenha a melhor experiência possível com nossos serviços.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {supportItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-[#ff0066]" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="mb-6">
              <div className="text-gray-700 font-semibold mb-1">CLIENTES ATENDIDOS POR MÊS</div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-[#ff0066] h-2 rounded-full w-4/5"></div>
              </div>
              <div className="text-sm text-gray-600 mt-1">9.000+</div>
            </div>
            
            <div className="mb-8">
              <div className="text-gray-700 font-semibold mb-1">TEMPO DE ESPERA MÉDIO</div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-[#ff0066] h-2 rounded-full w-2/5"></div>
              </div>
              <div className="text-sm text-gray-600 mt-1">120 segundos</div>
            </div>
            
            <Link to="/client/register">
              <Button className="bg-[#ff0066] hover:bg-[#e5005c] text-white rounded-full px-6">
                Inscreva-se para Expandir Sua Marca
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
