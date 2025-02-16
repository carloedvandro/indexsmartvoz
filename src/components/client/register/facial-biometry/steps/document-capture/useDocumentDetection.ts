
import { useState, useEffect } from "react";
import type Webcam from "react-webcam";

export const useDocumentDetection = (
  webcamRef: React.RefObject<Webcam>,
  isCapturing: boolean,
  captureAttempted: boolean,
  onDocumentDetected: () => Promise<void>
) => {
  const [documentDetected, setDocumentDetected] = useState(false);

  const checkForDocument = async (imageData: ImageData) => {
    const data = imageData.data;
    let edges = 0;
    const width = imageData.width;
    
    // Check for strong edges in the image
    for (let i = 0; i < data.length; i += 4) {
      if (i % (width * 4) < (width - 1) * 4) {
        const currentPixel = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const nextPixel = (data[i + 4] + data[i + 5] + data[i + 6]) / 3;
        if (Math.abs(currentPixel - nextPixel) > 30) {
          edges++;
        }
      }
    }
    
    const threshold = width * imageData.height * 0.05;
    const isDocument = edges > threshold;
    setDocumentDetected(isDocument);
    
    // Only auto-capture if document is detected and no capture has been attempted yet
    if (isDocument && !isCapturing && !captureAttempted) {
      await onDocumentDetected();
    }
    
    return isDocument;
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (webcamRef.current && !isCapturing && !captureAttempted) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          const img = new Image();
          img.src = imageSrc;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0);
              const imageData = ctx.getImageData(
                img.width * 0.1,
                img.height * 0.1,
                img.width * 0.8,
                img.height * 0.8
              );
              checkForDocument(imageData);
            }
          };
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isCapturing, captureAttempted, webcamRef, onDocumentDetected]);

  return { documentDetected };
};
