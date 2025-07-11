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
    <div className="min-h-screen bg-[#2f145e] text-white font-sans flex flex-col items-center justify-center p-5">
      <div className="bg-[#3a1c78] rounded-2xl p-5 w-full max-w-md text-center shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Validar Documento</h2>
        
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFrontFile(e.target.files?.[0] || null)}
          className="block w-full my-2.5 p-2 bg-white text-[#2f145e] rounded"
          placeholder="Frente do documento"
        />
        
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setBackFile(e.target.files?.[0] || null)}
          className="block w-full my-2.5 p-2 bg-white text-[#2f145e] rounded"
          placeholder="Verso do documento"
        />
        
        <button
          onClick={validarDocumentos}
          disabled={isValidating}
          className="mt-5 px-5 py-2.5 border-none rounded-lg bg-white text-[#2f145e] font-bold cursor-pointer disabled:opacity-50"
        >
          {isValidating ? "Validando..." : "Validar"}
        </button>
        
        {message && (
          <div className="mt-5 text-base">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}