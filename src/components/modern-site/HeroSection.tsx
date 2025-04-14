
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section id="home" className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600">
            Transforme sua presença digital
          </h1>
          <p className="text-xl text-gray-700 mb-10">
            Soluções inovadoras para empresas que buscam se destacar no mundo digital.
            Designs responsivos, experiências personalizadas e tecnologia de ponta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
            >
              Iniciar Agora
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-purple-300 text-purple-700 hover:bg-purple-50"
            >
              Saiba Mais
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
