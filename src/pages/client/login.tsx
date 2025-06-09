
import { LoginForm } from "@/components/client/login/LoginForm";
import { RegisterLink } from "@/components/client/login/RegisterLink";
import { containerVariants, itemVariants } from "@/utils/animations";
import { motion } from "framer-motion";
import { LoginHeader } from "@/components/client/login/LoginHeader";
import "@/styles/logo.css";

export default function LoginPage() {
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url('/lovable-uploads/827f0d97-abea-4843-80fa-953571d9880f.png')`
      }}
    >
      {/* Overlay para melhorar a legibilidade */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Formulário de Login centralizado sem fundo movido 40px para esquerda */}
      <div className="relative z-10 w-full max-w-[400px] mx-4" style={{ marginLeft: '-40px' }}>
        <motion.div 
          className="p-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <LoginHeader itemVariants={itemVariants} />
          <LoginForm containerVariants={containerVariants} itemVariants={itemVariants} />
          <RegisterLink itemVariants={itemVariants} />
        </motion.div>
      </div>
    </div>
  );
}
