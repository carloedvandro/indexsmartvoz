
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
    </motion.div>
  );
}
