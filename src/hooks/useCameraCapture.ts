
import { useState, useRef, useEffect, useCallback } from "react";
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
  const initializationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const iniciarCamera = useCallback(async () => {
    console.log("🎬 Tentando iniciar câmera...");
    console.log("📹 Estado do videoRef:", {
      exists: !!videoRef.current,
      readyState: videoRef.current?.readyState,
      networkState: videoRef.current?.networkState
    });

    if (!videoRef.current) {
      console.error("❌ videoRef.current é null - aguardando elemento estar disponível");
      setStatus("Aguardando elemento de vídeo...");
      setCameraError("Elemento de vídeo não encontrado");
      return;
    }

    if (cameraActive || streamRef.current) {
      console.warn("⚠️ A câmera já está ativa.");
      return;
    }

    try {
      setStatus("Verificando e liberando câmeras ocupadas...");
      setCameraError(null);
      setVideoReady(false);
      setCameraActive(false);

      // Limpar qualquer stream anterior
      if (streamRef.current) {
        console.log("🧹 Limpando stream anterior...");
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      console.log("📹 Dispositivos de vídeo encontrados:", videoDevices.length);

      if (videoDevices.length === 0) {
        throw new Error("Nenhuma câmera encontrada no dispositivo");
      }

      const cameraConfigs = [
        {
          video: { 
            facingMode: "environment",
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
          setStatus(`Inicializando câmera (tentativa ${i + 1}/3)...`);
          console.log(`🎥 Tentativa ${i + 1} com config:`, cameraConfigs[i]);
          
          stream = await navigator.mediaDevices.getUserMedia(cameraConfigs[i]);
          console.log(`✅ Stream da câmera obtido na tentativa ${i + 1}`);
          console.log("📊 Detalhes do stream:", {
            active: stream.active,
            tracks: stream.getTracks().length,
            videoTracks: stream.getVideoTracks().length
          });
          break;
        } catch (error: any) {
          console.error(`❌ Tentativa ${i + 1} falhou:`, {
            name: error.name,
            message: error.message,
            constraint: error.constraint
          });
          lastError = error;
          if (i < cameraConfigs.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1500));
          }
        }
      }

      if (!stream) throw lastError || new Error("Não foi possível acessar a câmera");

      streamRef.current = stream;

      // Verificar novamente se o videoRef ainda existe após o async
      if (!videoRef.current) {
        console.error("❌ videoRef.current se tornou null durante inicialização");
        throw new Error("Elemento de vídeo foi desmontado durante inicialização");
      }

      console.log("🎥 Configurando vídeo da câmera...");
      console.log("📹 Estado do videoRef antes da configuração:", {
        exists: !!videoRef.current,
        readyState: videoRef.current.readyState,
        networkState: videoRef.current.networkState,
        paused: videoRef.current.paused
      });

      videoRef.current.srcObject = stream;
      setCameraActive(true);
      setStatus("Carregando vídeo da câmera...");

      // Event listeners para debug
      videoRef.current.oncanplay = () => {
        console.log("🎬 Evento oncanplay disparado");
      };

      videoRef.current.onloadstart = () => {
        console.log("🎬 Evento onloadstart disparado");
      };

      videoRef.current.onloadeddata = () => {
        console.log("🎬 Evento onloadeddata disparado");
      };

      videoRef.current.onloadedmetadata = () => {
        console.log("📹 Metadados do vídeo carregados");
        
        if (videoRef.current) {
          console.log("📊 Estado do vídeo após metadados:", {
            readyState: videoRef.current.readyState,
            videoWidth: videoRef.current.videoWidth,
            videoHeight: videoRef.current.videoHeight,
            currentTime: videoRef.current.currentTime,
            duration: videoRef.current.duration,
            paused: videoRef.current.paused,
            ended: videoRef.current.ended
          });
          
          // Verificar se o elemento está visível
          const rect = videoRef.current.getBoundingClientRect();
          console.log("📐 Posição do vídeo:", {
            width: rect.width,
            height: rect.height,
            visible: rect.width > 0 && rect.height > 0
          });

          console.log("🎬 Tentando iniciar reprodução do vídeo...");
          
          videoRef.current.play().then(() => {
            console.log("✅ Vídeo iniciado com sucesso");
            setVideoReady(true);
            setStatus("Posicione o documento na área visível");
          }).catch((error) => {
            console.error("❌ Erro ao iniciar vídeo:", {
              name: error.name,
              message: error.message,
              code: error.code
            });
            
            // Tentar forçar o play em alguns casos específicos
            if (error.name === 'NotAllowedError') {
              setStatus("Clique para ativar a câmera");
              setCameraError("Interação necessária para ativar câmera");
            } else {
              setStatus("Erro ao iniciar vídeo - clique em 'Tentar novamente'");
              setCameraError("Falha no autoplay do vídeo");
            }
            
            setCameraActive(false);
            setVideoReady(false);
          });
        }
      };

      videoRef.current.onerror = (error) => {
        console.error("❌ Erro no elemento de vídeo:", error);
        console.error("❌ Detalhes do erro do vídeo:", {
          error: videoRef.current?.error,
          networkState: videoRef.current?.networkState,
          readyState: videoRef.current?.readyState
        });
        setCameraError("Erro ao exibir vídeo da câmera");
        setStatus("Erro no vídeo da câmera");
        setCameraActive(false);
        setVideoReady(false);
      };

      // Forçar o load do vídeo
      console.log("🔄 Forçando load do vídeo...");
      videoRef.current.load();
    } catch (error: any) {
      console.error("❌ Erro ao acessar a câmera:", {
        name: error.name,
        message: error.message,
        constraint: error.constraint
      });
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
  }, [toast, cameraActive]);

  useEffect(() => {
    // Aguardar um momento para garantir que o componente foi montado
    initializationTimeoutRef.current = setTimeout(() => {
      console.log("🚀 Iniciando processo de inicialização da câmera");
      console.log("📹 Estado inicial do videoRef:", !!videoRef.current);
      
      if (videoRef.current) {
        iniciarCamera();
      } else {
        console.warn("⚠️ VideoRef ainda não está disponível, tentando novamente em 1s");
        setTimeout(() => {
          if (videoRef.current) {
            iniciarCamera();
          } else {
            console.error("❌ VideoRef continua indisponível após timeout");
            setStatus("Erro ao carregar elemento de vídeo");
            setCameraError("Elemento de vídeo não foi inicializado");
          }
        }, 1000);
      }
    }, 500);

    return () => {
      console.log("🧹 Limpando recursos na desmontagem do componente");
      if (initializationTimeoutRef.current) {
        clearTimeout(initializationTimeoutRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };
  }, [iniciarCamera]);

  const capturarEAnalisar = async (onSuccess: () => void, onFailure: () => void) => {
    if (!videoRef.current || isProcessing || !cameraActive || !videoReady) {
      console.warn("⚠️ Captura não disponível:", {
        videoRef: !!videoRef.current,
        isProcessing,
        cameraActive,
        videoReady
      });
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

      console.log("📸 Imagem capturada:", {
        width: canvas.width,
        height: canvas.height,
        dataLength: imagemData.length
      });

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
      console.log("📝 Texto extraído:", textoExtraido);
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

      console.log("🔍 Validação:", {
        nomeEncontrado,
        cpfEncontrado,
        maeEncontrada,
        validacaoPassou,
        temSelfie: !!selfie
      });

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
      console.error("❌ Erro durante análise:", error);
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
    setStatus("Reiniciando câmera...");
    
    if (streamRef.current) {
      console.log("🧹 Parando tracks do stream...");
      streamRef.current.getTracks().forEach(track => {
        console.log(`🛑 Parando track: ${track.kind} - ${track.label}`);
        track.stop();
      });
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      console.log("🧹 Limpando srcObject do vídeo...");
      videoRef.current.srcObject = null;
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
