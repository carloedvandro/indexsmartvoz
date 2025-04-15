
import { motion } from 'framer-motion';
import { Radio, Monitor, Smartphone, Shield } from 'lucide-react';

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 bg-[#0c0c2a] relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            Crie e Transforme sua Operadora com a Parceria PlayTec
          </motion.h2>
        </div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-lg text-gray-300 text-center max-w-4xl mx-auto mb-16"
        >
          Com a PlayTec, sua empresa se torna uma operadora móvel virtual (MVNO) facilmente. 
          Somos autorizados pela Anatel para credenciar outras operadoras e cuidamos de toda a 
          infraestrutura, operação e suporte, enquanto você foca em marketing e vendas. 
          Oferecemos Banda Larga Móvel 5G, voz e SMS com cobertura nacional, garantindo 
          o sucesso da sua operadora com nossa expertise.
        </motion.p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Radio className="h-10 w-10 text-[#ff1d8e]" />, 
              title: "A Melhor Cobertura", 
              description: "Sua empresa terá a oportunidade de utilizar as redes da VIVO e TIM, duas das maiores coberturas do país." 
            },
            { 
              icon: <Monitor className="h-10 w-10 text-[#ff1d8e]" />, 
              title: "Gestão Eficiente", 
              description: "Nossa plataforma white-label é ágil, simples e flexível, oferecendo gestão personalizada para controle de consumo e ativação de planos com eficiência e facilidade." 
            },
            { 
              icon: <Smartphone className="h-10 w-10 text-[#ff1d8e]" />, 
              title: "e-Sim e Chips com Sua Marca", 
              description: "Com o e-SIM, ative os serviços sem chip físico, garantindo conveniência e facilidade para atualizações e trocas de plano. Além disso, tenha chips triplo corte para compatibilidade com qualquer dispositivo." 
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white bg-opacity-5 p-8 rounded-lg hover:bg-opacity-10 transition-all"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#ff1d8e]">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
