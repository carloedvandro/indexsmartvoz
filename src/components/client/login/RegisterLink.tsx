
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
      className="space-y-2 text-center text-sm"
      variants={itemVariants}
    >
      <div className="text-gray-700">
        Não tem uma conta? <Link to={registerUrl} className="text-black font-semibold hover:underline">
          Criar nova conta
        </Link>
      </div>
    </motion.div>
  );
}
