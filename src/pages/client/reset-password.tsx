
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { resetUserPassword } from "@/services/user/userReset";
import { Mail } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/utils/animations";
import { FloatingLabelInput } from "@/components/client/register/fields/FloatingLabelInput";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await resetUserPassword(email);

      toast({
        title: "Email enviado",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });

    } catch (error: any) {
      toast({
        title: "Erro ao enviar email",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full">
      <motion.div 
        className="container flex items-center justify-center h-screen -mt-5" 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="w-full max-w-[400px] space-y-6">
          <div className="mb-[-25px]">
            <img 
                src="/lovable-uploads/5bded3e2-dd4c-4996-9027-b3a0abbb766c.png" 
                alt="Smartvoz" 
                className="w-auto mx-auto h-[90px] object-contain"
              />
          </div>

          <motion.form onSubmit={handleSubmit} className="space-y-6" variants={containerVariants}>
            <motion.div className="space-y-2" variants={itemVariants}>
              <FloatingLabelInput
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                icon={Mail}
                placeholder=""
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <RainbowButton
                type="submit"
                className="w-full !bg-[#580180] hover:!bg-[#4a0668] h-12"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Continuar"}
              </RainbowButton>
            </motion.div>
          </motion.form>

          <motion.div className="text-center" variants={itemVariants}>
            <Link
              to="/client/login"
              className="text-sm text-gray-600 hover:text-gray-700 hover:underline"
            >
              Voltar para login
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
