
import { motion } from 'framer-motion';

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 bg-[#0c0c2a]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Depoimentos de Parceiros
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Nosso compromisso é construir relações sólidas e de confiança com nossos parceiros. 
            Trabalhamos juntos para alcançar resultados excepcionais e proporcionar experiências únicas. 
            Veja o que um de nossos parceiros tem a dizer sobre a colaboração conosco e como nossas 
            soluções têm impactado positivamente seus negócios.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative"
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1">
            <img 
              src="/lovable-uploads/a38f54aa-dd0c-4108-b773-5a40f3abb073.png" 
              alt="Icon Next" 
              className="w-16 h-16 rounded-full"
            />
          </div>
          
          <div className="bg-[#0a0a20] border border-[#ff1d8e] rounded-xl p-8 md:p-12 pt-16 text-center relative">
            <div className="text-5xl text-[#ff1d8e] opacity-30 absolute top-8 left-8">"</div>
            <p className="text-white text-lg mb-8">
              A Play oferece à ICON NEXT não só uma parceria e sim um compromisso de alavancar o nosso 
              negócio. Com um sistema dinâmico e simples temos facilidade de gerir e ainda contamos com 
              um canal direto para sugestões de melhoria. Somos gratos por todo empenho e pela cordialidade 
              em tratar as demandas de com o máximo de agilidade e eficiência.
            </p>
            <div>
              <h4 className="text-xl font-bold text-white">ICON NEXT</h4>
              <p className="text-gray-400">Gerente – Camila</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
