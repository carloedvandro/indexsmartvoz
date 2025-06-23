
import { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormData } from "../RegisterSchema";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PasswordStepProps {
  form: UseFormReturn<RegisterFormData>;
}

export const PasswordStep = ({ form }: PasswordStepProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Segurança da Conta</h2>
        <p className="text-gray-600 text-sm mt-1">Crie uma senha segura para proteger sua conta</p>
      </div>

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">Senha</FormLabel>
            <FormControl>
              <div className="relative overflow-hidden rounded-md">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#580180] h-4 w-4" />
                <Input 
                  type={showPassword ? "text" : "password"} 
                  {...field} 
                  className="pl-10 text-sm h-10 rounded-md"
                  placeholder="Digite uma senha forte"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-[#580180]" />
                  ) : (
                    <Eye className="h-4 w-4 text-[#580180]" />
                  )}
                </Button>
              </div>
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="passwordConfirmation"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">Confirmar Senha</FormLabel>
            <FormControl>
              <div className="relative overflow-hidden rounded-md">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#580180] h-4 w-4" />
                <Input 
                  type={showPasswordConfirmation ? "text" : "password"} 
                  {...field} 
                  className="pl-10 text-sm h-10 rounded-md"
                  placeholder="Digite a senha novamente"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                >
                  {showPasswordConfirmation ? (
                    <EyeOff className="h-4 w-4 text-[#580180]" />
                  ) : (
                    <Eye className="h-4 w-4 text-[#580180]" />
                  )}
                </Button>
              </div>
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
};
