
import { Input } from "@/components/ui/input";

interface ImeiStepProps {
  imei: string;
  onImeiChange: (value: string) => void;
}

export function ImeiStep({ imei, onImeiChange }: ImeiStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Agora você vai precisar informar o IMEI do celular que vai ter o eSIM ativado</h2>
      
      <img 
        src="/lovable-uploads/9995b487-e538-4233-837f-ed73b70697da.png" 
        alt="Como encontrar o IMEI"
        className="w-full rounded-lg"
      />

      <div className="space-y-2">
        <Input
          placeholder="Digite o IMEI"
          value={imei}
          onChange={(e) => onImeiChange(e.target.value)}
          className="border-green-500 focus:ring-green-500"
        />
        <p className="text-sm text-gray-600">
          É só ir nas configurações do aparelho e digitar IMEI no campo de busca. O número que você precisa vai estar em status como IMEI (eSIM)
        </p>
      </div>
    </div>
  );
}

