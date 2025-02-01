import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ConfirmationScreenProps {
  phoneNumber: string;
  barcode: string;
  protocol: string;
}

export const ConfirmationScreen = ({ phoneNumber, barcode, protocol }: ConfirmationScreenProps) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    // Here you would typically make an API call to confirm the activation
    navigate("/client/dashboard");
  };

  return (
    <Card className="bg-[#8425af] text-white">
      <CardContent className="pt-6 space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Deu certo!</h2>
          <p className="text-xl">Você solicitou a troca de chips</p>
          
          <p className="text-lg">
            Você já pode colocar o novo chip no aparelho pra fazer e usar a internet
          </p>

          <div className="bg-[#8425af]/20 p-4 rounded-lg space-y-4">
            <div className="grid grid-cols-2 gap-4 border-b border-white/20 pb-2">
              <span>Linha</span>
              <span>Código de barras do SIM card</span>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-400" />
                <span>{phoneNumber}</span>
              </div>
              <span>{barcode}</span>
            </div>
          </div>

          <p className="text-sm">Protocolo {protocol}</p>
        </div>

        <Button 
          onClick={handleConfirm}
          className="w-full bg-white text-[#8425af] hover:bg-white/90"
        >
          Entendi
        </Button>
      </CardContent>
    </Card>
  );
};