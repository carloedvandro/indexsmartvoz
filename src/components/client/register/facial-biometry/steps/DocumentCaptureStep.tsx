
import { useRef, useState, useCallback, useEffect } from "react";
import { Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Webcam from "react-webcam";
import { supabase } from "@/integrations/supabase/client";

interface DocumentCaptureStepProps {
  onNext: (imageSrc: string) => void;
  selectedDocType: 'rg' | 'cnh';
  isBackSide?: boolean;
  videoConstraints: {
    width: number;
    height: number;
    facingMode: string;
  };
}

export const DocumentCaptureStep = ({ 
  onNext, 
  selectedDocType, 
  isBackSide = false,
  videoConstraints 
}: DocumentCaptureStepProps) => {
  const [isDocumentDetected, setIsDocumentDetected] = useState(false);
  const [lastCaptureTime, setLastCaptureTime] = useState(0);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const { toast } = useToast();
  const captureThrottleMs = 1000; // Minimum time between captures

  const checkDocumentPosition = useCallback(() => {
    if (!webcamRef.current || !isVideoReady) return;
    
    const video = webcamRef.current.video;
    if (!video || !video.videoWidth || !video.videoHeight) return;

    // Create a canvas to analyze the video frame
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    // Get the image data from the center region
    const centerRegion = context.getImageData(
      Math.floor(video.videoWidth * 0.25),
      Math.floor(video.videoHeight * 0.25),
      Math.floor(video.videoWidth * 0.5),
      Math.floor(video.videoHeight * 0.5)
    );

    // Simple detection based on contrast and brightness
    let totalBrightness = 0;
    let edgeCount = 0;

    for (let i = 0; i < centerRegion.data.length; i += 4) {
      const r = centerRegion.data[i];
      const g = centerRegion.data[i + 1];
      const b = centerRegion.data[i + 2];
      
      // Calculate brightness
      const brightness = (r + g + b) / 3;
      totalBrightness += brightness;

      // Check for edges (high contrast)
      if (i > 0 && Math.abs(brightness - ((centerRegion.data[i - 4] + centerRegion.data[i - 3] + centerRegion.data[i - 2]) / 3)) > 30) {
        edgeCount++;
      }
    }

    const avgBrightness = totalBrightness / (centerRegion.data.length / 4);
    const isDetected = avgBrightness > 50 && edgeCount > (centerRegion.data.length / 4) * 0.1;
    
    setIsDocumentDetected(isDetected);

    // Trigger capture if document is detected and enough time has passed
    if (isDetected && Date.now() - lastCaptureTime > captureThrottleMs) {
      handleDocumentCapture();
    }
  }, [lastCaptureTime, isVideoReady]);

  useEffect(() => {
    const interval = setInterval(checkDocumentPosition, 200);
    return () => clearInterval(interval);
  }, [checkDocumentPosition]);

  const handleDocumentCapture = async () => {
    if (!webcamRef.current || !isDocumentDetected) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      toast({
        title: "Erro na Captura",
        description: "Não foi possível capturar a imagem do documento. Por favor, tente novamente.",
        variant: "destructive",
      });
      return;
    }

    setLastCaptureTime(Date.now());

    try {
      // Upload image to Supabase Storage
      const file = await fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => new File([blob], `document-${Date.now()}.jpg`, { type: 'image/jpeg' }));

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(`${selectedDocType}/${isBackSide ? 'back' : 'front'}/${Date.now()}.jpg`, file);

      if (uploadError) throw uploadError;

      // Create document capture record
      const { error: dbError } = await supabase
        .from('document_captures')
        .insert({
          document_type: selectedDocType,
          side: isBackSide ? 'back' : 'front',
          image_url: uploadData.path
        });

      if (dbError) throw dbError;

      onNext(imageSrc);
    } catch (error) {
      console.error('Error saving document capture:', error);
      toast({
        title: "Erro ao Salvar",
        description: "Ocorreu um erro ao salvar a imagem do documento. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleUserMedia = () => {
    setIsVideoReady(true);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">
        Captura de Documento - {isBackSide ? 'Verso' : 'Frente'}
      </h2>
      <p className="text-gray-600 text-center">
        Alinhe seu {selectedDocType === 'rg' ? 'RG' : 'CNH'} dentro da área demarcada
      </p>
      <div className={`relative mx-auto ${isBackSide ? 'w-[300px] h-[400px]' : 'w-[400px] h-[300px]'}`}>
        <div className={`absolute inset-0 border-2 ${isDocumentDetected ? 'border-green-500' : 'border-primary'} rounded-lg z-10 transition-colors duration-300`}></div>
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            ...videoConstraints,
            aspectRatio: isBackSide ? 3/4 : 4/3
          }}
          onUserMedia={handleUserMedia}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute left-1/2 top-0 w-[2px] h-full bg-primary/30 -translate-x-1/2"></div>
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-primary/30 -translate-y-1/2"></div>
          <div className="absolute left-0 top-0 w-8 h-8 border-t-2 border-l-2 border-white"></div>
          <div className="absolute right-0 top-0 w-8 h-8 border-t-2 border-r-2 border-white"></div>
          <div className="absolute left-0 bottom-0 w-8 h-8 border-b-2 border-l-2 border-white"></div>
          <div className="absolute right-0 bottom-0 w-8 h-8 border-b-2 border-r-2 border-white"></div>
        </div>
      </div>
    </div>
  );
};
