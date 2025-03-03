
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { WarpBackground } from "@/components/ui/warp-background";

export default function Index() {
  const { t } = useTranslation();
  
  return (
    <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center" style={{
      background: 'linear-gradient(135deg, #E5DEFF 0%, #FFDEE2 100%)'
    }}>
      <WarpBackground className="w-full h-full border-0 p-0" beamsPerSide={12} beamSize={0.8} beamDelayMax={0.5} beamDuration={0.8} gridColor="rgba(255,255,255,0.3)" perspective={150}>
        <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="max-w-md w-full mx-auto space-y-12 text-center relative z-10 px-4 sm:px-0">
          <div className="space-y-6">
            <div className="flex justify-center mb-4">
              <img 
                src="/lovable-uploads/6476bb03-0467-42d7-ae08-31ae5f2da580.png" 
                alt="Smartvoz" 
                className="h-20 w-auto"
                loading="eager"
                fetchPriority="high"
              />
            </div>
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
          </div>
        </motion.div>
      </WarpBackground>
    </div>
  );
}
