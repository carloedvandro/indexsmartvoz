
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
                src="https://maelrohlhrhihntydydh.supabase.co/storage/v1/object/public/images//smartvoz_parede_ultimate.png" 
                alt="SmartVoz Team" 
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
            <h2 className="text-3xl font-bold mb-6">Sobre a SmartVoz</h2>
            <p className="text-gray-700 mb-4">
              A SmartVoz é uma empresa brasileira especializada em soluções de comunicação e networking, criada com a missão de conectar pessoas e expandir oportunidades de negócio.
            </p>
            <p className="text-gray-700 mb-6">
              Com uma equipe de profissionais experientes e dedicados, oferecemos produtos e serviços inovadores que atendem às necessidades de nossos clientes, sempre com qualidade e excelência.
            </p>
            <Link to="/client/register">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Faça Parte da Nossa Rede
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
