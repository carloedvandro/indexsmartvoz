import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Trash2, ScanLine, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { BarcodeScanner } from "@/components/BarcodeScanner";

export default function ClientChipActivation() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLines, setSelectedLines] = useState<Array<{
    number: string;
    barcode?: string;
  }>>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [scanningIndex, setScanningIndex] = useState<number | null>(null);
  const [protocol, setProtocol] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleContinue = () => {
    if (currentStep === 3) {
      // Generate a protocol number when moving to confirmation
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
    if (phoneNumber && selectedLines.length < 10) {
      setSelectedLines([...selectedLines, { number: phoneNumber }]);
      setPhoneNumber("");
    }
  };

  const handleUpdateBarcode = (index: number, barcode: string) => {
    const updatedLines = [...selectedLines];
    updatedLines[index] = { ...updatedLines[index], barcode };
    setSelectedLines(updatedLines);
  };

  const handleRemoveLine = (index: number) => {
    const updatedLines = selectedLines.filter((_, i) => i !== index);
    setSelectedLines(updatedLines);
  };

  const startScanning = (index: number) => {
    setScanningIndex(index);
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
            <p className="text-2xl">Você solicitou a troca de chips</p>
            <p className="text-lg">
              Você já pode colocar o novo chip no aparelho pra fazer e usar a internet
            </p>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="py-2">Linha</th>
                  <th className="py-2">Código de barras do SIM card</th>
                </tr>
              </thead>
              <tbody>
                {selectedLines.map((line, index) => (
                  <tr key={index} className="border-t border-white/20">
                    <td className="py-2 flex items-center gap-2">
                      <Check className="text-green-400" size={16} />
                      {line.number}
                    </td>
                    <td className="py-2">{line.barcode}</td>
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
      {scanningIndex !== null && (
        <BarcodeScanner
          onResult={(result) => handleUpdateBarcode(scanningIndex, result)}
          onClose={() => setScanningIndex(null)}
        />
      )}
      
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
                        placeholder="Escolha o DDD"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      <Button 
                        onClick={handleAddLine}
                        className="whitespace-nowrap bg-[#8425af] hover:bg-[#6c1e8f]"
                      >
                        Selecionar
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">LINHAS SELECIONADAS</span>
                        <span className="text-gray-600">{selectedLines.length} DE 10</span>
                      </div>
                      
                      {selectedLines.map((line, index) => (
                        <div key={index} className="space-y-2 p-4 bg-gray-50 rounded">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-medium">Linha {line.number}</span>
                              <span className="text-gray-500 ml-4">Conta: {Math.random().toString().slice(2, 12)}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveLine(index)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                          
                          <div className="relative">
                            <Input
                              placeholder="Código de barras do SIM card"
                              value={line.barcode || ""}
                              onChange={(e) => handleUpdateBarcode(index, e.target.value)}
                              className="pr-10"
                              readOnly
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-1/2 -translate-y-1/2"
                              onClick={() => startScanning(index)}
                            >
                              <ScanLine className="h-4 w-4 text-[#8425af]" />
                            </Button>
                          </div>
                          <p className="text-sm text-gray-500">
                            O código de barras tem 20 números. {
                              line.barcode 
                                ? `Faltam ${20 - line.barcode.length}`
                                : "Faltam 20"
                            }
                          </p>
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
                    disabled={selectedLines.length === 0 || selectedLines.some(line => !line.barcode || line.barcode.length !== 20)}
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