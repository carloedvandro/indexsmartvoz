
import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Wifi, Users, Shield, Globe, Clock } from 'lucide-react';

const features = [
  {
    icon: <PhoneCall className="w-8 h-8 text-purple-800" />,
    title: 'Telefonia de Qualidade',
    description: 'Ligações cristalinas e estáveis para todos os DDDs do Brasil com tarifas competitivas.'
  },
  {
    icon: <Wifi className="w-8 h-8 text-purple-800" />,
    title: 'Internet de Alta Velocidade',
    description: 'Planos de internet com alta velocidade e estabilidade para suas necessidades.'
  },
  {
    icon: <Users className="w-8 h-8 text-purple-800" />,
    title: 'Plano de Carreira',
    description: 'Torne-se um revendedor autorizado e cresça com a Smartvoz através do nosso plano de carreira.'
  },
  {
    icon: <Shield className="w-8 h-8 text-purple-800" />,
    title: 'Segurança Garantida',
    description: 'Todos os seus dados e comunicações são protegidos pelos mais altos padrões de segurança.'
  },
  {
    icon: <Globe className="w-8 h-8 text-purple-800" />,
    title: 'Cobertura Nacional',
    description: 'Serviços disponíveis em todo o território nacional com a mesma qualidade.'
  },
  {
    icon: <Clock className="w-8 h-8 text-purple-800" />,
    title: 'Suporte 24/7',
    description: 'Equipe de suporte disponível 24 horas por dia, 7 dias por semana para resolver qualquer problema.'
  }
];

export function SiteFeatures() {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recursos Exclusivos da Smartvoz
          </h2>
          <p className="text-lg text-gray-700">
            Conheça os principais recursos que fazem da Smartvoz a melhor escolha para suas necessidades de comunicação.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col items-start">
                <div className="mb-4 p-3 bg-purple-100 rounded-lg">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
