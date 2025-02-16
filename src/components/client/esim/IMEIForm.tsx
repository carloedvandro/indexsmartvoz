
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Smartphone, Info } from "lucide-react";

type IMEIFormProps = {
  onSubmit: (imei: string) => void;
  instructions?: string;
};

export function IMEIForm({ onSubmit, instructions }: IMEIFormProps) {
  const [imei, setIMEI] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imei.length === 15) {
      onSubmit(imei);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h2 className="text-2xl font-semibold text-center">
        Digite o IMEI do seu dispositivo
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
          placeholder="Digite o IMEI (15 dígitos)"
          value={imei}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            if (value.length <= 15) setIMEI(value);
          }}
          className="text-center text-lg"
          required
          pattern="\d{15}"
          title="O IMEI deve conter exatamente 15 dígitos"
        />
        
        <Button 
          type="submit" 
          className="w-full bg-[#5f0889] hover:bg-[#4a0668]"
          disabled={imei.length !== 15}
        >
          Continuar
        </Button>
      </form>
    </div>
  );
}
