
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AuthError } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { EmailField } from "./form-fields/EmailField";
import { PasswordField } from "./form-fields/PasswordField";
import { ForgotPasswordLink } from "./form-fields/ForgotPasswordLink";
import { LoginButton } from "./form-fields/LoginButton";
import { useLoginHandler } from "./hooks/useLoginHandler";

interface LoginFormProps {
  containerVariants: any;
  itemVariants: any;
}

export function LoginForm({ containerVariants, itemVariants }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, error, handleLogin } = useLoginHandler();

  return (
    <motion.form 
      onSubmit={(e) => handleLogin(e, email, password)} 
      className="space-y-6"
      variants={containerVariants}
    >
      <EmailField 
        email={email} 
        setEmail={setEmail} 
        itemVariants={itemVariants} 
      />
      
      <PasswordField 
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        itemVariants={itemVariants}
      />

      <ForgotPasswordLink itemVariants={itemVariants} />

      {error && (
        <motion.div 
          className="text-red-500 text-sm"
          variants={itemVariants}
        >
          {error}
        </motion.div>
      )}

      <LoginButton 
        isLoading={isLoading} 
        itemVariants={itemVariants} 
      />
    </motion.form>
  );
}
