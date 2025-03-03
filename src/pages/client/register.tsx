
import { RegisterFormContainer } from "@/components/client/register/RegisterFormContainer";
import { ParticlesBackground } from "@/components/client/products/ParticlesBackground";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/utils/animations";

export default function ClientRegister() {
  return (
    <div className="min-h-screen w-full overflow-y-auto scrollbar-hide">
      <ParticlesBackground />
      <div className="relative flex flex-col justify-center items-center min-h-screen py-10 px-5 sm:px-4 overflow-hidden">
        <div className="w-full max-w-xl mt-4 z-10">
          <motion.div 
            className="flex flex-col items-center mb-6" 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="-mt-10 mb-16 flex justify-center">
              <img 
                src="/lovable-uploads/5bded3e2-dd4c-4996-9027-b3a0abbb766c.png" 
                alt="Smartvoz" 
                className="h-auto w-[240px]"
              />
            </motion.div>
          </motion.div>
          <RegisterFormContainer />
        </div>
      </div>
    </div>
  );
}
