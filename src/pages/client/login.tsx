
import { motion } from "framer-motion";
import { LoginHeader } from "@/components/client/login/LoginHeader";
import { LoginForm } from "@/components/client/login/LoginForm";
import { RegisterLink } from "@/components/client/login/RegisterLink";
import { containerVariants, itemVariants } from "@/utils/animations";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full">
      <motion.div 
        className="container flex items-center justify-center h-screen"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="w-full max-w-[350px] space-y-6">
          <LoginHeader itemVariants={itemVariants} />
          <LoginForm containerVariants={containerVariants} itemVariants={itemVariants} />
          <RegisterLink itemVariants={itemVariants} />
        </div>
      </motion.div>
    </div>
  );
}
