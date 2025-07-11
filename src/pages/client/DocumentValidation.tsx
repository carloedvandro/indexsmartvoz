import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

export default function DocumentValidation() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [message, setMessage] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);
  const [step, setStep] = useState<'front' | 'back'>('front');
  const [frontCaptured, setFrontCaptured] = useState(false);

  useEffect(() => {
    iniciarCamera();
    // Check validation status
    const selfie = localStorage.getItem('selfieBase64');
    if (!selfie) {
      navigate('/client/facial-biometry');
      return;
    }
  }, [navigate]);

  const iniciarCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setMessage('Erro ao acessar a câmera');
      toast({
        title: "Erro na Câmera",
        description: "Não foi possível acessar a câmera.",
        variant: "destructive",
      });
    }
  };

  const tirarFotoDocumento = () => {
    if (!videoRef.current) return;
    
    setIsCapturing(true);
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      const fotoBase64 = canvas.toDataURL('image/jpeg');
      
      if (step === 'front') {
        localStorage.setItem('docFrente', fotoBase64);
        setFrontCaptured(true);
        setMessage('Frente capturada! Redirecionando para capturar o verso...');
        toast({
          title: "Frente Capturada",
          description: "Redirecionando para capturar o verso do documento.",
        });
        // Redirect to verso capture page
        setTimeout(() => {
          navigate('/client/document-verso');
        }, 1500);
      } else {
        localStorage.setItem('docVerso', fotoBase64);
        validarDocumentos(fotoBase64);
      }
    }
    setIsCapturing(false);
  };

  const validarDocumentos = async (backPhoto: string) => {
    setMessage("Validando com IA...");
    
    try {
      // Get the front photo from localStorage
      const frontPhoto = localStorage.getItem('docFrente');
      
      if (!frontPhoto) {
        setMessage("Erro: Foto da frente não encontrada.");
        return;
      }

      // Check for selfie
      const selfie = localStorage.getItem('selfieBase64');
      
      if (!selfie) {
        setMessage("Selfie não encontrada. Volte e refaça a biometria facial.");
        toast({
          title: "Selfie Não Encontrada",
          description: "Por favor, refaça a biometria facial.",
          variant: "destructive",
        });
        return;
      }

      // Store document images in localStorage
      localStorage.setItem('documentoFrente', frontPhoto);
      localStorage.setItem('documentoVerso', backPhoto);

      // Simulate validation process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate OCR and validation logic
      const documentoValido = true;
      const dadosBatendo = true;
      const rostoBateComSelfie = true;

      if (documentoValido && dadosBatendo && rostoBateComSelfie) {
        // Store extracted document data (simulated)
        const documentoExtraido = {
          nome: "Nome do Documento",
          cpf: "123.456.789-00",
          nascimento: "01/01/1990",
          numeroDocumento: "123456789"
        };
        
        localStorage.setItem('documentoExtraido', JSON.stringify(documentoExtraido));
        localStorage.setItem('protocoloGerado', `PROT-${Date.now()}`);
        localStorage.setItem('statusValidacao', 'aprovado');
        
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
    }
  };

  return (
    <div className="m-0 p-0 font-sans bg-[#2f145e] text-white flex flex-col items-center justify-center min-h-screen">
      <div className="w-[360px] p-5 bg-[#3d1a7a] rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.2)] text-center">
        <h2 className="mb-4 text-xl">Escaneie seu documento</h2>
        <p className="mb-2">
          {step === 'front' 
            ? "Posicione o RG ou CNH (frente)" 
            : "Posicione o RG ou CNH (verso)"
          }
        </p>
        
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full rounded-xl mt-2.5"
        />
        
        <button
          onClick={tirarFotoDocumento}
          disabled={isCapturing}
          className="mt-5 px-5 py-2.5 bg-white border-none rounded-lg text-[#2f145e] font-bold cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 mx-auto"
        >
          <Camera size={16} />
          {isCapturing 
            ? "Capturando..." 
            : step === 'front' 
              ? "Capturar Frente" 
              : "Capturar Verso"
          }
        </button>
        
        {message && (
          <div className="mt-3 font-bold text-[#ffd700]">
            {message}
          </div>
        )}
        
        {frontCaptured && (
          <div className="mt-2 text-sm text-green-300">
            ✓ Frente capturada com sucesso
          </div>
        )}
      </div>
    </div>
  );
}