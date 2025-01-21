import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { WarpBackground } from "@/components/ui/warp-background";

export default function Index() {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-black">
      <WarpBackground 
        className="w-full h-full border-0 p-0"
        beamsPerSide={5}
        beamSize={8}
        gridColor="rgba(255,255,255,0.1)"
        perspective={150}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full space-y-8 text-center relative z-10 px-4 sm:px-0"
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Bem vindo a Smartvoz
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
      </WarpBackground>
    </div>
  );
}