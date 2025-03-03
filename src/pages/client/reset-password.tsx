
import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { resetPassword } from "@/services/user/userReset";
import { Mail } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/utils/animations";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await resetPassword(email);

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
        className="container flex items-center justify-center h-screen" 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="w-full max-w-[350px] space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <div className="-mt-10 flex justify-center">
              <img 
                src="/lovable-uploads/5bded3e2-dd4c-4996-9027-b3a0abbb766c.png" 
                alt="Smartvoz" 
                className="h-auto w-[240px]"
              />
            </div>
          </div>

          <motion.form onSubmit={handleSubmit} className="space-y-6" variants={containerVariants}>
            <motion.div className="space-y-2" variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-transparent"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <RainbowButton
                type="submit"
                className="w-full !bg-[#5f0889] hover:!bg-[#4a0668]"
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
