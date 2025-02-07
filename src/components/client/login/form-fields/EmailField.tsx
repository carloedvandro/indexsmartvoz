
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";

interface EmailFieldProps {
  email: string;
  setEmail: (email: string) => void;
  itemVariants: any;
}

export function EmailField({ email, setEmail, itemVariants }: EmailFieldProps) {
  return (
    <motion.div className="space-y-2" variants={itemVariants}>
      <Label htmlFor="email">Email</Label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10"
          required
        />
      </div>
    </motion.div>
  );
}
