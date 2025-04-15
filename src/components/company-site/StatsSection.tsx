
import { motion } from 'framer-motion';

export function StatsSection() {
  return (
    <section className="py-16 bg-[#0c0c2a] relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="text-5xl sm:text-6xl font-bold text-white mb-2">95+</div>
            <div className="text-[#ff1d8e] text-lg">Operadoras Homologadas</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="text-5xl sm:text-6xl font-bold text-white mb-2">100%</div>
            <div className="text-[#ff1d8e] text-lg">Dos Municípios Atendidos</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="text-5xl sm:text-6xl font-bold text-white mb-2">90 dias</div>
            <div className="text-[#ff1d8e] text-lg">Regulamentação Completa</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
