
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";

type EIDFormProps = {
  onSubmit: (eid: string) => void;
};

export function EIDForm({ onSubmit }: EIDFormProps) {
  const [eid, setEID] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (eid.length === 32) {
      onSubmit(eid);
    }
  };

  const isValidEID = eid.length === 32;

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">
          Por fim, é só informar o EID do celular que você está ativando
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="text"
          placeholder="Digite o EID"
          value={eid}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9a-fA-F]/g, '');
            if (value.length <= 32) setEID(value.toUpperCase());
          }}
          className={`text-center text-lg rounded-lg ${
            isValidEID 
              ? 'border-green-500 focus:border-green-500 focus:ring-green-500' 
              : 'border-gray-200 focus:border-[#8425af] focus:ring-[#8425af]'
          }`}
        />

        <p className="text-sm text-gray-600">
          É só ligar pra *#06# e procurar por EID. O número vai aparecer na tela do seu celular.
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
            disabled={!isValidEID}
          >
            Continuar
          </Button>
        </div>
      </form>
    </div>
  );
}
