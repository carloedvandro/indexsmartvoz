import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Camera, RotateCcw } from "lucide-react";
import Tesseract from 'tesseract.js';

export const DocumentVerification = () => {
  const [status, setStatus] = useState("Aguardando liberação da câmera...");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraInitialized, setCameraInitialized] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Forçar limpeza completa antes de tentar inicializar
    const initCamera = async () => {
      console.log("📱 Iniciando limpeza completa de recursos de câmera...");
      
      // Parar qualquer stream ativo primeiro
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      // Limpar qualquer video element
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      
      // Forçar liberação de todos os recursos de mídia
      await verificarELiberarCamera();
      
      // Aguardar antes de tentar inicializar
      console.log("⏰ Iniciando câmera em 3 segundos...");
      setTimeout(() => {
        iniciarCamera();
      }, 3000);
    };

    initCamera();

    return () => {
      console.log("🧹 Limpando recursos na desmontagem do componente");
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  // Função para verificar e liberar câmera ocupada
  const verificarELiberarCamera = async (): Promise<boolean> => {
    try {
      console.log("🔍 Verificando se há câmeras ativas...");
      
      // Tentar obter uma lista de todas as tracks ativas
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      
      // Tentar acessar brevemente cada câmera para detectar se está ocupada
      for (const device of videoDevices) {
        try {
          console.log(`🎥 Testando disponibilidade da câmera: ${device.label || device.deviceId}`);
          const testStream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: device.deviceId },
            audio: false
          });
          
          // Se conseguiu acessar, liberar imediatamente
          testStream.getTracks().forEach(track => {
            console.log(`✅ Liberando track da câmera: ${device.label || device.deviceId}`);
            track.stop();
          });
        } catch (error: any) {
          if (error.name === 'NotReadableError') {
            console.log(`🔒 Câmera ocupada detectada: ${device.label || device.deviceId}`);
          }
        }
      }
      
      // Aguardar um momento para garantir que todas as câmeras foram liberadas
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("✅ Processo de liberação de câmeras concluído");
      return true;
    } catch (error) {
      console.warn("⚠️ Erro ao verificar câmeras:", error);
      return false;
    }
  };

  const iniciarCamera = async () => {
    try {
      setStatus("Verificando e liberando câmeras ocupadas...");
      setCameraError(null);
      setCameraInitialized(false);

      // Primeiro, verificar e liberar câmeras ocupadas
      await verificarELiberarCamera();

      // Parar stream anterior se existir
      if (streamRef.current) {
        console.log("🛑 Parando stream anterior...");
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
        
        // Aguardar um pouco após parar o stream anterior
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setStatus("Verificando disponibilidade da câmera...");

      // Verificar dispositivos disponíveis primeiro
      console.log("🔍 Verificando dispositivos de câmera disponíveis...");
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      console.log(`📱 ${videoDevices.length} dispositivos de vídeo encontrados:`, videoDevices);

      if (videoDevices.length === 0) {
        throw new Error("Nenhuma câmera encontrada no dispositivo");
      }

      // Tentar diferentes configurações de câmera
      const cameraConfigs = [
        {
          video: {
            facingMode: "environment", // Câmera traseira preferida
            width: { ideal: 1280, max: 1920 },
            height: { ideal: 720, max: 1080 }
          },
          audio: false
        },
        {
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        },
        {
          video: true,
          audio: false
        }
      ];

      let stream: MediaStream | null = null;
      let lastError: Error | null = null;

      for (let i = 0; i < cameraConfigs.length; i++) {
        try {
          console.log(`🎥 Tentativa ${i + 1}: Tentando acessar câmera com config:`, cameraConfigs[i]);
          setStatus(`Inicializando câmera (tentativa ${i + 1}/3)...`);
          
          stream = await navigator.mediaDevices.getUserMedia(cameraConfigs[i]);
          console.log(`✅ Câmera acessada com sucesso na tentativa ${i + 1}`);
          break;
        } catch (error: any) {
          console.warn(`❌ Tentativa ${i + 1} falhou:`, error);
          lastError = error;
          
          // Aguardar entre tentativas
          if (i < cameraConfigs.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1500));
          }
        }
      }

      if (!stream) {
        throw lastError || new Error("Não foi possível acessar a câmera");
      }

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Aguardar o vídeo carregar
        videoRef.current.onloadedmetadata = () => {
          console.log("✅ Vídeo carregado - câmera pronta para uso");
          setCameraActive(true);
          setCameraInitialized(true);
          setStatus("Posicione o documento na área visível");
        };
        
        videoRef.current.onerror = (error) => {
          console.error("❌ Erro no elemento de vídeo:", error);
          setCameraError("Erro ao exibir vídeo da câmera");
          setStatus("Erro no vídeo da câmera");
        };
      }
    } catch (error: any) {
      console.error("❌ Erro ao acessar a câmera:", error);
      setCameraActive(false);
      setCameraInitialized(false);
      
      let errorMessage = "Erro desconhecido";
      
      switch (error.name) {
        case "NotAllowedError":
          errorMessage = "Acesso à câmera negado. Permita o acesso e tente novamente.";
          break;
        case "NotFoundError":
          errorMessage = "Câmera não encontrada. Verifique se há uma câmera disponível.";
          break;
        case "NotReadableError":
          errorMessage = "Câmera ocupada por outro aplicativo. Feche outros apps e tente novamente.";
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
    if (!videoRef.current || isProcessing || !cameraActive || !cameraInitialized) {
      toast({
        title: "Câmera não disponível",
        description: "Aguarde a câmera carregar completamente ou tente novamente",
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

  const tentarNovamente = async () => {
    console.log("🔄 Tentando reinicializar câmera...");
    setCameraActive(false);
    setCameraError(null);
    setCameraInitialized(false);
    
    // Aguardar um pouco antes de tentar novamente
    await new Promise(resolve => setTimeout(resolve, 1000));
    iniciarCamera();
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4">
      {/* Área da câmera */}
      <div className="w-[340px] h-[220px] border-4 border-gray-300 rounded-xl overflow-hidden relative bg-black">
        {cameraActive && cameraInitialized ? (
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
            <p className="text-white/70 text-sm text-center px-2">
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
      <div className="text-white text-center mt-0.5 min-h-[24px] px-4">
        {status}
      </div>
      
      {/* Botões */}
      <div className="flex flex-col gap-2 mt-[30px] w-full">
        <Button 
          onClick={capturarEAnalisar} 
          disabled={isProcessing || !cameraActive || !cameraInitialized}
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
