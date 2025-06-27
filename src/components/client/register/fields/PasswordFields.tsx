
import { useState } from "react";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [focusedFields, setFocusedFields] = useState<Record<string, boolean>>({});
  
  const handleFocus = (fieldName: string) => {
    setFocusedFields(prev => ({ ...prev, [fieldName]: true }));
  };
  
  const handleBlur = (fieldName: string) => {
    setFocusedFields(prev => ({ ...prev, [fieldName]: false }));
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="relative w-full">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  {...field} 
                  onFocus={() => handleFocus("password")}
                  onBlur={() => handleBlur("password")}
                  className="w-full pr-20 pl-10 bg-white border-2 border-[#7a1fa2] rounded-md h-12 text-black focus:border-[#7a1fa2]"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#580180] h-5 w-5" />
                <Label 
                  className={`absolute left-10 transition-all duration-200 ease-in-out pointer-events-none text-gray-500 font-medium bg-white px-1 ${
                    focusedFields.password || field.value ? '-top-2 text-xs left-3' : 'top-1/2 -translate-y-1/2 text-base'
                  }`}
                >
                  Senha
                </Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-[#580180]" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#580180]" />
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
            <FormControl>
              <div className="relative w-full">
                <Input 
                  type={showPasswordConfirmation ? "text" : "password"} 
                  {...field} 
                  onFocus={() => handleFocus("passwordConfirmation")}
                  onBlur={() => handleBlur("passwordConfirmation")}
                  className="w-full pr-20 pl-10 bg-white border-2 border-[#7a1fa2] rounded-md h-12 text-black focus:border-[#7a1fa2]"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#580180] h-5 w-5" />
                <Label 
                  className={`absolute left-10 transition-all duration-200 ease-in-out pointer-events-none text-gray-500 font-medium bg-white px-1 ${
                    focusedFields.passwordConfirmation || field.value ? '-top-2 text-xs left-3' : 'top-1/2 -translate-y-1/2 text-base'
                  }`}
                >
                  Confirmar Senha
                </Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                >
                  {showPasswordConfirmation ? (
                    <EyeOff className="h-5 w-5 text-[#580180]" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#580180]" />
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
