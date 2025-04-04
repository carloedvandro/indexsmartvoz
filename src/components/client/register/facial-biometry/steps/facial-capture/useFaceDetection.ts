
import { useState, useEffect, RefObject } from "react";
import Webcam from "react-webcam";

export const useFaceDetection = (
  webcamRef: RefObject<Webcam>,
  isProcessing: boolean,
  cameraActive: boolean
) => {
  const [faceDetected, setFaceDetected] = useState(false);

  const checkFace = async (imageData: ImageData) => {
    // Simplified face detection - checks for skin-tone pixels in the center
    const data = imageData.data;
    let skinTonePixels = 0;
    const totalPixels = data.length / 4;
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Basic skin tone detection
      if (r > 60 && g > 40 && b > 20 && r > g && g > b) {
        skinTonePixels++;
      }
    }
    
    return (skinTonePixels / totalPixels) > 0.1;
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (webcamRef.current && !isProcessing && cameraActive) {
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
                img.width * 0.25, 
                img.height * 0.25, 
                img.width * 0.5, 
                img.height * 0.5
              );
              checkFace(imageData).then(detected => setFaceDetected(detected));
            }
          };
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isProcessing, cameraActive, webcamRef]);

  return { faceDetected };
};
