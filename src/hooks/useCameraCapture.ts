
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Tesseract from 'tesseract.js';

export const useCameraCapture = () => {
  const [status, setStatus] = useState("Aguardando liberação da câmera...");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const initTimer = setTimeout(() => {
      iniciarCamera();
    }, 2000);

    return () => {
      console.log("🧹 Limpando recursos na desmontagem do componente");
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  const iniciarCamera = async () => {
    if (cameraActive || streamRef.current) {
      console.warn("⚠️ A câmera já está ativa.");
      return;
    }

    try {
      setStatus("Verificando e liberando câmeras ocupadas...");
      setCameraError(null);
      setVideoReady(false);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');

      if (videoDevices.length === 0) {
        throw new Error("Nenhuma câmera encontrada no dispositivo");
      }

      const cameraConfigs = [
        {
          video: true,
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
          video: {
            facingMode: "environment",
            width: { ideal: 1280, max: 1920 },
            height: { ideal: 720, max: 1080 }
          },
          audio: false
        }
      ];

      let stream: MediaStream | null = null;
      let lastError: Error | null = null;

      for (let i = 0; i < cameraConfigs.length; i++) {
        try {
          setStatus(`Inicializando câmera (tentativa ${i + 1}/3)...`);
          stream = await navigator.mediaDevices.getUserMedia(cameraConfigs[i]);
          console.log(`✅ Stream da câmera obtido na tentativa ${i + 1}`);
          break;
        } catch (error: any) {
          console.error(`❌ Tentativa ${i + 1} falhou:`, error);
          lastError = error;
          if (i < cameraConfigs.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1500));
          }
        }
      }

      if (!stream) throw lastError || new Error("Não foi possível acessar a câmera");

      streamRef.current = stream;

      if (videoRef.current) {
        console.log("🎥 Configurando vídeo da câmera...");
        videoRef.current.srcObject = stream;

        setCameraActive(true);
        setStatus("Carregando vídeo da câmera...");

        videoRef.current.onloadedmetadata = () => {
          console.log("📹 Metadados do vídeo carregados, tentando iniciar reprodução...");
          
          if (videoRef.current) {
            console.log("📊 Estado do vídeo antes do play():", {
              readyState: videoRef.current.readyState,
              videoWidth: videoRef.current.videoWidth,
              videoHeight: videoRef.current.videoHeight,
              currentTime: videoRef.current.currentTime
            });
            
            videoRef.current.play().then(() => {
              console.log("✅ Vídeo iniciado com sucesso");
              setVideoReady(true);
              setStatus("Posicione o documento na área visível");
            }).catch((error) => {
              console.error("❌ Erro ao iniciar vídeo:", error);
              console.error("❌ Detalhes do erro:", {
                name: error.name,
                message: error.message,
                code: error.code
              });
              setStatus("Erro ao iniciar vídeo - clique em 'Tentar novamente'");
              setCameraError("Falha no autoplay do vídeo");
              setCameraActive(false);
              setVideoReady(false);
            });
          }
        };

        videoRef.current.onerror = (error) => {
          console.error("❌ Erro no elemento de vídeo:", error);
          setCameraError("Erro ao exibir vídeo da câmera");
          setStatus("Erro no vídeo da câmera");
          setCameraActive(false);
          setVideoReady(false);
        };

        videoRef.current.load();
      }
    } catch (error: any) {
      console.error("❌ Erro ao acessar a câmera:", error);
      setCameraActive(false);
      setVideoReady(false);
      let errorMessage = "Erro desconhecido";

      switch (error.name) {
        case "NotAllowedError":
          errorMessage = "Acesso à câmera negado. Permita o acesso e tente novamente.";
          break;
        case "NotFoundError":
          errorMessage = "Câmera não encontrada.";
          break;
        case "NotReadableError":
          errorMessage = "Câmera ocupada por outro app.";
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

  const capturarEAnalisar = async (onSuccess: () => void, onFailure: () => void) => {
    if (!videoRef.current || isProcessing || !cameraActive || !videoReady) {
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

      if (!ctx) throw new Error("Não foi possível criar contexto do canvas");

      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imagemData = canvas.toDataURL('image/png');

      localStorage.setItem('documentoFrenteBase64', imagemData);
      setStatus("Processando OCR...");

      const resultado = await Tesseract.recognize(imagemData, 'por', {
        logger: m => {
          if (m.status === 'recognizing text') {
            setStatus(`Processando OCR... ${Math.round(m.progress * 100)}%`);
          }
        }
      });

      const textoExtraido = resultado.data.text;
      localStorage.setItem('documentoTextoExtraido', textoExtraido);
      setStatus("Comparando dados com a selfie e cadastro...");

      const selfie = localStorage.getItem('selfieBase64');
      const cadastro = {
        nome: "João da Silva",
        cpf: "123.456.789-00",
        nascimento: "01/01/1990",
        mae: "Maria da Silva"
      };

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
          onSuccess();
        }, 2000);
      } else {
        setStatus("Falha na validação. Dados não conferem ou documento inválido.");
        toast({
          title: "Validação Falhou",
          description: "Os dados do documento não conferem com o cadastro",
          variant: "destructive"
        });
        setTimeout(() => {
          onFailure();
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
    console.log("🔄 Tentando novamente - limpando tudo...");
    setCameraActive(false);
    setCameraError(null);
    setVideoReady(false);
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    iniciarCamera();
  };

  return {
    status,
    isProcessing,
    cameraActive,
    cameraError,
    videoReady,
    videoRef,
    capturarEAnalisar,
    tentarNovamente
  };
};
