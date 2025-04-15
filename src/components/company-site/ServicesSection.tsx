
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function ServicesSection() {
  const services = [
    {
      title: "Planos de Telefonia",
      description: "Planos de telefonia móvel com preços acessíveis e excelente cobertura em todo o território nacional.",
      link: "/client/products"
    },
    {
      title: "eSIM Virtual",
      description: "Tecnologia de ponta com chip virtual para facilitar sua comunicação sem a necessidade de chip físico.",
      link: "/client/esim"
    },
    {
      title: "Rede de Negócios",
      description: "Plataforma completa para gerenciar sua rede de contatos e potencializar suas oportunidades de negócio.",
      link: "/client/network"
    },
    {
      title: "Loja Virtual Personalizada",
      description: "Crie sua loja virtual personalizada e comece a vender produtos diretamente para seus clientes.",
      link: "/client/store"
    }
  ];

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Nossos Serviços</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conheça os principais serviços que a SmartVoz oferece para potencializar seu sucesso.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white to-purple-50 p-8 rounded-xl shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <Link 
                to={service.link} 
                className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors"
              >
                Saiba mais 
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
