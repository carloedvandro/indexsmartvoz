
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ForgotPasswordLinkProps {
  itemVariants: any;
}

export function ForgotPasswordLink({ itemVariants }: ForgotPasswordLinkProps) {
  return (
    <motion.div className="text-center" variants={itemVariants}>
      <Link
        to="/client/reset-password"
        className="text-sm text-black hover:text-gray-700 hover:underline"
      >
        Esqueceu sua senha?
      </Link>
    </motion.div>
  );
}
