
// Update PasswordFields.tsx to match the new styling
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormData } from "../RegisterSchema";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordFieldsProps {
  form: UseFormReturn<RegisterFormData>;
}

export const PasswordFields = ({ form }: PasswordFieldsProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">Senha</FormLabel>
            <FormControl>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8425af] h-3.5 w-3.5" />
                <Input 
                  type={showPassword ? "text" : "password"} 
                  {...field} 
                  className="pl-9 text-sm h-8 pb-0 pt-3"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-[#8425af]" />
                  ) : (
                    <Eye className="h-4 w-4 text-[#8425af]" />
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
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8425af] h-3.5 w-3.5" />
                <Input 
                  type={showPasswordConfirmation ? "text" : "password"} 
                  {...field} 
                  className="pl-9 text-sm h-8 pb-0 pt-3"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                >
                  {showPasswordConfirmation ? (
                    <EyeOff className="h-4 w-4 text-[#8425af]" />
                  ) : (
                    <Eye className="h-4 w-4 text-[#8425af]" />
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
