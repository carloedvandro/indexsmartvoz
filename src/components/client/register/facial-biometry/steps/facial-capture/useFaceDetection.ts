
import { useState, useEffect, RefObject } from "react";
import Webcam from "react-webcam";

interface FaceDetectionResult {
  faceDetected: boolean;
  facePosition: { x: number; y: number; size: number };
  faceProximity: "ideal" | "too-close" | "too-far" | "not-detected";
}

export const useFaceDetection = (
  webcamRef: RefObject<Webcam>,
  isProcessing: boolean,
  cameraActive: boolean
): FaceDetectionResult => {
  const [faceDetected, setFaceDetected] = useState(false);
  const [facePosition, setFacePosition] = useState({ x: 0, y: 0, size: 0 });
  const [faceProximity, setFaceProximity] = useState<"ideal" | "too-close" | "too-far" | "not-detected">("not-detected");

  const checkFace = async (imageData: ImageData): Promise<{detected: boolean, position: {x: number, y: number, size: number}, proximity: "ideal" | "too-close" | "too-far" | "not-detected"}> => {
    // Enhanced face detection with better position checking
    const data = imageData.data;
    let skinTonePixels = 0;
    const totalPixels = data.length / 4;
    
    // Higher threshold to prevent false positives
    const threshold = 0.12; 
    
    // Center region of interest where the face should be
    const centerX = imageData.width / 2;
    const centerY = imageData.height / 2;
    const faceRadiusX = Math.min(imageData.width, imageData.height) * 0.3; // Main face area
    const faceRadiusY = Math.min(imageData.width, imageData.height) * 0.4; // Slightly taller for face shape
    
    // Track face position
    let facePixelsSum = { x: 0, y: 0 };
    let facePixelsCount = 0;
    
    // Check skin tone in the central oval region
    for (let y = 0; y < imageData.height; y++) {
      for (let x = 0; x < imageData.width; x++) {
        // Calculate normalized elliptical distance from center
        const dx = (x - centerX) / faceRadiusX;
        const dy = (y - centerY) / faceRadiusY;
        const distanceFromCenter = Math.sqrt(dx*dx + dy*dy);
        
        // Only check pixels within the expected face oval (more strict)
        if (distanceFromCenter <= 1.0) {
          const index = (y * imageData.width + x) * 4;
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          
          // Improved skin tone detection with stricter criteria
          if (
            r > 40 && g > 30 && b > 20 && // Base minimum values for skin tones
            r > g && r > b && // Red component should be highest for skin
            Math.abs(r - g) < 40 && // Relaxed color relationship for various skin tones
            g > b && // Green usually higher than blue in skin
            Math.max(r, g, b) - Math.min(r, g, b) < 80 && // Color variance check
            r + g + b > 150 // Brightness threshold to avoid dark spots
          ) {
            skinTonePixels++;
            facePixelsSum.x += x;
            facePixelsSum.y += y;
            facePixelsCount++;
          }
        }
      }
    }
    
    const ratio = skinTonePixels / totalPixels;
    
    // Default values if no face detected
    let proximity: "ideal" | "too-close" | "too-far" | "not-detected" = "not-detected";
    let detectedFace = false;
    let facePos = { x: 0, y: 0, size: 0 };
    
    // Check if we have enough skin pixels and calculate face position
    if (ratio > threshold && facePixelsCount > 0) {
      // Calculate average position of detected skin pixels
      const avgX = facePixelsSum.x / facePixelsCount;
      const avgY = facePixelsSum.y / facePixelsCount;
      
      // Normalized face size (percentage of frame)
      const faceSize = Math.sqrt(facePixelsCount / totalPixels) * 2;
      
      // Check if the detected face center is close to the frame center
      const distanceFromFrameCenter = Math.sqrt(
        Math.pow((avgX - centerX) / centerX, 2) + 
        Math.pow((avgY - centerY) / centerY, 2)
      );
      
      // Face must be reasonably centered (within 20% of center - stricter than before)
      const isCentered = distanceFromFrameCenter < 0.2;
      
      // Update face position data
      facePos = {
        x: avgX / imageData.width,
        y: avgY / imageData.height,
        size: faceSize
      };
      
      // Determine face proximity
      if (isCentered) {
        if (faceSize > 0.6) {
          proximity = "too-close";
        } else if (faceSize < 0.3) {
          proximity = "too-far";
        } else {
          proximity = "ideal";
        }
        detectedFace = true;
      } else {
        proximity = "not-detected";
        detectedFace = false;
      }
    }
    
    return { 
      detected: detectedFace, 
      position: facePos,
      proximity: proximity 
    };
  };

  useEffect(() => {
    let detectionCount = 0;
    const consecutiveDetectionsNeeded = 3; // More stable detection
    let noDetectionCount = 0;
    const consecutiveNoDetectionsNeeded = 2;
    let lastProximity: "ideal" | "too-close" | "too-far" | "not-detected" = "not-detected";
    
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
              // Sample center area for detection - focusing on where the face should be
              const centerX = img.width * 0.15; // 15% from left
              const centerY = img.height * 0.15; // 15% from top
              const width = img.width * 0.7; // 70% of width
              const height = img.height * 0.7; // 70% of height
              
              const imageData = ctx.getImageData(centerX, centerY, width, height);
              
              checkFace(imageData).then(result => {
                if (result.detected) {
                  detectionCount++;
                  noDetectionCount = 0;
                  // Update proximity immediately for better UX
                  setFaceProximity(result.proximity);
                  lastProximity = result.proximity;
                } else {
                  noDetectionCount++;
                  detectionCount = 0;
                  lastProximity = "not-detected";
                }
                
                // Only change state if we have enough consecutive detections or non-detections
                if (detectionCount >= consecutiveDetectionsNeeded && !faceDetected) {
                  setFaceDetected(true);
                  setFacePosition(result.position);
                } else if (noDetectionCount >= consecutiveNoDetectionsNeeded && faceDetected) {
                  setFaceDetected(false);
                  setFaceProximity("not-detected");
                } else if (faceDetected) {
                  // Update position regularly when face is detected
                  setFacePosition(result.position);
                }
              });
            }
          };
        }
      }
    }, 150); // More frequent updates for smoother detection

    return () => clearInterval(interval);
  }, [isProcessing, cameraActive, webcamRef, faceDetected]);

  return { faceDetected, facePosition, faceProximity };
};
