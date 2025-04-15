
import { motion } from 'framer-motion';
import { Users, Award, ShoppingBag } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    { 
      icon: <Users className="h-8 w-8 text-purple-500" />, 
      title: "Rede de Negócios", 
      description: "Construa e gerencie sua rede de contatos de forma eficiente e lucrativa." 
    },
    { 
      icon: <Award className="h-8 w-8 text-indigo-500" />, 
      title: "Planos Exclusivos", 
      description: "Produtos e serviços com qualidade premium e preços competitivos." 
    },
    { 
      icon: <ShoppingBag className="h-8 w-8 text-pink-500" />, 
      title: "Loja Virtual", 
      description: "Tenha sua própria loja para comercializar produtos e expandir seus negócios." 
    }
  ];

  return (
    <section id="features" className="py-20 bg-white bg-opacity-80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Por que escolher a SmartVoz?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nossa plataforma foi projetada para oferecer as melhores soluções em networking e oportunidades de negócio.
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
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-purple-50 p-3 rounded-lg w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
