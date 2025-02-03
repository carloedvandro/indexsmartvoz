import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { WarpBackground } from "@/components/ui/warp-background";

// Array de gradientes para fácil troca
const gradients = [
  // Efeito 1: Roxo suave para rosa
  "bg-gradient-to-br from-purple-500 via-pink-400 to-red-300",
  
  // Efeito 2: Azul profundo para ciano
  "bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400",
  
  // Efeito 3: Verde esmeralda para turquesa
  "bg-gradient-to-br from-emerald-500 via-teal-400 to-cyan-300",
  
  // Efeito 4: Dourado para laranja suave
  "bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-200",
  
  // Efeito 5: Rosa vibrante para roxo
  "bg-gradient-to-br from-pink-600 via-purple-500 to-indigo-400"
];

// Escolha qual gradiente usar (0-4)
const currentGradient = gradients[0];

export default function Index() {
  const { t } = useTranslation();

  return (
    <div 
      className={`fixed inset-0 w-full h-full flex flex-col items-center justify-center ${currentGradient}`}
    >
      <WarpBackground 
        className="w-full h-full border-0 p-0"
        beamsPerSide={12}
        beamSize={0.8}
        gridColor="rgba(255,255,255,0.1)"
        perspective={120}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full mx-auto space-y-12 text-center relative z-10 px-4 sm:px-0"
        >
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
              Bem vindo a Smartvoz
            </h1>
            <p className="text-xl text-gray-200">
              {t('choose_access')}
            </p>
          </div>

          <div className="space-y-6 max-w-sm mx-auto">
            <Link to="/client/login" className="block">
              <Button 
                className="w-full text-lg py-6 bg-primary hover:bg-primary/90 text-white"
                size="lg"
              >
                {t('client_area')}
              </Button>
            </Link>
            
            <Link to="/admin/login" className="block">
              <Button 
                className="w-full text-lg py-6 bg-secondary hover:bg-secondary/90 text-white"
                size="lg"
              >
                {t('admin_area')}
              </Button>
            </Link>
          </div>
        </motion.div>
      </WarpBackground>
    </div>
  );
}