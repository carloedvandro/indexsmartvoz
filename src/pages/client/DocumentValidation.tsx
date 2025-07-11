import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export default function DocumentValidation() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [message, setMessage] = useState("");

  // Check if user is authenticated
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        toast({
          title: "Erro de Autenticação",
          description: "Faça login para continuar.",
          variant: "destructive",
        });
        navigate("/client/login");
      }
    };
    checkSession();
  }, [navigate, toast]);

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const validarDocumentos = async () => {
    if (!frontFile || !backFile) {
      setMessage("Envie frente e verso do documento.");
      toast({
        title: "Documentos Incompletos",
        description: "Por favor, envie a frente e verso do documento.",
        variant: "destructive",
      });
      return;
    }

    setIsValidating(true);
    setMessage("Validando com IA...");

    try {
      // Convert files to base64
      const frontBase64 = await convertFileToBase64(frontFile);
      const backBase64 = await convertFileToBase64(backFile);

      // Store document images in localStorage
      localStorage.setItem('documentoFrente', frontBase64);
      localStorage.setItem('documentoVerso', backBase64);

      // Check for selfie
      const selfie = localStorage.getItem('selfieBase64');
      
      if (!selfie) {
        setMessage("Selfie não encontrada. Volte e refaça a biometria facial.");
        toast({
          title: "Selfie Não Encontrada",
          description: "Por favor, refaça a biometria facial.",
          variant: "destructive",
        });
        setIsValidating(false);
        return;
      }

      // Simulate document validation process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate OCR and validation logic
      const documentoValido = true;
      const dadosBatendo = true;
      const rostoBateComSelfie = true;

      if (documentoValido && dadosBatendo && rostoBateComSelfie) {
        // Store extracted document data (simulated)
        const documentoExtraido = {
          nome: "Nome do Documento", // This would come from OCR
          cpf: "123.456.789-00", // This would come from OCR
          nascimento: "01/01/1990", // This would come from OCR
          numeroDocumento: "123456789"
        };
        
        localStorage.setItem('documentoExtraido', JSON.stringify(documentoExtraido));
        localStorage.setItem('protocoloGerado', `PROT-${Date.now()}`);
        
        setMessage("Documento validado com sucesso!");
        
        toast({
          title: "Validação Concluída",
          description: "Documento validado com sucesso!",
        });

        // Wait a bit before redirecting
        setTimeout(() => {
          navigate("/client/dashboard");
        }, 2000);
        
      } else {
        setMessage("Validação falhou. Os dados não conferem com a selfie ou cadastro.");
        toast({
          title: "Validação Falhou",
          description: "Os dados não conferem com a selfie ou cadastro.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro na validação:", error);
      setMessage("Erro durante a validação. Tente novamente.");
      toast({
        title: "Erro na Validação",
        description: "Ocorreu um erro durante a validação. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#2f145e] flex flex-col items-center justify-center p-5">
      {/* Header with Logo */}
      <div className="fixed top-0 left-0 right-0 bg-[#2f145e] px-4 py-2 z-50">
        <div className="flex justify-center">
          <img 
            src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png" 
            alt="Smartvoz Logo" 
            className="h-[85px] object-contain mix-blend-multiply opacity-90 contrast-125" 
          />
        </div>
      </div>

      <Card className="bg-[#3a1c78] border-none shadow-lg w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-white text-xl">Validar Documento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="front-file" className="text-white">
              Frente do Documento
            </Label>
            <Input
              id="front-file"
              type="file"
              accept="image/*"
              onChange={(e) => setFrontFile(e.target.files?.[0] || null)}
              className="bg-white text-[#2f145e]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="back-file" className="text-white">
              Verso do Documento
            </Label>
            <Input
              id="back-file"
              type="file"
              accept="image/*"
              onChange={(e) => setBackFile(e.target.files?.[0] || null)}
              className="bg-white text-[#2f145e]"
            />
          </div>

          <Button 
            onClick={validarDocumentos}
            disabled={isValidating}
            className="w-full bg-white text-[#2f145e] hover:bg-gray-100 font-bold"
          >
            {isValidating ? "Validando..." : "Validar"}
          </Button>

          {message && (
            <div className="text-white text-base mt-4">
              {message}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}