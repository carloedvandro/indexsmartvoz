
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

type ActivationTypeProps = {
  onSelect: (type: 'self' | 'collaborator') => void;
};

export function ActivationType({ onSelect }: ActivationTypeProps) {
  return (
    <div className="max-w-md mx-auto space-y-6">
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
          className="p-4 rounded-lg border border-gray-200 hover:border-[#8425af] cursor-pointer transition-all"
          onClick={() => onSelect('self')}
        >
          <div className="flex items-start gap-3">
            <input
              type="radio"
              name="type"
              id="self"
              className="mt-1 accent-[#8425af]"
              checked
              readOnly
            />
            <div>
              <label htmlFor="self" className="text-lg font-medium">
                Eu Mesmo (Gestor)
              </label>
              <p className="text-gray-600 text-sm mt-1">
                Você informa os números de IMEI e EID do celular e ativa aqui pelo site
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg border border-gray-200 opacity-50">
          <div className="flex items-start gap-3">
            <input
              type="radio"
              name="type"
              id="collaborator"
              className="mt-1"
              disabled
            />
            <div>
              <label htmlFor="collaborator" className="text-lg font-medium">
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
          onClick={() => onSelect('self')}
          className="bg-[#8425af] hover:bg-[#6c1e8f] text-white px-6"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
