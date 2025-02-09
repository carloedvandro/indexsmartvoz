
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface RegisterLinkProps {
  itemVariants: any;
}

export function RegisterLink({ itemVariants }: RegisterLinkProps) {
  return (
    <motion.div 
      className="space-y-2 text-center text-sm"
      variants={itemVariants}
    >
      <div className="text-gray-700">
        Não tem uma conta? <Link to="/client/register" className="text-black font-semibold hover:underline">
          Criar nova conta
        </Link>
      </div>
    </motion.div>
  );
}
