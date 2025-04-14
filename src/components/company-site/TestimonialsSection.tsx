
import { motion } from 'framer-motion';

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#030225] relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            Depoimentos de Parceiros
          </h2>
          <p className="text-gray-300 mb-12">
            Nosso compromisso é construir relações sólidas e de confiança com nossos parceiros. Trabalhamos juntos para alcançar resultados excepcionais e proporcionar experiências únicas. Veja o que um de nossos parceiros tem a dizer sobre a colaboração conosco e como nossas soluções têm impactado positivamente seus negócios.
          </p>
          
          <div className="relative bg-[#05052d] border border-[#ff0066] rounded-xl p-12 mb-16">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2 w-20 h-20 flex items-center justify-center">
              <img 
                src="/lovable-uploads/fb8c94cf-57f0-40e5-bfb5-7032323989c7.png" 
                alt="ICON NEXT" 
                className="w-16 h-16 object-contain"
              />
            </div>
            
            <div className="text-6xl text-[#ff0066] opacity-30 absolute top-6 left-8">"</div>
            <p className="text-gray-300 text-lg relative z-10 mb-6">
              A SmartVoz oferece não só uma parceria e sim um compromisso de alavancar o nosso negócio. Com um sistema dinâmico e simples temos facilidade de gerir e ainda contamos com um canal direto para sugestões de melhoria. Somos gratos por todo empenho e pela cordialidade em tratar as demandas de com o máximo de agilidade e eficiência.
            </p>
            <div className="text-6xl text-[#ff0066] opacity-30 absolute bottom-6 right-8">"</div>
            
            <div className="text-xl font-semibold text-white mt-4">ICON NEXT</div>
            <div className="text-sm text-gray-400">Gerente – Camila</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
