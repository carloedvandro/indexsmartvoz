import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Camera } from "lucide-react";

export default function DocumentVersoCapture() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [message, setMessage] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    iniciarCamera();
    // Check if front document was captured
    const frontDoc = localStorage.getItem('docFrente');
    if (!frontDoc) {
      navigate('/client/document-verification');
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

  const capturarVerso = () => {
    if (!videoRef.current) return;
    
    setIsCapturing(true);
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      const imagemVerso = canvas.toDataURL('image/jpeg');
      localStorage.setItem('docVerso', imagemVerso);
      validarIA();
    }
    setIsCapturing(false);
  };

  const validarIA = () => {
    const frente = localStorage.getItem('docFrente');
    const verso = localStorage.getItem('docVerso');
    const selfie = localStorage.getItem('selfieBase64');
    const cadastro = JSON.parse(localStorage.getItem('dadosCadastrais') || '{}');

    // Simulação de IA
    const valido = frente && verso && selfie && cadastro.nome && cadastro.cpf;
    const rostoBate = true; // Simular que bateu com o rosto
    const dadosBatem = true; // Simular que CPF, nome, nascimento e mãe batem

    if (valido && rostoBate && dadosBatem) {
      // Store validation data
      localStorage.setItem('statusValidacao', 'aprovado');
      localStorage.setItem('protocoloGerado', `PROT-${Date.now()}`);
      localStorage.setItem('documentoFrente', frente);
      localStorage.setItem('documentoVerso', verso);
      
      toast({
        title: "Validação Concluída",
        description: "Documento validado com sucesso!",
      });

      // Redirect to success page first
      navigate('/client/validation-success');
    } else {
      setMessage('Validação falhou. Documento divergente. Processo bloqueado.');
      toast({
        title: "Validação Falhou",
        description: "Os dados não conferem. Processo bloqueado.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="m-0 p-0 font-sans bg-[#2f145e] text-white flex flex-col items-center justify-center min-h-screen">
      <div className="w-[360px] p-5 bg-[#3d1a7a] rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.2)] text-center">
        <h2 className="mb-4 text-xl">Escaneie seu documento</h2>
        <p className="mb-2">Posicione o RG ou CNH (verso)</p>
        
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full rounded-xl mt-2.5"
        />
        
        <button
          onClick={capturarVerso}
          disabled={isCapturing}
          className="mt-5 px-5 py-2.5 bg-white border-none rounded-lg text-[#2f145e] font-bold cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 mx-auto"
        >
          <Camera size={16} />
          {isCapturing ? "Capturando..." : "Capturar Verso"}
        </button>
        
        {message && (
          <div className="mt-3 font-bold text-[#ffd700]">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}