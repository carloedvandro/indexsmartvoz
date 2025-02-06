
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface IdentityStepProps {
  activationType: 'self' | 'other';
  setActivationType: (value: 'self' | 'other') => void;
}

export function IdentityStep({ activationType, setActivationType }: IdentityStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Quem irá ativar a linha no eSIM?</h2>
      <p className="text-gray-600">É preciso ter o celular com o eSIM em mãos pra ativar</p>
      
      <RadioGroup value={activationType} onValueChange={(value: 'self' | 'other') => setActivationType(value)}>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="self" id="self" />
            <Label htmlFor="self" className="font-semibold">Eu Mesmo (Gestor)</Label>
          </div>
          <p className="text-sm text-gray-600 ml-6">
            Você informa os números de IMEI e EID do celular e ativa aqui pelo site
          </p>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other" className="font-semibold">Outra Pessoa (Colaborador)</Label>
          </div>
          <p className="text-sm text-gray-600 ml-6">
            Você gera um código de acesso e envia ao seu colaborador. Ele entra no nosso site, informa os números de IMEI e EID do celular e faz a ativação
          </p>
        </div>
      </RadioGroup>
    </div>
  );
}
