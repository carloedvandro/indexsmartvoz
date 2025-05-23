
import { LoginForm } from "@/components/client/login/LoginForm";
import { RegisterLink } from "@/components/client/login/RegisterLink";
import { containerVariants, itemVariants } from "@/utils/animations";
import { motion } from "framer-motion";
import { LoginHeader } from "@/components/client/login/LoginHeader";
import "@/styles/logo.css"; // Ensure the logo styles are imported

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full">
      <motion.div 
        className="container flex items-center justify-center h-screen -mt-5"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="w-full max-w-[350px] ">
          <LoginHeader itemVariants={itemVariants} />
          <LoginForm containerVariants={containerVariants} itemVariants={itemVariants} />
          <RegisterLink itemVariants={itemVariants}  />
        </div>
      </motion.div>
    </div>
  );
}
