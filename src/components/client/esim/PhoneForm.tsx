
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PhoneFormProps = {
  onSubmit: (phone: string) => void;
};

export function PhoneForm({ onSubmit }: PhoneFormProps) {
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(phone);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h2 className="text-2xl font-semibold text-center">
        Digite o número do telefone
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="tel"
          placeholder="(00) 00000-0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="text-center text-lg"
          required
        />
        
        <Button 
          type="submit" 
          className="w-full bg-[#5f0889] hover:bg-[#4a0668]"
        >
          Continuar
        </Button>
      </form>
    </div>
  );
}
