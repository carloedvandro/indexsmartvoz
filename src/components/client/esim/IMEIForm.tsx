
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";

type IMEIFormProps = {
  onSubmit: (imei: string) => void;
};

export function IMEIForm({ onSubmit }: IMEIFormProps) {
  const [imei, setIMEI] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imei.length === 15) {
      onSubmit(imei);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">
          Agora você vai precisar informar o IMEI do celular que vai ter o eSIM ativado
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="text"
          placeholder="Digite o IMEI"
          value={imei}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            if (value.length <= 15) setIMEI(value);
          }}
          className="text-center text-lg border-gray-200 focus:border-[#8425af] focus:ring-[#8425af] rounded-lg"
        />

        <p className="text-sm text-gray-600">
          É só ir nas configurações do aparelho e digitar IMEI no campo de busca. O número que você precisa vai estar em status como IMEI (eSIM)
        </p>

        <div className="flex justify-between items-center mt-8">
          <Button 
            type="button"
            variant="outline"
            className="border border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white px-6"
          >
            Voltar
          </Button>
          <Button 
            variant="link"
            className="text-[#8425af]"
          >
            <Info className="w-4 h-4 mr-1" />
            Preciso de ajuda
          </Button>
          <Button 
            type="submit"
            className="bg-[#8425af] hover:bg-[#6c1e8f] text-white px-6"
            disabled={imei.length !== 15}
          >
            Continuar
          </Button>
        </div>
      </form>
    </div>
  );
}
