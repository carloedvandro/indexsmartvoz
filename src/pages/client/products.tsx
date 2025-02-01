import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Check, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Line = {
  id: number;
  internet: string;
  type: string;
  ddd: string;
  price: number;
};

export default function ClientProducts() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLines, setSelectedLines] = useState<Line[]>([]);
  const [protocol, setProtocol] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const internetOptions = [
    { value: "6GB", label: "6GB" },
    { value: "15GB", label: "15GB" },
    { value: "50GB", label: "50GB" },
    { value: "100GB", label: "100GB" },
  ];

  const handleContinue = () => {
    if (currentStep === 3) {
      const protocolNumber = new Date().getTime().toString();
      setProtocol(protocolNumber);
      setShowConfirmation(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleAddLine = () => {
    if (selectedLines.length < 5) {
      setSelectedLines([
        ...selectedLines,
        {
          id: selectedLines.length + 1,
          internet: "100GB",
          type: "Nova Linha",
          ddd: "",
          price: 99.99,
        },
      ]);
    }
  };

  const handleRemoveLine = (id: number) => {
    setSelectedLines(selectedLines.filter(line => line.id !== id));
  };

  const handleUnderstand = () => {
    navigate("/client/dashboard");
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-[#8425af] text-white flex items-center justify-center p-4">
        <div className="max-w-lg w-full space-y-6">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold">Deu certo!</h2>
            <p className="text-2xl">Você solicitou a contratação dos planos</p>
            <p className="text-lg">
              Em breve nossa equipe entrará em contato para finalizar sua contratação
            </p>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="py-2">Plano</th>
                  <th className="py-2">Valor</th>
                </tr>
              </thead>
              <tbody>
                {selectedLines.map((line) => (
                  <tr key={line.id} className="border-t border-white/20">
                    <td className="py-2 flex items-center gap-2">
                      <Check className="text-green-400" size={16} />
                      {line.internet} - {line.type}
                    </td>
                    <td className="py-2">R$ {line.price.toFixed(2)}/mês</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-sm">Protocolo {protocol}</p>

          <div className="flex justify-center">
            <Button
              onClick={handleUnderstand}
              className="bg-white/20 hover:bg-white/30 text-white min-w-[200px]"
            >
              Entendi
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold">Contratação de Planos</h1>
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
          <Card>
            <CardContent className="pt-6 space-y-8">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Personalize seu pedido</h2>
                    <p className="text-gray-600">
                      Monte o plano ideal para a sua empresa. Você pode adicionar até 5 linhas personalizadas para a necessidade do seu negócio.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {selectedLines.map((line) => (
                      <div key={line.id} className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">LINHA {String(line.id).padStart(2, '0')}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveLine(line.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            Remover
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm text-gray-600">Internet</label>
                            <Select defaultValue={line.internet}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {internetOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm text-gray-600">DDD</label>
                            <Input placeholder="DDD" maxLength={2} />
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Valor da linha:</span>
                          <span className="font-medium">R$ {line.price.toFixed(2)}/mês</span>
                        </div>
                      </div>
                    ))}

                    {selectedLines.length < 5 && (
                      <Button
                        onClick={handleAddLine}
                        variant="outline"
                        className="w-full"
                      >
                        Adicionar nova linha
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Confirme seu pedido</h2>
                    <p className="text-gray-600">
                      Revise os planos selecionados e os valores antes de prosseguir
                    </p>
                  </div>

                  <div className="space-y-4">
                    {selectedLines.map((line) => (
                      <div key={line.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">Linha {String(line.id).padStart(2, '0')}</span>
                            <span className="text-gray-500 ml-2">{line.internet}</span>
                          </div>
                          <span className="font-medium">R$ {line.price.toFixed(2)}/mês</span>
                        </div>
                      </div>
                    ))}

                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex justify-between items-center font-medium">
                        <span>Total mensal:</span>
                        <span>R$ {(selectedLines.reduce((acc, line) => acc + line.price, 0)).toFixed(2)}/mês</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Termos e condições</h2>
                    <p className="text-gray-600">
                      Leia e aceite os termos antes de finalizar seu pedido
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600 space-y-4">
                      <p>
                        Ao prosseguir, você concorda com os termos de uso e política de privacidade.
                      </p>
                      <p>
                        A ativação das linhas está sujeita à análise e aprovação.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                {currentStep > 1 && (
                  <Button 
                    variant="outline"
                    onClick={handleBack}
                  >
                    Voltar
                  </Button>
                )}
                <Button 
                  className="bg-[#8425af] hover:bg-[#6c1e8f] ml-auto"
                  onClick={handleContinue}
                  disabled={selectedLines.length === 0}
                >
                  {currentStep === 3 ? 'Finalizar pedido' : 'Continuar'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}