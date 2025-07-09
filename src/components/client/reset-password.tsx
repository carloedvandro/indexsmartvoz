
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { resetUserPassword } from "@/services/user/userReset";
import { Mail } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import ParticlesBackground from "@/components/client/products/ParticlesBackground";
import { motion } from "framer-motion";
import { FloatingLabelInput } from "@/components/client/register/fields/FloatingLabelInput";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

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
    <div className="relative min-h-screen">
      <ParticlesBackground />
      <div className="relative z-10 container flex items-center justify-center min-h-screen">
        <div className="w-full max-w-[350px] space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-[2.4rem] leading-[3.6rem] tracking-wide font-black bg-gradient-to-r from-color-1 via-color-2 to-color-3 bg-clip-text text-transparent [text-shadow:_2px_2px_2px_rgb(0_0_0_/_20%)] animate-rainbow bg-[length:200%_auto] -mt-16 mb-12">
              Smartvoz
            </h1>
          </div>

          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6" 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
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
                className="w-full !bg-[#580180] hover:!bg-[#4a0668]"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Continuar"}
              </RainbowButton>
            </motion.div>
          </motion.form>

          <motion.div 
            className="text-center" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/client/login"
              className="text-sm text-gray-600 hover:text-gray-700 hover:underline"
            >
              Voltar para login
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
