
import { motion } from "framer-motion";

interface LoginHeaderProps {
  itemVariants: any;
}

export function LoginHeader({ itemVariants }: LoginHeaderProps) {
  return (
    <motion.div 
      className="flex flex-col space-y-2 text-center"
      variants={itemVariants}
    >
      <div className="text-[2.4rem] leading-[3.6rem] tracking-wide font-black bg-gradient-to-r from-color-1 via-color-2 to-color-3 bg-clip-text text-transparent [text-shadow:_2px_2px_2px_rgb(0_0_0_/_20%)] animate-rainbow bg-[length:200%_auto] -mt-16 mb-16">
        Smartvoz
      </div>
    </motion.div>
  );
}
