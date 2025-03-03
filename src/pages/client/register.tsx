
import { RegisterFormContainer } from "@/components/client/register/RegisterFormContainer";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/utils/animations";

export default function ClientRegister() {
  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col justify-center items-center min-h-screen py-10 px-5 sm:px-4 -mt-5">
        <div className="w-full max-w-md mt-4">
          <div className="flex flex-col items-center mb-6 mt-5">
            <div className="mt-10 -mt-10 flex justify-center">
              <img 
                src="/lovable-uploads/5bded3e2-dd4c-4996-9027-b3a0abbb766c.png" 
                alt="Smartvoz" 
                className="h-auto w-[240px]"
              />
            </div>
          </div>
          <RegisterFormContainer />
        </div>
      </div>
    </div>
  );
}
