
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function ClientEsimActivation() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [activationType, setActivationType] = useState<'self' | 'other'>('self');
  const [systemType, setSystemType] = useState<'android' | 'ios'>('android');
  const [imei, setImei] = useState("");
  const [eid, setEid] = useState("");

  const progressValue = (step / 4) * 100;

  const handleContinue = () => {
    if (step === 4) {
      // Handle completion
      navigate("/client/dashboard");
    } else {
      setStep(step + 1);
    }
  };

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 pb-16">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Ativação do eSIM</h1>
        </div>

        <Card className="max-w-[400px] mx-auto">
          <CardContent className="pt-6">
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

            <div className="flex justify-between pt-6">
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
                  Preciso de ajuda
                </Button>

                <Button
                  onClick={handleContinue}
                  className="bg-[#8425af] hover:bg-[#6c1e8f] text-white"
                >
                  Continuar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
