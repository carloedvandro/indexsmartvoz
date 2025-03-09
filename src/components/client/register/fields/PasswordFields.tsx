
import { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormData } from "../RegisterSchema";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PasswordFieldsProps {
  form: UseFormReturn<RegisterFormData>;
}

export const PasswordFields = ({ form }: PasswordFieldsProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  return (
    <div className="grid grid-cols-2 gap-3">
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">Senha</FormLabel>
            <FormControl>
              <div className="relative overflow-hidden rounded-md">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#5f0889]" />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5f0889] h-3.5 w-3.5" />
                <Input 
                  type={showPassword ? "text" : "password"} 
                  {...field} 
                  className="pl-9 text-sm h-8 pt-[3px] border-l-0 rounded-none"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-2 py-1.5 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-3.5 w-3.5 text-[#5f0889]" />
                  ) : (
                    <Eye className="h-3.5 w-3.5 text-[#5f0889]" />
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
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#5f0889]" />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5f0889] h-3.5 w-3.5" />
                <Input 
                  type={showPasswordConfirmation ? "text" : "password"} 
                  {...field} 
                  className="pl-9 text-sm h-8 pt-[3px] border-l-0 rounded-none"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-2 py-1.5 hover:bg-transparent"
                  onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                >
                  {showPasswordConfirmation ? (
                    <EyeOff className="h-3.5 w-3.5 text-[#5f0889]" />
                  ) : (
                    <Eye className="h-3.5 w-3.5 text-[#5f0889]" />
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
