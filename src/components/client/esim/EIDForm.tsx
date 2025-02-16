
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Smartphone, Info } from "lucide-react";

type EIDFormProps = {
  onSubmit: (eid: string) => void;
  instructions?: string;
};

export function EIDForm({ onSubmit, instructions }: EIDFormProps) {
  const [eid, setEID] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (eid.length === 32) {
      onSubmit(eid);
    }
  };

  const isValid = eid.length === 32;

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h2 className="text-2xl font-semibold text-center">
        Digite o EID do seu dispositivo
      </h2>

      {instructions && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
            <p className="text-sm text-blue-700">{instructions}</p>
          </div>
        </Card>
      )}
      
      <div className="flex items-center justify-center">
        <Smartphone className="w-32 h-32 text-[#5f0889]" />
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Digite o EID (32 caracteres)"
          value={eid}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9a-fA-F]/g, '');
            if (value.length <= 32) setEID(value.toUpperCase());
          }}
          className={`text-center text-lg ${
            isValid ? 'border-green-500 focus-visible:ring-green-500' : 'focus-visible:ring-[#9c40ff]'
          }`}
          required
          pattern="[0-9A-Fa-f]{32}"
          title="O EID deve conter exatamente 32 caracteres hexadecimais"
        />
        
        <Button 
          type="submit" 
          className="w-full bg-[#5f0889] hover:bg-[#4a0668]"
          disabled={!isValid}
        >
          Continuar
        </Button>
      </form>
    </div>
  );
}
