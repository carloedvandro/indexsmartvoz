
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

type ActivationTypeProps = {
  onSelect: (type: 'self' | 'collaborator') => void;
  onBack: () => void;
};

export function ActivationType({ onSelect, onBack }: ActivationTypeProps) {
  return (
    <div className="w-full max-w-[90%] md:max-w-[400px] mx-auto pt-44">
      <div className="flex justify-center">
        <img 
          src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png" 
          alt="Smartvoz Logo" 
          className="h-[140px] object-contain mb-4 mix-blend-multiply opacity-90 contrast-125"
        />
      </div>
      <p className="text-black text-center mt-2">
        É preciso ter o celular com o eSIM em mãos pra ativar
      </p>

      <div className="space-y-4 mt-6">
        <div 
          className="p-4 rounded-lg transition-all cursor-pointer relative hover:bg-transparent ring-2 ring-[#8425af] ring-offset-0 border-none bg-transparent before:absolute before:inset-[1px] before:border before:border-[#8425af] before:rounded-[7px]"
          onClick={() => onSelect('self')}
        >
          <div className="flex items-start gap-3">
            <input
              type="radio"
              name="type"
              id="self"
              className="mt-1 accent-[#580180]"
              checked
              readOnly
            />
            <div>
              <label htmlFor="self" className="text-lg font-medium text-black">
                Eu Mesmo (Usuário)
              </label>
              <p className="text-black text-sm mt-1">
                Você informa os números de IMEI e EID do celular e solicita ativação e aguardar o prazo da habilitação do eSIM
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8 gap-4">
        <Button 
          variant="outline"
          className="flex-1 border border-[#8425af] text-[#580180] hover:bg-[#8425af] hover:text-white rounded-lg py-3"
          onClick={onBack}
        >
          Voltar
        </Button>
        <Button 
          onClick={() => onSelect('self')}
          className="flex-1 bg-[#8425af] hover:bg-[#6c1e8f] text-white rounded-lg py-3"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
