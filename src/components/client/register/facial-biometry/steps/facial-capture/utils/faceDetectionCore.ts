
import { analyzeFace } from "./faceAnalysis";
import { FaceAnalysisResult } from "../types/faceDetectionTypes";

export const detectFaceInFrame = async (video: HTMLVideoElement): Promise<FaceAnalysisResult> => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  
  if (!context) {
    throw new Error("Could not get canvas context");
  }

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  
  return await analyzeFace(imageData);
};
