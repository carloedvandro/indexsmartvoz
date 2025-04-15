
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function ClosingSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#030225]">
            Seu Salto Tecnológico Para um Futuro Lucrativo
          </h2>
          <p className="text-lg text-gray-700 mb-10">
            Na SmartVoz, entregamos mais do que uma solução. Oferecemos uma plataforma completa, desde a base estrutural até o atendimento ao cliente. Assuma o controle com uma experiência fluida e eficiente que impulsiona o seu sucesso na indústria de telecomunicações. Descubra como nossa abordagem integrada redefine o caminho para o crescimento da sua operadora de telefonia.
          </p>
          
          <Link to="/client/register">
            <Button 
              className="bg-[#ff0066] hover:bg-[#d4004f] text-white rounded-full px-8 py-6 text-lg"
            >
              Seja a Próxima Operadora de Sucesso!
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
