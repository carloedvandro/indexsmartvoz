import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ESIMActivationFlowProps {
  currentStep: number;
  phoneNumber: string;
  onBack: () => void;
  onContinue: () => void;
}

export function ESIMActivationFlow({
  currentStep,
  phoneNumber,
  onBack,
  onContinue,
}: ESIMActivationFlowProps) {
  return (
    <Card className="md:col-span-2 max-w-4xl mx-auto w-full">
      <CardContent className="pt-6 space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">ATIVAÇÃO DE ESIM</h1>
          <p className="text-lg">{phoneNumber}</p>
        </div>

        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl">Quem irá ativar a linha no eSIM?</h2>
            <p className="text-gray-600">É preciso ter o celular com o eSIM em mãos pra ativar</p>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">OPÇÕES DE SERVIÇOS</h3>
              <RadioGroup defaultValue="self">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="self" id="self" />
                  <Label htmlFor="self">
                    <div>
                      <p className="font-medium">Eu Mesmo (Gestor)</p>
                      <p className="text-sm text-gray-500">
                        Você informa os números de IMEI e EID do celular e ativa aqui pelo site
                      </p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">
                    <div>
                      <p className="font-medium">Outra Pessoa (Colaborador)</p>
                      <p className="text-sm text-gray-500">
                        Você gera um código de acesso e envia ao seu colaborador. Ele entra no nosso site, informa os números de IMEI e EID do celular e faz a ativação
                      </p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl">Vamos começar escolhendo o sistema do celular que vai ter o eSIM ativado</h2>
            <div className="bg-gray-700 text-white p-4 rounded-lg">
              <p>O aparelho precisa ter um eSIM pra ter o chip ativado</p>
            </div>
            <RadioGroup defaultValue="android">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="android" id="android" />
                <Label htmlFor="android">Android</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ios" id="ios" />
                <Label htmlFor="ios">iOS (iPhone)</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl">Agora você vai precisar informar o IMEI do celular que vai ter o eSIM ativado</h2>
            <img 
              src="/lovable-uploads/a3c672f0-14d2-4500-b116-5101db937c4c.png" 
              alt="IMEI Location"
              className="max-w-md mx-auto"
            />
            <Button 
              variant="default"
              className="bg-[#660099] hover:bg-[#660099]/90 w-full md:w-auto"
            >
              Entendi, informar o IMEI
            </Button>
            <Button variant="link" className="text-[#660099]">
              Preciso de ajuda
            </Button>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl">Aqui você informa o IMEI do celular em que vai ativar o eSIM</h2>
            <p className="text-gray-600">
              É só ir nas configurações do aparelho e digitar IMEI no campo de busca. O número que você precisa vai estar em status como IMEI (eSIM)
            </p>
            <Input placeholder="Digite o IMEI" />
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-6">
            <h2 className="text-2xl">Por fim, é só informar o EID do celular que você está ativando</h2>
            <img 
              src="/lovable-uploads/3c8cd926-3fc1-4b2b-bd42-8a076059e937.png" 
              alt="EID Location"
              className="max-w-md mx-auto"
            />
            <Button 
              variant="default"
              className="bg-[#660099] hover:bg-[#660099]/90 w-full md:w-auto"
            >
              Entendi, informar o EID
            </Button>
            <Button variant="link" className="text-[#660099]">
              Preciso de ajuda
            </Button>
          </div>
        )}

        {currentStep === 6 && (
          <div className="space-y-6">
            <h2 className="text-2xl">Aqui você informa o EID do celular que você está ativando</h2>
            <p className="text-gray-600">
              É só ligar pra *#06# e procurar por EID. O número vai aparecer na tela do seu celular.
            </p>
            <Input placeholder="Digite o EID" />
          </div>
        )}

        <div className="flex justify-between">
          <Button 
            variant="outline"
            onClick={onBack}
          >
            Voltar
          </Button>
          <Button 
            className="bg-[#660099] hover:bg-[#660099]/90"
            onClick={onContinue}
          >
            Continuar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}