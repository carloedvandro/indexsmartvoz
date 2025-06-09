
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

interface RegisterLinkProps {
  itemVariants: any;
}

export function RegisterLink({ itemVariants }: RegisterLinkProps) {
  const [searchParams] = useSearchParams();
  const sponsorId = searchParams.get('sponsor');
  const registerUrl = sponsorId ? `/client/register?sponsor=${sponsorId}` : "/client/register";

  return (
    <motion.div 
      className="text-center text-sm border-t pt-6 mt-6"
      variants={itemVariants}
    >
      <div className="text-gray-600">
        <span>Não tem uma conta?</span>{" "}
        <Link 
          to={registerUrl} 
          className="text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors"
        >
          Criar conta gratuita
        </Link>
      </div>
    </motion.div>
  );
}
