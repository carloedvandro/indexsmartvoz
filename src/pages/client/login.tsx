
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
        backgroundImage: `url('/lovable-uploads/3b627119-36e4-4e0f-be85-fa9d400ab664.png')`
      }}
    >
      {/* Formulário de Login centralizado sem fundo */}
      <div className="relative z-10 w-full max-w-[400px] mx-4">
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
