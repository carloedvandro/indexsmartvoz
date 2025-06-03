
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { UserCheck } from "lucide-react";

export default function ClientTwoFactor() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEnabled, setIsEnabled] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleEnable2FA = () => {
    setIsEnabled(true);
    toast({
      title: "Autenticação de Dois Fatores",
      description: "Autenticação de dois fatores habilitada com sucesso!",
    });
  };

  const handleDisable2FA = () => {
    setIsEnabled(false);
    toast({
      title: "Autenticação de Dois Fatores",
      description: "Autenticação de dois fatores desabilitada.",
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FE] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserCheck className="h-6 w-6 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">MEUS DADOS</p>
              <h1 className="text-2xl font-bold text-gray-900">Autenticação de Dois Fatores</h1>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="text-teal-600 border-teal-600 hover:bg-teal-50"
          >
            ← Voltar
          </Button>
        </div>

        {/* Tabs de navegação */}
        <div className="mb-6">
          <div className="flex gap-2 p-1 bg-gray-100 rounded-lg w-fit">
            <Button 
              variant="ghost" 
              className="text-gray-600 px-4 py-2"
              onClick={() => navigate("/client/profile/change-password")}
            >
              🔐 Alterar Senha
            </Button>
            <Button 
              variant="ghost" 
              className="text-gray-600 px-4 py-2"
              onClick={() => navigate("/client/profile/security-password")}
            >
              🛡️ Senha de Segurança
            </Button>
            <Button className="bg-teal-500 text-white px-4 py-2 rounded-md">
              🔒 Autenticação de Dois Fatores
            </Button>
            <Button 
              variant="ghost" 
              className="text-gray-600 px-4 py-2"
              onClick={() => navigate("/client/profile/configurations")}
            >
              ⚙️ Configurações
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-8 text-center">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-red-200 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                </div>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                A autenticação de dois fatores está{" "}
                <span className="font-semibold text-red-600">
                  {isEnabled ? "habilitada" : "desabilitada"}
                </span>
                .
              </p>
            </div>

            {!isEnabled ? (
              <Button 
                onClick={handleEnable2FA}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg"
              >
                🔒 Habilitar
              </Button>
            ) : (
              <div className="space-y-4">
                <p className="text-green-600 font-medium">
                  ✅ Autenticação de dois fatores ativa
                </p>
                <Button 
                  onClick={handleDisable2FA}
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-50"
                >
                  Desabilitar 2FA
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
