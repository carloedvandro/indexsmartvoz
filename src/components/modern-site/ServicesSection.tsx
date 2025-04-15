
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function ServicesSection() {
  const services = [
    {
      title: "Desenvolvimento Web",
      description: "Sites responsivos e aplicações web modernas com foco em experiência do usuário e performance.",
      link: "#"
    },
    {
      title: "Marketing Digital",
      description: "Estratégias personalizadas para aumentar a visibilidade da sua marca e atrair mais clientes.",
      link: "#"
    },
    {
      title: "Design UX/UI",
      description: "Interfaces intuitivas e atraentes que melhoram a experiência do usuário e aumentam a conversão.",
      link: "#"
    },
    {
      title: "Consultoria em Tecnologia",
      description: "Orientação especializada para ajudar sua empresa a escolher as melhores soluções tecnológicas.",
      link: "#"
    }
  ];

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Nossos Serviços</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Oferecemos uma gama completa de serviços para ajudar sua empresa a prosperar no mundo digital.
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
              <a 
                href={service.link} 
                className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors"
              >
                Saiba mais 
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
