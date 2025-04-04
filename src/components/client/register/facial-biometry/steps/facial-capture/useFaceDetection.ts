
import { useState, useEffect, RefObject } from "react";
import Webcam from "react-webcam";

export const useFaceDetection = (
  webcamRef: RefObject<Webcam>,
  isProcessing: boolean,
  cameraActive: boolean
) => {
  const [faceDetected, setFaceDetected] = useState(false);

  const checkFace = async (imageData: ImageData) => {
    // Enhanced face detection logic with better low-light handling
    const data = imageData.data;
    let skinTonePixels = 0;
    const totalPixels = data.length / 4;
    
    // Lower threshold for better detection in low light conditions
    const threshold = 0.08; 

    // Focus on central part of the image where face is likely to be
    const centerX = imageData.width / 2;
    const centerY = imageData.height / 2;
    const radius = Math.min(imageData.width, imageData.height) * 0.35; // Slightly larger detection area
    
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
          
          // Improved skin tone detection with low-light adjustments
          if (
            r > 30 && g > 20 && b > 10 && // Lower minimum values for dark conditions
            r >= g && // Relaxed color relationship
            Math.abs(r - g) < 50 && // Allow for more variance in low light
            Math.max(r, g, b) - Math.min(r, g, b) < 80 // Reduced color distance for low light
          ) {
            skinTonePixels++;
          }
        }
      }
    }
    
    const ratio = skinTonePixels / totalPixels;
    console.log("Face detection ratio:", ratio, "threshold:", threshold);
    return ratio > threshold;
  };

  useEffect(() => {
    let detectionCount = 0;
    const consecutiveDetectionsNeeded = 2; // Reduced for faster response
    let noDetectionCount = 0;
    const consecutiveNoDetectionsNeeded = 3; // More stability when losing detection
    
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
              // Sample larger center area for better detection
              const centerX = img.width * 0.2; // 20% from left
              const centerY = img.height * 0.2; // 20% from top
              const width = img.width * 0.6; // 60% of width
              const height = img.height * 0.6; // 60% of height
              
              const imageData = ctx.getImageData(centerX, centerY, width, height);
              
              checkFace(imageData).then(detected => {
                if (detected) {
                  detectionCount++;
                  noDetectionCount = 0;
                } else {
                  noDetectionCount++;
                  detectionCount = 0;
                }
                
                // Only change state if we have enough consecutive detections or non-detections
                if (detectionCount >= consecutiveDetectionsNeeded && !faceDetected) {
                  console.log("Face detected after consecutive detections");
                  setFaceDetected(true);
                } else if (noDetectionCount >= consecutiveNoDetectionsNeeded && faceDetected) {
                  console.log("Face lost after consecutive non-detections");
                  setFaceDetected(false);
                }
              });
            }
          };
        }
      }
    }, 150); // Slightly faster for more responsive UI

    return () => clearInterval(interval);
  }, [isProcessing, cameraActive, webcamRef, faceDetected]);

  return { faceDetected };
};
