import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileCheck, Camera } from "lucide-react";
import { BiometricValidation } from "@/components/client/biometrics/BiometricValidation";
import { useState } from "react";

export default function ValidationRequired() {
  const navigate = useNavigate();
  const [showBiometricValidation, setShowBiometricValidation] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-yellow-500" />
            <CardTitle>Validação Necessária</CardTitle>
          </div>
          <CardDescription>
            Para acessar sua conta, precisamos validar seus documentos e dados biométricos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Document Validation Card */}
            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-lg">Documentos</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Precisamos validar seus documentos para garantir a segurança da sua conta
                </p>
                <button
                  onClick={() => navigate("/client/document-validation")}
                  className="w-full py-2 px-4 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Validar Documentos
                </button>
              </CardContent>
            </Card>

            {/* Biometric Validation Card */}
            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-green-500" />
                  <CardTitle className="text-lg">Biometria Facial</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  A validação biométrica é necessária para garantir sua identidade
                </p>
                <button
                  onClick={() => setShowBiometricValidation(true)}
                  className="w-full py-2 px-4 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Validar Biometria
                </button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {showBiometricValidation && (
        <BiometricValidation onClose={() => setShowBiometricValidation(false)} />
      )}
    </div>
  );
}