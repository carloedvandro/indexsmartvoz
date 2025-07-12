import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Tesseract from 'tesseract.js';

export const DocumentVerification = () => {
  const [status, setStatus] = useState("Aguardando documento...");
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    iniciarCamera();
  }, []);

  const iniciarCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: {
          facingMode: "environment", // Usa câmera traseira se disponível
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Erro ao acessar a câmera:", error);
      toast({
        title: "Erro de Câmera",
        description: "Não foi possível acessar a câmera",
        variant: "destructive",
      });
    }
  };

  const capturarEAnalisar = async () => {
    if (!videoRef.current || isProcessing) return;
    
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
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setStatus(`Processando OCR... ${Math.round(m.progress * 100)}%`);
          }
        }
      });

      const textoExtraido = resultado.data.text;
      console.log("Texto extraído:", textoExtraido);

      // Salvar texto extraído para exibir na confirmação final
      localStorage.setItem('documentoTextoExtraido', textoExtraido);

      setStatus("Comparando dados com a selfie e cadastro...");

      // Verificar se há selfie salva
      const selfie = localStorage.getItem('selfieBase64');
      
      // Dados de exemplo do cadastro (em um sistema real, isso viria da API)
      const cadastro = {
        nome: "João da Silva",
        cpf: "123.456.789-00",
        nascimento: "01/01/1990",
        mae: "Maria da Silva"
      };

      // Validação simples (em um sistema real, seria mais robusta)
      const nomeEncontrado = textoExtraido.includes("João") || textoExtraido.includes("JOÃO");
      const cpfEncontrado = textoExtraido.includes("123") || textoExtraido.includes("456") || textoExtraido.includes("789");
      const maeEncontrada = textoExtraido.includes("Maria") || textoExtraido.includes("MARIA");

      const validacaoPassou = nomeEncontrado && cpfEncontrado && maeEncontrada;

      if (selfie && validacaoPassou) {
        setStatus("Documento validado com sucesso!");
        toast({
          title: "Validação Concluída",
          description: "Documento verificado com sucesso!",
        });
        
        setTimeout(() => {
          navigate('/client/verification-complete');
        }, 2000);
      } else {
        setStatus("Falha na validação. Dados não conferem ou documento inválido.");
        toast({
          title: "Validação Falhou",
          description: "Os dados do documento não conferem com o cadastro",
          variant: "destructive",
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
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4">
      <div className="w-[340px] h-[220px] border-4 border-gray-300 rounded-xl overflow-hidden relative bg-black">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="mt-3 text-lg text-white text-center">
        Posicione o documento na área visível
      </div>
      
      <div className="text-white text-center">
        {status}
      </div>
      
      
      <Button
        onClick={capturarEAnalisar}
        disabled={isProcessing}
        className="px-4 py-4 bg-transparent backdrop-blur-sm rounded-lg border border-white/30 shadow-lg mb-4 text-white hover:bg-white/20"
      >
        {isProcessing ? "Processando..." : "Escanear documento"}
      </Button>
    </div>
  );
};