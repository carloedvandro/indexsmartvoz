
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideIcon } from "lucide-react";

interface FloatingLabelInputProps {
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  label: string;
  icon?: LucideIcon;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export const FloatingLabelInput = ({
  id,
  type = "text",
  value,
  onChange,
  onFocus,
  onBlur,
  label,
  icon: Icon,
  disabled = false,
  placeholder = "",
  className = ""
}: FloatingLabelInputProps) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setFocused(false);
    onBlur?.();
  };

  return (
    <div className={`relative w-full ${className}`}>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full ${Icon ? 'pr-10 pl-3' : 'px-3'} bg-white border-2 border-[#7a1fa2] rounded-md h-12 text-black focus:border-[#7a1fa2] ${disabled ? 'disabled:opacity-70' : ''}`}
      />
      <Label
        htmlFor={id}
        className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none text-gray-500 font-medium bg-white px-1 ${
          focused || value ? '-top-2 text-xs' : 'top-1/2 -translate-y-1/2 text-base'
        }`}
      >
        {label}
      </Label>
      {Icon && (
        <Icon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
      )}
    </div>
  );
};
