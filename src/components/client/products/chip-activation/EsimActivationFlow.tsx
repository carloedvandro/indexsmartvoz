
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, HelpCircle } from "lucide-react";

interface EsimActivationFlowProps {
  onComplete: (imei: string, eid: string) => void;
}

export function EsimActivationFlow({ onComplete }: EsimActivationFlowProps) {
  const [step, setStep] = useState(1);
  const [activationType, setActivationType] = useState<'self' | 'other'>('self');
  const [systemType, setSystemType] = useState<'android' | 'ios'>('android');
  const [imei, setImei] = useState("");
  const [eid, setEid] = useState("");

  const handleContinue = () => {
    if (step === 4) {
      onComplete(imei, eid);
    } else {
      setStep(step + 1);
    }
  };

  const progressValue = (step / 4) * 100;

  const renderStepIndicator = () => (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2">ATIVAÇÃO DE ESIM</h2>
      <div className="flex items-center justify-between mb-2 text-sm">
        <span>Identidade</span>
        <span>Sistema</span>
        <span>IMEI</span>
        <span>EID</span>
      </div>
      <Progress value={progressValue} className="h-2" />
    </div>
  );

  return (
    <div className="w-full max-w-[400px] mx-auto space-y-6">
      {renderStepIndicator()}

      {step === 1 && (
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
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Vamos começar escolhendo o sistema do celular que vai ter o eSIM ativado</h2>
          
          <div className="bg-gray-700 text-white p-4 rounded-lg flex items-start space-x-2">
            <AlertTriangle className="h-5 w-5 mt-1 flex-shrink-0" />
            <p className="text-sm">O aparelho precisa ter um eSIM pra ter o chip ativado</p>
          </div>

          <RadioGroup value={systemType} onValueChange={(value: 'android' | 'ios') => setSystemType(value)}>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="android" id="android" />
                <Label htmlFor="android">Android</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ios" id="ios" />
                <Label htmlFor="ios">iOS (iPhone)</Label>
              </div>
            </div>
          </RadioGroup>
        </div>
      )}

      {step === 3 && (
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
              onChange={(e) => setImei(e.target.value)}
              className="border-green-500 focus:ring-green-500"
            />
            <p className="text-sm text-gray-600">
              É só ir nas configurações do aparelho e digitar IMEI no campo de busca. O número que você precisa vai estar em status como IMEI (eSIM)
            </p>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Por fim, é só informar o EID do celular que você está ativando</h2>
          
          <div className="space-y-2">
            <Input
              placeholder="Digite o EID"
              value={eid}
              onChange={(e) => setEid(e.target.value)}
              className="border-green-500 focus:ring-green-500"
            />
            <p className="text-sm text-gray-600">
              É só ligar pra *#06# e procurar por EID. O número vai aparecer na tela do seu celular.
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={() => setStep(Math.max(1, step - 1))}
          className="border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white"
        >
          Voltar
        </Button>

        <div className="flex gap-4">
          <Button
            variant="link"
            className="text-[#8425af]"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Preciso de ajuda
          </Button>

          <Button
            onClick={handleContinue}
            className="bg-[#8425af] hover:bg-[#6c1e8f] text-white"
            disabled={
              (step === 3 && !imei) ||
              (step === 4 && !eid)
            }
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
}
