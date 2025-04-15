
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function ProductsSection() {
  const products = [
    {
      title: "PlayTec Pass",
      description: "Assinatura com acesso a mais de 100 jogos de alta qualidade, incluindo novos lançamentos.",
      image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1974&auto=format&fit=crop",
      link: "/client/products"
    },
    {
      title: "PlayTec Ultimate",
      description: "Nossa assinatura premium com jogos exclusivos, conteúdo antecipado e benefícios especiais.",
      image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2071&auto=format&fit=crop",
      link: "/client/products"
    },
    {
      title: "PlayTec Kids",
      description: "Plataforma segura com jogos educativos e divertidos para crianças de todas as idades.",
      image: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1470&auto=format&fit=crop",
      link: "/client/products"
    },
    {
      title: "PlayTec Store",
      description: "Loja completa de jogos, consoles, acessórios e produtos relacionados ao universo gamer.",
      image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=1627&auto=format&fit=crop",
      link: "/client/store"
    }
  ];

  return (
    <section id="products" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4 text-gray-800"
          >
            Nossos Produtos
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Conheça nossas soluções para transformar sua experiência de jogo e entretenimento.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-sm relative overflow-hidden group"
            >
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-4">{product.title}</h3>
                <p className="text-gray-600 mb-6">{product.description}</p>
                <Link 
                  to={product.link} 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Saiba mais 
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
