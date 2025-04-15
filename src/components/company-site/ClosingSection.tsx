
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function ClosingSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 text-[#0a0a20]"
          >
            Seu Salto Tecnológico Para um Futuro Lucrativo
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 max-w-3xl mx-auto mb-8"
          >
            Na Play Tecnologia, entregamos mais do que uma solução. Oferecemos uma plataforma completa, 
            desde a base estrutural até o atendimento ao cliente. Assuma o controle com uma experiência 
            fluida e eficiente que impulsiona o seu sucesso na indústria de telecomunicações. Descubra 
            como nossa abordagem integrada redefine o caminho para o crescimento da sua operadora de telefonia.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link to="/client/register">
              <button className="bg-[#ff1d8e] hover:bg-[#d4157a] text-white font-medium py-3 px-8 rounded-full transition-colors">
                Seja a Próxima Operadora de Sucesso!
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
