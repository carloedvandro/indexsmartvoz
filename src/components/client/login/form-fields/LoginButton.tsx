
import { motion } from "framer-motion";
import { RainbowButton } from "@/components/ui/rainbow-button";

interface LoginButtonProps {
  isLoading: boolean;
  itemVariants: any;
}

export function LoginButton({ isLoading, itemVariants }: LoginButtonProps) {
  return (
    <motion.div variants={itemVariants}>
      <RainbowButton
        type="submit"
        className="w-full !bg-purple-600 hover:!bg-purple-700"
        disabled={isLoading}
      >
        {isLoading ? "Entrando..." : "Entrar"}
      </RainbowButton>
    </motion.div>
  );
}
