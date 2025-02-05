
import { motion } from "framer-motion";
import { ParticlesBackground } from "@/components/ui/particles-background";
import { LoginHeader } from "@/components/client/login/LoginHeader";
import { LoginForm } from "@/components/client/login/LoginForm";
import { RegisterLink } from "@/components/client/login/RegisterLink";

export default function LoginPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

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
