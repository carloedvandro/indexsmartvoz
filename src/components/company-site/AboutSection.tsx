
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
            <div className="rounded-2xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop" 
                alt="PlayTec Gaming" 
                className="w-full h-auto"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Sobre a PlayTec</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              A PlayTec é uma empresa brasileira especializada em soluções de entretenimento digital e jogos, criada com a missão de proporcionar experiências únicas e acessíveis a jogadores de todos os níveis.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Nossa plataforma reúne os melhores jogos, tecnologias avançadas e uma comunidade vibrante, oferecendo um ecossistema completo para os amantes de games. Com uma equipe apaixonada por jogos, trabalhamos continuamente para trazer as melhores experiências para nossos usuários.
            </p>
            <div className="flex gap-4">
              <Link to="/client/register">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Junte-se a Nós
                </Button>
              </Link>
              <Link to="/client/store">
                <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                  Nossa Loja
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
