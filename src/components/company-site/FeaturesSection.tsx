
import { motion } from 'framer-motion';
import { Wifi, Smartphone, Cpu, CreditCard, MessageSquare, Phone } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    { 
      icon: <Wifi className="h-12 w-12 text-[#ff0066]" />, 
      title: "A Melhor Cobertura", 
      description: "Sua empresa terá a oportunidade de utilizar as melhores redes de telefonia, com as maiores coberturas do país." 
    },
    { 
      icon: <Cpu className="h-12 w-12 text-[#ff0066]" />, 
      title: "Gestão Eficiente", 
      description: "Nossa plataforma white-label é ágil, simples e flexível, oferecendo gestão personalizada para controle de consumo e ativação de planos com eficiência." 
    },
    { 
      icon: <Smartphone className="h-12 w-12 text-[#ff0066]" />, 
      title: "e-Sim e Chips com Sua Marca", 
      description: "Com o e-SIM, ative os serviços sem chip físico, garantindo conveniência e facilidade para atualizações e trocas de plano." 
    },
    { 
      icon: <CreditCard className="h-12 w-12 text-[#ff0066]" />, 
      title: "Split de Pagamentos", 
      description: "Nosso sistema de Split de Pagamentos garante que os repasses sejam realizados de forma simples e automática, com alta segurança." 
    },
    { 
      icon: <Smartphone className="h-12 w-12 text-[#ff0066]" />, 
      title: "App com Sua Marca", 
      description: "Nosso aplicativo White Label oferece uma solução completa e personalizada para sua operadora. Ele é totalmente customizável com a identidade visual da sua marca." 
    },
    { 
      icon: <MessageSquare className="h-12 w-12 text-[#ff0066]" />, 
      title: "Suporte Técnico de A a Z", 
      description: "Com a SmartVoz, você não precisa se preocupar com o suporte técnico. Nossa equipe dedicada cuida de tudo, do atendimento à resolução de problemas." 
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-[#ff0066]">
            Crie e Transforme sua Operadora com a Parceria SmartVoz
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg">
            Com a SmartVoz, sua empresa se torna uma operadora móvel virtual (MVNO) facilmente. Somos autorizados pela Anatel para credenciar outras operadoras e cuidamos de toda a infraestrutura, operação e suporte, enquanto você foca em marketing e vendas.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-lg p-8 hover:shadow-md transition-shadow"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#ff0066]">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
