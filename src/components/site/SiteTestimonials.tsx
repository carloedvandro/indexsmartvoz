
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Carlos Eduardo',
    role: 'Empresário',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    content:
      'A Smartvoz transformou a comunicação da minha empresa. A qualidade das ligações e a estabilidade da internet são incomparáveis. Recomendo a todos os empresários.',
    stars: 5
  },
  {
    name: 'Mariana Silva',
    role: 'Autônoma',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    content:
      'Como profissional autônoma, preciso estar sempre conectada. A Smartvoz me oferece o melhor custo-benefício do mercado, com um serviço excelente!',
    stars: 5
  },
  {
    name: 'Roberto Almeida',
    role: 'Gerente de TI',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    content:
      'Implementamos a Smartvoz em toda a empresa e os resultados foram imediatos. Redução de custos e aumento na qualidade das comunicações.',
    stars: 4
  }
];

export function SiteTestimonials() {
  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-lg text-gray-700">
            Veja o que nossos clientes têm a dizer sobre a experiência com a Smartvoz.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 p-6 rounded-xl shadow-sm"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.stars ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700">{testimonial.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
