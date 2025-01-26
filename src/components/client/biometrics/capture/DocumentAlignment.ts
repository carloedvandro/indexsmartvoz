export interface AlignmentResult {
  isAligned: boolean;
  averageBrightness: number;
  contrast: number;
}

export function checkDocumentAlignment(video: HTMLVideoElement): AlignmentResult {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  if (!context) {
    return { isAligned: false, averageBrightness: 0, contrast: 0 };
  }

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const sampleWidth = canvas.width * 0.8;
  const sampleHeight = canvas.height * 0.8;
  
  const imageData = context.getImageData(
    centerX - sampleWidth / 2,
    centerY - sampleHeight / 2,
    sampleWidth,
    sampleHeight
  );

  let totalBrightness = 0;
  let minBrightness = 255;
  let maxBrightness = 0;

  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];
    const brightness = (r + g + b) / 3;
    
    totalBrightness += brightness;
    minBrightness = Math.min(minBrightness, brightness);
    maxBrightness = Math.max(maxBrightness, brightness);
  }

  const averageBrightness = totalBrightness / (sampleWidth * sampleHeight);
  const contrast = maxBrightness - minBrightness;
  const isAligned = contrast > 50 && averageBrightness > 80 && averageBrightness < 200;

  return { isAligned, averageBrightness, contrast };
}