
import { LoginForm } from "@/components/client/login/LoginForm";
import { RegisterLink } from "@/components/client/login/RegisterLink";
import { containerVariants, itemVariants } from "@/utils/animations";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full">
      <motion.div 
        className="container flex items-center justify-center h-screen -mt-5"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="w-full max-w-[340px] space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <div className="-mt-10 flex justify-center">
              <img 
                src="/lovable-uploads/5bded3e2-dd4c-4996-9027-b3a0abbb766c.png" 
                alt="Smartvoz" 
                className="h-auto w-[240px]"
              />
            </div>
          </div>
          <LoginForm containerVariants={containerVariants} itemVariants={itemVariants} />
          <RegisterLink itemVariants={itemVariants} />
        </div>
      </motion.div>
    </div>
  );
}
