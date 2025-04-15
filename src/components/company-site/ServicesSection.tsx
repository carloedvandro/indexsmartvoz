
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, HeadphonesIcon } from 'lucide-react';

export function ServicesSection() {
  return (
    <section id="services" className="py-16 bg-[#0a0a20]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: <CreditCard className="h-10 w-10 text-[#ff1d8e]" />, 
              title: "Split de Pagamentos", 
              description: "Nosso sistema de Split de Pagamentos garante que os repasses sejam realizados de forma simples e automática, com alta segurança. Utilizamos tecnologias de ponta para assegurar que cada transação seja precisa e confiável, permitindo que sua empresa receba pagamentos de forma eficiente e sem complicações."
            },
            { 
              icon: <Smartphone className="h-10 w-10 text-[#ff1d8e]" />, 
              title: "App com Sua Marca", 
              description: "Nosso aplicativo White Label oferece uma solução completa e personalizada para sua operadora. Ele é totalmente customizável com a identidade visual da sua marca, permitindo que seus clientes tenham uma experiência de usuário consistente e profissional."
            },
            { 
              icon: <HeadphonesIcon className="h-10 w-10 text-[#ff1d8e]" />, 
              title: "Suporte Técnico de A a Z", 
              description: "Com a PlayTec, você não precisa se preocupar com o suporte técnico. Nossa equipe dedicada cuida de tudo, desde o atendimento a chamadas até a resolução de problemas, garantindo um serviço contínuo e sem falhas."
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white bg-opacity-5 p-8 rounded-lg hover:bg-opacity-10 transition-all"
            >
              <div className="mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#ff1d8e]">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-[#0c0c2a] p-8 md:p-12 rounded-lg text-center"
        >
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            Nossa operação proporciona soluções tecnológicas eficientes, suporte contínuo, e ferramentas
            de gerenciamento personalizadas para garantir o sucesso e crescimento de cada operadora.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
