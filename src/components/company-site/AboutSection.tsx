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
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src="/lovable-uploads/70692291-9fc0-41c7-817c-4f1e2ed36bec.png" 
              alt="Suporte Técnico" 
              className="w-11/12 h-auto rounded-md mx-auto" 
            />
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
              <Button className="bg-[#ff0066] hover:bg-[#d4004f] text-white rounded-full px-6">
                Inscreva-se para Expandir Sua Marca
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
