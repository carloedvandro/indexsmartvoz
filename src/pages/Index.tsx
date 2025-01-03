import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Index() {
  const { t } = useTranslation();

  return (
    <div 
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=2000&q=80")',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 text-center relative z-10 px-4 sm:px-0"
      >
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Bem vindo a Y-TECH Internet 5G
          </h1>
          <p className="text-lg text-gray-200">
            {t('choose_access')}
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/client/login" className="block">
            <Button className="w-full text-lg py-6" variant="default">
              {t('client_area')}
            </Button>
          </Link>
          
          <Link to="/admin/login" className="block">
            <Button className="w-full text-lg py-6" variant="secondary">
              {t('admin_area')}
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}