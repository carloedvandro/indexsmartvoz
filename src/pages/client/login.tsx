import { LoginForm } from "@/components/client/login/LoginForm";
import { RegisterLink } from "@/components/client/login/RegisterLink";
import { containerVariants, itemVariants } from "@/utils/animations";
import { motion } from "framer-motion";
import "@/styles/logo.css";
export default function LoginPage() {
  return <div className="min-h-screen w-full flex flex-col bg-white">
      {/* Header com Logo - Agora transparente */}
      <div className="fixed top-0 left-0 right-0 bg-transparent px-4 py-2 z-50">
        <div className="flex justify-center">
          <img src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png" alt="Smartvoz Logo" className="h-[85px] object-contain mix-blend-multiply opacity-90 contrast-125" />
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex bg-white">
        {/* Left side - Image (hidden on mobile) */}
        <div className="hidden md:block w-[58%] bg-cover bg-center" style={{
        backgroundImage: `url('/lovable-uploads/2fa7f55a-90a6-4fab-beed-fbbe71ad2852.png')`,
        backgroundPosition: 'center top'
      }} />
        
        {/* Right side - Login Form */}
        <div className="w-full md:w-[42%] flex items-center justify-center bg-white">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="w-full max-w-[480px] px-10 md:px-12 mx-auto">
            {/* Texto descritivo - movido ainda mais para baixo */}
            <div className="text-center mb-8 mt-36">
              <p className="text-gray-700 text-base px-0 leading-relaxed">
                Otimize o uso de Voz e Dados da sua empresa e potencialize seus negócios.
              </p>
              <hr className="my-3 border-white" />
              <p className="text-gray-700 text-base px-0 leading-relaxed">
                Serviço de controle e acompanhamento com a praticidade e segurança de que você precisa!
              </p>
            </div>
            
            <LoginForm containerVariants={containerVariants} itemVariants={itemVariants} />
            <RegisterLink itemVariants={itemVariants} />
          </motion.div>
        </div>
      </div>
    </div>;
}