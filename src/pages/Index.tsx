
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Globe, Box3D } from "lucide-react";

export default function Index() {
  const { t } = useTranslation();
  
  return (
    <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center" style={{
      background: 'linear-gradient(135deg, #E5DEFF 0%, #FFDEE2 100%)'
    }}>
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="max-w-md w-full mx-auto space-y-12 text-center relative z-10 px-4 sm:px-0"
      >
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
            Bem vindo a Smartvoz
          </h1>
          <p className="text-xl text-gray-700">
            {t('choose_access')}
          </p>
        </div>

        <div className="space-y-6 max-w-sm mx-auto">
          <Link to="/client/login" className="block">
            <Button className="w-full text-lg py-6 bg-primary hover:bg-primary/90 text-white" size="lg">
              {t('client_area')}
            </Button>
          </Link>
          
          <Link to="/admin/login" className="block">
            <Button size="lg" className="w-full text-lg py-6 bg-secondary hover:bg-secondary/90 text-white bg-[#660099]">
              {t('admin_area')}
            </Button>
          </Link>
          
          <a href="https://smartvoz.com.br" target="_blank" rel="noopener noreferrer" className="block">
            <Button size="lg" className="w-full text-lg py-6 bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2">
              <Globe size={20} />
              Site
            </Button>
          </a>
          
          <Link to="/site-model" className="block">
            <Button size="lg" className="w-full text-lg py-6 bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2">
              <Box3D size={20} />
              Site 3D Model (360°)
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
