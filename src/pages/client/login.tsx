
import { motion } from "framer-motion";
import { ParticlesBackground } from "@/components/client/products/ParticlesBackground";
import { LoginHeader } from "@/components/client/login/LoginHeader";
import { LoginForm } from "@/components/client/login/LoginForm";
import { RegisterLink } from "@/components/client/login/RegisterLink";
import { containerVariants, itemVariants } from "@/utils/animations";

export default function LoginPage() {
  return (
    <motion.div 
      className="container relative min-h-screen flex items-center justify-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <ParticlesBackground />
      
      <div className="w-full max-w-[350px] space-y-6 relative z-10">
        <LoginHeader itemVariants={itemVariants} />
        <LoginForm containerVariants={containerVariants} itemVariants={itemVariants} />
        <RegisterLink itemVariants={itemVariants} />
      </div>
    </motion.div>
  );
}
