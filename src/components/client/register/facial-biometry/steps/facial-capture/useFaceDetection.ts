
import { useState, useEffect, RefObject } from "react";
import Webcam from "react-webcam";

export const useFaceDetection = (
  webcamRef: RefObject<Webcam>,
  isProcessing: boolean,
  cameraActive: boolean
) => {
  const [faceDetected, setFaceDetected] = useState(false);

  const checkFace = async (imageData: ImageData) => {
    // Enhanced face detection logic
    const data = imageData.data;
    let skinTonePixels = 0;
    const totalPixels = data.length / 4;
    const threshold = 0.12; // Adjust threshold for better detection

    // Focus on central part of the image where face is likely to be
    const centerX = imageData.width / 2;
    const centerY = imageData.height / 2;
    const radius = Math.min(imageData.width, imageData.height) * 0.3;
    
    for (let y = 0; y < imageData.height; y++) {
      for (let x = 0; x < imageData.width; x++) {
        // Calculate distance from center
        const distanceFromCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        
        // Only check pixels within the expected face oval
        if (distanceFromCenter <= radius) {
          const index = (y * imageData.width + x) * 4;
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          
          // Improved skin tone detection
          if (
            r > 60 && g > 40 && b > 20 && // Minimum color values
            r > g && g > b && // Color relationship for skin
            Math.abs(r - g) > 15 // Contrast to detect actual skin vs background
          ) {
            skinTonePixels++;
          }
        }
      }
    }
    
    const ratio = skinTonePixels / totalPixels;
    return ratio > threshold;
  };

  useEffect(() => {
    let detectionCount = 0;
    const consecutiveDetectionsNeeded = 3; // Require multiple consecutive detections to reduce flicker
    
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
              // Focus on center area of image where face would be
              const centerX = img.width * 0.25;
              const centerY = img.height * 0.25;
              const width = img.width * 0.5;
              const height = img.height * 0.5;
              
              const imageData = ctx.getImageData(centerX, centerY, width, height);
              
              checkFace(imageData).then(detected => {
                if (detected) {
                  detectionCount++;
                } else {
                  detectionCount = 0;
                }
                
                // Only change state if we have several consecutive detections or non-detections
                if (detectionCount >= consecutiveDetectionsNeeded) {
                  setFaceDetected(true);
                } else if (detectionCount === 0) {
                  setFaceDetected(false);
                }
              });
            }
          };
        }
      }
    }, 200); // Faster checking for more responsive UI

    return () => clearInterval(interval);
  }, [isProcessing, cameraActive, webcamRef]);

  return { faceDetected };
};
