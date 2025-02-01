import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarcodeScanner } from "@/components/BarcodeScanner";
import { PlanSelectionStep } from "@/components/client/products/PlanSelectionStep";
import { OrderReviewStep } from "@/components/client/products/OrderReviewStep";
import { TermsStep } from "@/components/client/products/TermsStep";
import { SuccessScreen } from "@/components/client/products/SuccessScreen";

type Line = {
  id: number;
  internet: string;
  type: string;
  ddd: string;
  price: number;
  barcode?: string;
};

export default function ClientProducts() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLines, setSelectedLines] = useState<Line[]>([]);
  const [protocol, setProtocol] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [scanningIndex, setScanningIndex] = useState<number | null>(null);
  const [showChipActivation, setShowChipActivation] = useState(false);

  const handleContinue = () => {
    if (currentStep === 3) {
      const protocolNumber = new Date().getTime().toString();
      setProtocol(protocolNumber);
      setShowChipActivation(true);
      setCurrentStep(4);
    } else if (currentStep === 6) {
      setShowConfirmation(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleUnderstand = () => {
    navigate("/client/dashboard");
  };

  const startScanning = (index: number) => {
    setScanningIndex(index);
  };

  const handleUpdateBarcode = (index: number, barcode: string) => {
    const updatedLines = [...selectedLines];
    updatedLines[index] = { ...updatedLines[index], barcode };
    setSelectedLines(updatedLines);
  };

  if (showConfirmation) {
    return (
      <SuccessScreen
        selectedLines={selectedLines}
        protocol={protocol}
        onUnderstand={handleUnderstand}
        showBarcodes={true}
      />
    );
  }

  if (showChipActivation) {
    return (
      <div className="min-h-screen bg-background scrollbar-hide">
        {scanningIndex !== null && (
          <BarcodeScanner
            onResult={(result) => {
              handleUpdateBarcode(scanningIndex, result);
              setScanningIndex(null);
            }}
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
            <h1 className="text-2xl font-bold">Ativação do Chip</h1>
          </div>

          <div className="flex items-center justify-between mb-8 max-w-3xl mx-auto">
            <div className="flex items-center flex-1">
              <div className="w-8 h-8 rounded-full bg-[#8425af] text-white flex items-center justify-center">
                4
              </div>
              <div className="flex-1 h-1 bg-[#8425af] mx-2" />
            </div>
            <div className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full ${currentStep >= 5 ? 'bg-[#8425af]' : 'bg-gray-200'} text-white flex items-center justify-center`}>
                5
              </div>
              <div className={`flex-1 h-1 ${currentStep >= 5 ? 'bg-[#8425af]' : 'bg-gray-200'} mx-2`} />
            </div>
            <div className={`w-8 h-8 rounded-full ${currentStep >= 6 ? 'bg-[#8425af]' : 'bg-gray-200'} text-white flex items-center justify-center`}>
              6
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="md:col-span-2 max-w-4xl mx-auto w-full">
              <CardContent className="pt-6 space-y-8">
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold">Tenha o novo chip SIM card com você</h2>
                      <p className="text-gray-600">
                        Compre o chip pré-pago sem cadastro nas lojas de qualquer comércio. Não pode comprar nas lojas Vivo.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold">Só coloque o chip SIM card no aparelho quando concluir a troca</h2>
                      <p className="text-gray-600">
                        Assim você tem certeza de que a linha já está vinculada ao novo chip SIM card
                      </p>
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Confira como você encontra o código de barras do SIM card</h2>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">COMO ENCONTRAR?</h3>
                      <p className="text-gray-600">
                        O código de barras está impresso no cartão do Vivo Chip, tem 20 números e começa com 8955, conforme o exemplo:
                      </p>
                      
                      <div className="bg-gray-50 p-4 rounded-lg flex justify-center">
                        <img 
                          src="/lovable-uploads/56082e79-b54d-4d20-b899-b44e7edec8d6.png" 
                          alt="Exemplo de código de barras do SIM card"
                          className="w-[90%] h-auto"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <Button 
                    className="bg-[#8425af] hover:bg-[#6c1e8f] text-white"
                    onClick={handleBack}
                  >
                    Voltar
                  </Button>
                  <Button 
                    className="bg-[#8425af] hover:bg-[#6c1e8f]"
                    onClick={handleContinue}
                    disabled={currentStep === 6 && selectedLines.some(line => !line.barcode)}
                  >
                    {currentStep === 6 ? 'Finalizar' : 'Continuar'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background scrollbar-hide">
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
                <PlanSelectionStep
                  selectedLines={selectedLines}
                  setSelectedLines={setSelectedLines}
                />
              )}

              {currentStep === 2 && (
                <OrderReviewStep selectedLines={selectedLines} />
              )}

              {currentStep === 3 && <TermsStep />}

              <div className="flex justify-between">
                {currentStep > 1 && (
                  <Button 
                    className="bg-[#8425af] hover:bg-[#6c1e8f] text-white"
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
                  {currentStep === 3 ? 'Continuar para ativação do chip' : 'Continuar'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
