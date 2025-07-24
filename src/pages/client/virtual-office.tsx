import { motion } from "framer-motion";
import Globe from "@/components/ui/3d-orb";

export default function VirtualOffice() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 3D Globe Background */}
      <Globe />
      
      {/* Virtual Office Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white p-8"
      >
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            Escritório Virtual
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-white/90"
          >
            Explore o futuro da conectividade global
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-3 text-blue-300">Conectividade Global</h3>
              <p className="text-white/80">Acesso instantâneo a redes em todo o mundo</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-3 text-purple-300">Tecnologia Avançada</h3>
              <p className="text-white/80">Infraestrutura de ponta para máxima performance</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-3 text-pink-300">Suporte 24/7</h3>
              <p className="text-white/80">Atendimento especializado a qualquer momento</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Navigation Overlay */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute top-8 left-8 z-20"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
          <h4 className="text-white font-semibold mb-3">Menu Virtual</h4>
          <div className="space-y-2">
            <button className="block w-full text-left text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
              Dashboard
            </button>
            <button className="block w-full text-left text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
              Planos
            </button>
            <button className="block w-full text-left text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
              Rede
            </button>
            <button className="block w-full text-left text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
              Relatórios
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}