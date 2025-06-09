
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
          {/* Header Section with Logo */}
          <motion.div className="text-center space-y-6" variants={itemVariants}>
            <LoginHeader itemVariants={itemVariants} />
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-gray-800">Bem-vindo de volta!</h2>
              <p className="text-gray-600">
                Faça login em sua conta para continuar
              </p>
            </div>
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
