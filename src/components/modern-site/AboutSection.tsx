
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { WarpBackground } from '@/components/ui/warp-background';

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white bg-opacity-80">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <WarpBackground 
              perspective={500}
              beamsPerSide={2}
              beamSize={10}
              gridColor="rgba(79, 70, 229, 0.08)"
              beamDuration={8}
            >
              <div className="bg-gradient-to-tl from-indigo-800 via-purple-600 to-violet-500 rounded-xl aspect-video flex items-center justify-center text-white text-4xl font-bold shadow-2xl border-2 border-indigo-100">
                SmartVoz
              </div>
            </WarpBackground>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <h2 className="text-3xl font-bold mb-6">Sobre Nós</h2>
            <p className="text-gray-700 mb-4">
              A SmartVoz nasceu com a missão de transformar o modo como as empresas se conectam com seus clientes no ambiente digital.
            </p>
            <p className="text-gray-700 mb-6">
              Com mais de 10 anos de experiência no mercado, nossa equipe de especialistas combina criatividade e tecnologia para entregar soluções que impulsionam resultados reais.
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Conheça Nossa História
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
