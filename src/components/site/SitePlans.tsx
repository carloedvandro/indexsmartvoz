
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Plano Básico',
    price: 'R$ 59,90',
    period: '/mês',
    description: 'Ideal para uso pessoal e pequenos negócios',
    features: [
      'Ligações ilimitadas para mesma operadora',
      '5GB de internet',
      'Whatsapp ilimitado',
      'Suporte básico'
    ],
    highlighted: false
  },
  {
    name: 'Plano Profissional',
    price: 'R$ 89,90',
    period: '/mês',
    description: 'Perfeito para profissionais autônomos',
    features: [
      'Ligações ilimitadas para qualquer operadora',
      '15GB de internet',
      'Redes sociais ilimitadas',
      'Suporte prioritário',
      'Cobertura nacional'
    ],
    highlighted: true
  },
  {
    name: 'Plano Empresarial',
    price: 'R$ 129,90',
    period: '/mês',
    description: 'Solução completa para empresas',
    features: [
      'Ligações ilimitadas para qualquer operadora',
      '30GB de internet',
      'Internet ilimitada para apps de trabalho',
      'Suporte VIP 24/7',
      'Cobertura nacional e internacional',
      'Gestão de múltiplas linhas'
    ],
    highlighted: false
  }
];

export function SitePlans() {
  return (
    <section id="plans" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Planos para Todas as Necessidades
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Escolha o plano que melhor se adapta às suas necessidades e comece a economizar hoje mesmo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden ${
                plan.highlighted ? 'ring-2 ring-purple-600 transform md:-translate-y-4' : ''
              }`}
            >
              {plan.highlighted && (
                <div className="bg-purple-800 dark:bg-purple-700 text-white text-center py-2 font-medium">
                  Mais Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-400">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/">
                  <Button
                    className={`w-full ${
                      plan.highlighted
                        ? 'bg-purple-800 hover:bg-purple-900 dark:bg-purple-700 dark:hover:bg-purple-800'
                        : 'bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600'
                    } text-white`}
                  >
                    Assinar Agora
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
