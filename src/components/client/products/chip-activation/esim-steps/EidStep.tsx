
import { Input } from "@/components/ui/input";

interface EidStepProps {
  eid: string;
  onEidChange: (value: string) => void;
}

export function EidStep({ eid, onEidChange }: EidStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Por fim, é só informar o EID do celular que você está ativando</h2>
      
      <div className="space-y-2">
        <Input
          placeholder="Digite o EID"
          value={eid}
          onChange={(e) => onEidChange(e.target.value)}
          className="border-green-500 focus:ring-green-500"
        />
        <p className="text-sm text-gray-600">
          É só ligar pra *#06# e procurar por EID. O número vai aparecer na tela do seu celular.
        </p>
      </div>
    </div>
  );
}

