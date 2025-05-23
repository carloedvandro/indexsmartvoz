
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
      <div className="text-gray-700 mt-3">
        <span className="font-semibold">Não tem uma conta?</span> <Link to={registerUrl} className="text-black hover:underline">
          Criar nova conta
        </Link>
      </div>
    </motion.div>
  );
}
