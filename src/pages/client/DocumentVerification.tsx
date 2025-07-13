
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Camera, RotateCcw } from "lucide-react";
import Tesseract from 'tesseract.js';

export const DocumentVerification = () => {
  const [status, setStatus] = useState("Inicializando câmera...");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    iniciarCamera();
    
    // Cleanup ao desmontar
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const iniciarCamera = async () => {
    try {
      setStatus("Inicializando câmera...");
      setCameraError(null);

      // Parar stream anterior se existir
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const constraints = {
        video: {
          facingMode: "environment", // Câmera traseira para documentos
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 }
        },
        audio: false
      };

      console.log("🎥 Tentando acessar câmera com constraints:", constraints);

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Aguardar o vídeo carregar
        videoRef.current.onloadedmetadata = () => {
          console.log("✅ Câmera carregada com sucesso");
          setCameraActive(true);
          setStatus("Posicione o documento na área visível");
        };
        
        videoRef.current.onerror = (error) => {
          console.error("❌ Erro no elemento de vídeo:", error);
          setCameraError("Erro ao carregar vídeo da câmera");
          setStatus("Erro na câmera");
        };
      }
    } catch (error: any) {
      console.error("❌ Erro ao acessar a câmera:", error);
      setCameraActive(false);
      
      let errorMessage = "Erro desconhecido";
      
      switch (error.name) {
        case "NotAllowedError":
          errorMessage = "Acesso à câmera negado. Permita o acesso e tente novamente.";
          break;
        case "NotFoundError":
          errorMessage = "Câmera não encontrada. Verifique se há uma câmera disponível.";
          break;
        case "NotReadableError":
          errorMessage = "Câmera em uso por outro aplicativo.";
          break;
        case "OverconstrainedError":
          errorMessage = "Configuração de câmera não suportada.";
          break;
        default:
          errorMessage = `Erro de câmera: ${error.message}`;
      }
      
      setCameraError(errorMessage);
      setStatus(errorMessage);
      
      toast({
        title: "Erro de Câmera",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  const capturarEAnalisar = async () => {
    if (!videoRef.current || isProcessing || !cameraActive) {
      toast({
        title: "Câmera não disponível",
        description: "Aguarde a câmera carregar ou tente novamente",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setStatus("Capturando documento...");

    try {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error("Não foi possível criar contexto do canvas");
      }

      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imagemData = canvas.toDataURL('image/png');

      // Salvar imagem do documento
      localStorage.setItem('documentoFrenteBase64', imagemData);
      setStatus("Processando OCR...");

      // Executar OCR
      const resultado = await Tesseract.recognize(imagemData, 'por', {
        logger: m => {
          if (m.status === 'recognizing text') {
            setStatus(`Processando OCR... ${Math.round(m.progress * 100)}%`);
          }
        }
      });

      const textoExtraido = resultado.data.text;
      console.log("Texto extraído:", textoExtraido);

      // Salvar texto extraído
      localStorage.setItem('documentoTextoExtraido', textoExtraido);
      setStatus("Comparando dados com a selfie e cadastro...");

      // Verificar se há selfie salva
      const selfie = localStorage.getItem('selfieBase64');

      // Dados de exemplo do cadastro
      const cadastro = {
        nome: "João da Silva",
        cpf: "123.456.789-00",
        nascimento: "01/01/1990",
        mae: "Maria da Silva"
      };

      // Validação simples
      const nomeEncontrado = textoExtraido.includes("João") || textoExtraido.includes("JOÃO");
      const cpfEncontrado = textoExtraido.includes("123") || textoExtraido.includes("456") || textoExtraido.includes("789");
      const maeEncontrada = textoExtraido.includes("Maria") || textoExtraido.includes("MARIA");
      const validacaoPassou = nomeEncontrado && cpfEncontrado && maeEncontrada;

      if (selfie && validacaoPassou) {
        setStatus("Documento validado com sucesso!");
        toast({
          title: "Validação Concluída",
          description: "Documento verificado com sucesso!"
        });
        setTimeout(() => {
          navigate('/client/verification-complete');
        }, 2000);
      } else {
        setStatus("Falha na validação. Dados não conferem ou documento inválido.");
        toast({
          title: "Validação Falhou",
          description: "Os dados do documento não conferem com o cadastro",
          variant: "destructive"
        });
        setTimeout(() => {
          navigate('/client/verification-rejected');
        }, 2000);
      }
    } catch (error) {
      console.error("Erro durante análise:", error);
      setStatus("Erro durante processamento. Tente novamente.");
      toast({
        title: "Erro de Processamento",
        description: "Erro durante análise do documento",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const tentarNovamente = () => {
    setCameraActive(false);
    setCameraError(null);
    iniciarCamera();
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4">
      {/* Área da câmera */}
      <div className="w-[340px] h-[220px] border-4 border-gray-300 rounded-xl overflow-hidden relative bg-black">
        {cameraActive ? (
          <video 
            ref={videoRef} 
            autoPlay 
            muted 
            playsInline 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <Camera className="h-12 w-12 text-white/50 mb-2" />
            <p className="text-white/70 text-sm text-center">
              {cameraError ? "Câmera indisponível" : "Carregando câmera..."}
            </p>
          </div>
        )}
      </div>
      
      {/* Instruções */}
      <div className="mt-3 text-lg text-white text-center">
        Posicione o documento na área visível
      </div>
      
      {/* Status */}
      <div className="text-white text-center mt-0.5 min-h-[24px]">
        {status}
      </div>
      
      {/* Botões */}
      <div className="flex flex-col gap-2 mt-[30px] w-full">
        <Button 
          onClick={capturarEAnalisar} 
          disabled={isProcessing || !cameraActive}
          className="px-4 py-4 bg-transparent backdrop-blur-sm border border-white/30 shadow-lg text-white hover:bg-white/20"
        >
          {isProcessing ? "Processando..." : "Escanear documento"}
        </Button>
        
        {(cameraError || !cameraActive) && (
          <Button 
            onClick={tentarNovamente}
            variant="outline"
            className="px-4 py-2 bg-white/10 border border-white/30 text-white hover:bg-white/20"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Tentar novamente
          </Button>
        )}
      </div>
    </div>
  );
};
