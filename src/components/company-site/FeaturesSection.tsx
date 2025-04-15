
import { motion } from 'framer-motion';

export function FeaturesSection() {
  const features = [
    { 
      icon: "/lovable-uploads/d24e144b-7e80-4acb-98eb-533c80ccaaf0.png", 
      title: "A Melhor Cobertura", 
      description: "Sua empresa terá a oportunidade de utilizar as redes da VIVO e TIM, duas das maiores coberturas do país." 
    },
    { 
      icon: "/lovable-uploads/d439d4a0-ec5b-44c9-b5fe-90958c33cc6e.png", 
      title: "Gestão Eficiente", 
      description: "Nossa plataforma white-label é ágil, simples e flexível, oferecendo gestão personalizada para controle de consumo e ativação de planos com eficiência e facilidade." 
    },
    { 
      icon: "/lovable-uploads/fdd19190-e4b5-4919-a0da-84dd634c05f6.png", 
      title: "e-Sim e Chips com Sua Marca", 
      description: "Com o e-SIM, ative os serviços sem chip físico, garantindo conveniência e facilidade para atualizações e trocas de plano. Além disso, tenha chips triplo corte para compatibilidade com qualquer dispositivo, proporcionando uma experiência prática e sem complicações para todos os clientes." 
    },
    { 
      icon: "/lovable-uploads/26f41c88-1d3a-4a5c-92b8-c1941186075b.png", 
      title: "Split de Pagamentos", 
      description: "Nosso sistema de Split de Pagamentos garante que os repasses sejam realizados de forma simples e automática, com alta segurança. Utilizamos tecnologias de ponta para assegurar que cada transação seja precisa e confiável, permitindo que sua empresa receba pagamentos de forma eficiente e sem complicações." 
    },
    { 
      icon: "/lovable-uploads/88f11e31-b1ca-47fa-ae27-c40b95295303.png", 
      title: "App com Sua Marca", 
      description: "Nosso aplicativo White Label oferece uma solução completa e personalizada para sua operadora. Ele é totalmente customizável com a identidade visual da sua marca, permitindo que seus clientes tenham uma experiência de usuário consistente e profissional." 
    },
    { 
      icon: "/lovable-uploads/dd8f09c7-c738-490b-a208-6cffade790d4.png", 
      title: "Suporte Técnico de A a Z", 
      description: "Com a PlayTec, você não precisa se preocupar com o suporte técnico. Nossa equipe dedicada cuida de tudo, desde o atendimento a chamadas até a resolução de problemas, garantindo um serviço contínuo e sem falhas." 
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#ff0066]">
            Crie e Transforme sua Operadora com a Parceria PlayTec
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto mt-6 text-lg">
            Com a PlayTec, sua empresa se torna uma operadora móvel virtual (MVNO) facilmente. Somos autorizados pela Anatel para credenciar outras operadoras e cuidamos de toda a infraestrutura, operação e suporte, enquanto você foca em marketing e vendas.
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
              <div className="mb-4 flex justify-center">
                <img src={feature.icon} alt={feature.title} className="h-16 w-16" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#ff0066] text-center">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
