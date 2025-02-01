import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

export default function ClientChipActivation() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLines, setSelectedLines] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleContinue = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleAddLine = () => {
    if (phoneNumber && selectedLines.length < 10) {
      setSelectedLines([...selectedLines, phoneNumber]);
      setPhoneNumber("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 pb-16 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Ativação do Chip do Plano</h1>
        </div>

        <div className="flex items-center justify-between mb-8 max-w-3xl mx-auto">
          <div className="flex items-center flex-1">
            <div className="w-8 h-8 rounded-full bg-[#8425af] text-white flex items-center justify-center">
              1
            </div>
            <div className="flex-1 h-1 bg-[#8425af] mx-2" />
          </div>
          <div className="flex items-center flex-1">
            <div className={`w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-[#8425af]' : 'bg-gray-200'} text-white flex items-center justify-center`}>
              2
            </div>
            <div className={`flex-1 h-1 ${currentStep >= 2 ? 'bg-[#8425af]' : 'bg-gray-200'} mx-2`} />
          </div>
          <div className={`w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-[#8425af]' : 'bg-gray-200'} text-white flex items-center justify-center`}>
            3
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentStep === 1 && (
            <Card>
              <CardContent className="pt-6 space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Tenha os novos chips SIM cards com você</h2>
                    <p className="text-gray-600">
                      Compre nas lojas Vivo, pela Central de Relacionamento ou via Gerente que atende sua empresa
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Vamos confirmar sua identidade</h2>
                    <p className="text-gray-600">
                      Isso deixa o processo e seus dados ainda mais seguros
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Só coloque os chips SIM cards nos aparelhos quando concluir a troca</h2>
                    <p className="text-gray-600">
                      Assim você tem certeza de que a linha da sua empresa já está vinculada ao novo chip SIM card
                    </p>
                  </div>

                  <div className="space-y-2 pt-4">
                    <h3 className="text-lg font-medium">Precisa trocar ou ativar o chip virtual eSIM?</h3>
                    <p className="text-gray-600">
                      Clique em Voltar e procure pela linha. Depois, acesse Gerenciar linha e escolha Trocar pra eSIM ou Ativar eSIM
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    className="bg-[#8425af] hover:bg-[#6c1e8f]"
                    onClick={handleContinue}
                  >
                    Continuar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card>
              <CardContent className="pt-6 space-y-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Confira como você encontra o código de barras do SIM card</h2>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">COMO ENCONTRAR?</h3>
                    <p className="text-gray-600">
                      O código de barras está impresso no cartão do Vivo Chip, tem 20 números e começa com 8955, conforme o exemplo:
                    </p>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <img 
                        src="/lovable-uploads/f5d55154-a62e-475f-b8de-b65ac463b3fc.png" 
                        alt="Exemplo de código de barras do SIM card"
                        className="max-w-full h-auto"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button 
                    variant="outline"
                    onClick={handleBack}
                  >
                    Voltar
                  </Button>
                  <Button 
                    className="bg-[#8425af] hover:bg-[#6c1e8f]"
                    onClick={handleContinue}
                  >
                    Continuar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card>
              <CardContent className="pt-6 space-y-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Você precisa trocar o chip de quais linhas?</h2>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Identidade</span>
                    <span>SIM Card</span>
                    <span>Linhas</span>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">⚠️</span>
                      <p className="text-sm">Não coloque o novo chip no aparelho antes de concluir a transferência</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="font-medium">Dá pra buscar e selecionar até 10 linhas</p>
                    
                    <div className="flex gap-2">
                      <Input
                        placeholder="Número da linha com DDD"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      <Button 
                        onClick={handleAddLine}
                        className="whitespace-nowrap bg-[#8425af] hover:bg-[#6c1e8f]"
                      >
                        Selecionar linha
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">LINHAS SELECIONADAS</span>
                        <span className="text-gray-600">{selectedLines.length} DE 10</span>
                      </div>
                      
                      {selectedLines.map((line, index) => (
                        <div key={index} className="p-2 bg-gray-50 rounded">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={handleBack}
                  >
                    Voltar
                  </Button>
                  <Button 
                    className="bg-[#8425af] hover:bg-[#6c1e8f]"
                    onClick={handleContinue}
                    disabled={selectedLines.length === 0}
                  >
                    Continuar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}