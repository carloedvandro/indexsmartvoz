import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { WarpBackground } from "@/components/ui/warp-background";
import { LayoutDashboard } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Index() {
  const { t } = useTranslation();

  return (
    <div 
      className="fixed inset-0 w-full h-full flex flex-col bg-cover bg-center bg-no-repeat" 
      style={{ 
        backgroundImage: 'url("https://maelrohlhrhihntydydh.supabase.co/storage/v1/object/public/images/smartvoztecnologico.png?t=2025-01-21T14%3A39%3A18.055Z")',
        backgroundColor: '#32004A'
      }}
    >
      {/* Navigation Bar */}
      <nav className="w-full px-4 py-3 flex items-center justify-between bg-transparent">
        <div className="flex items-center space-x-4">
          <Link 
            to="/client/dashboard" 
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="px-4 py-2 text-white hover:text-primary transition-colors"
                >
                  Atividades
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <Link 
          to="/client/login"
          className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          Login
        </Link>
      </nav>

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
          className="max-w-md w-full mx-auto space-y-12 text-center relative z-10 px-4 sm:px-0 mt-20"
        >
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
              O que você deseja?
            </h1>
            <p className="text-xl text-gray-200">
              Transforme seus objetivos em realidade com nossa plataforma inovadora. Liberdade, segurança e crescimento profissional em um só lugar.
            </p>
          </div>

          <div className="space-y-4">
            <Link to="/client/register" className="block">
              <Button 
                className="w-full text-lg py-6 bg-primary hover:bg-primary/90 text-white"
                size="lg"
              >
                Comece Agora
              </Button>
            </Link>
            
            <Button 
              variant="outline"
              className="w-full text-lg py-6 bg-white/10 hover:bg-white/20 text-white border-white/20"
              size="lg"
            >
              Saiba Mais
            </Button>
          </div>
        </motion.div>
      </WarpBackground>
    </div>
  );
}