
import { LoginForm } from "@/components/client/login/LoginForm";
import { RegisterLink } from "@/components/client/login/RegisterLink";
import { containerVariants, itemVariants } from "@/utils/animations";
import { motion } from "framer-motion";
import { LoginHeader } from "@/components/client/login/LoginHeader";
import "@/styles/logo.css";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 relative">
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
