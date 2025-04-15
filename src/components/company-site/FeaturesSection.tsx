
import { motion } from 'framer-motion';

export function FeaturesSection() {
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
        
        <div className="bg-[#030225] py-16 text-center">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Nossa operação proporciona soluções tecnológicas eficientes, suporte contínuo, e ferramentas de gerenciamento personalizadas para garantir o sucesso e crescimento de cada operadora.
          </h2>
        </div>
      </div>
    </section>
  );
}
