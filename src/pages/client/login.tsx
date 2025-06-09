
import { LoginForm } from "@/components/client/login/LoginForm";
import { RegisterLink } from "@/components/client/login/RegisterLink";
import { containerVariants, itemVariants } from "@/utils/animations";
import { motion } from "framer-motion";
import { LoginHeader } from "@/components/client/login/LoginHeader";
import "@/styles/logo.css";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="/lovable-uploads/7d496e16-4a08-418b-a81e-3e3c620851eb.png"
          alt="Vivo Gestão"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-8 py-12">
        <motion.div 
          className="w-full max-w-md space-y-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header Section */}
          <motion.div className="text-center space-y-4" variants={itemVariants}>
            <h1 className="text-4xl font-bold text-purple-600">Vivo Gestão</h1>
            <p className="text-lg text-gray-600">
              Otimize o uso de Voz e Dados da sua empresa e potencialize seus negócios.
            </p>
            <p className="text-sm text-gray-500">
              Serviço de controle e acompanhamento com a praticidade e segurança de que você precisa!
            </p>
          </motion.div>

          {/* Login Form */}
          <div className="space-y-6">
            <LoginForm containerVariants={containerVariants} itemVariants={itemVariants} />
            <RegisterLink itemVariants={itemVariants} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
