
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, User } from "lucide-react";

type ActivationTypeProps = {
  onSelect: (type: 'self' | 'collaborator') => void;
};

export function ActivationType({ onSelect }: ActivationTypeProps) {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">
          Quem irá ativar a linha no eSIM?
        </h2>
        <p className="text-gray-600">
          É preciso ter o celular com o eSIM em mãos pra ativar
        </p>
      </div>

      <div className="space-y-4">
        <div 
          className="p-4 border rounded-lg cursor-pointer hover:border-[#9b87f5] group transition-all"
          onClick={() => onSelect('self')}
        >
          <div className="flex items-start gap-3">
            <input
              type="radio"
              name="type"
              id="self"
              className="mt-1 accent-[#9b87f5]"
              checked
              readOnly
            />
            <div>
              <label htmlFor="self" className="text-lg font-medium block">
                Eu Mesmo (Gestor)
              </label>
              <p className="text-gray-600 text-sm mt-1">
                Você informa os números de IMEI e EID do celular e ativa aqui pelo site
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg opacity-50">
          <div className="flex items-start gap-3">
            <input
              type="radio"
              name="type"
              id="collaborator"
              className="mt-1"
              disabled
            />
            <div>
              <label htmlFor="collaborator" className="text-lg font-medium block">
                Outra Pessoa (Colaborador)
              </label>
              <p className="text-gray-600 text-sm mt-1">
                Você gera um código de acesso e envia ao seu colaborador. Ele entra no nosso site, informa os números de IMEI e EID do celular e faz a ativação
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <Button 
          variant="outline"
          className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5] hover:text-white"
        >
          Voltar
        </Button>
        <Button 
          onClick={() => onSelect('self')}
          className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white"
        >
          Continuar
        </Button>
        <Button 
          variant="link"
          className="text-[#9b87f5]"
        >
          <Info className="w-4 h-4 mr-1" />
          Preciso de ajuda
        </Button>
      </div>
    </div>
  );
}
