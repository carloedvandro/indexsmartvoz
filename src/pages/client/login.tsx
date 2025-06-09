
import { LoginForm } from "@/components/client/login/LoginForm";
import { RegisterLink } from "@/components/client/login/RegisterLink";
import { containerVariants, itemVariants } from "@/utils/animations";
import { motion } from "framer-motion";
import { LoginHeader } from "@/components/client/login/LoginHeader";
import "@/styles/logo.css";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex">
      {/* Left side - Image (hidden on mobile) */}
      <div 
        className="hidden md:block w-[58%] bg-cover bg-center"
        style={{
          backgroundImage: `url('/lovable-uploads/76b380a7-c91e-4b6f-b4c7-e4e68b6d9e3b.png')`
        }}
      />
      
      {/* Right side - Login Form */}
      <div className="w-full md:w-[42%] flex items-center justify-center bg-white">
        <motion.div 
          className="w-full max-w-[350px] px-4 md:px-8"
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
