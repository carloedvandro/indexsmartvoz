import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileCheck, Camera } from "lucide-react";

export default function ValidationRequired() {
  const navigate = useNavigate();

  const handleDocumentValidation = () => {
    navigate("/client/biometric-validation", { state: { initialStep: "document-front" } });
  };

  const handleBiometricValidation = () => {
    navigate("/client/biometric-validation", { state: { initialStep: "facial" } });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-yellow-500" />
            <CardTitle>Validação Necessária</CardTitle>
          </div>
          <CardDescription>
            Para acessar sua conta, precisamos validar seus documentos e dados biométricos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-lg">Documentos</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Precisamos validar seus documentos para garantir a segurança da sua conta
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={handleDocumentValidation}
                >
                  Validar Documentos
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-green-500" />
                  <CardTitle className="text-lg">Biometria Facial</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  A validação biométrica é necessária para garantir sua identidade
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={handleBiometricValidation}
                >
                  Validar Biometria
                </Button>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}