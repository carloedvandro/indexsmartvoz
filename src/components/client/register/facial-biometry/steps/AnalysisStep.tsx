
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface AnalysisStepProps {
  onNext: () => void;
  title: string;
  description: string;
  step: number;
  totalSteps: number;
}

export const AnalysisStep = ({ onNext, title, description }: AnalysisStepProps) => {
  const [countdown, setCountdown] = useState(3);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progresso visual
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 30);

    // Temporizador para avançar
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(progressInterval);
        onNext();
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [countdown, onNext]);

  return (
    <div className="bg-[#8425af] text-white p-8 rounded-lg">
      <div className="text-center space-y-8">
        <div className="flex justify-center">
          <img src="/lovable-uploads/cb712966-b0ed-439a-ba83-8c50a897152e.png" alt="Vivo" className="h-8" />
        </div>
        
        <div className="flex flex-col items-center justify-center py-4">
          <div className="w-24 h-24 mb-6">
            <div className="relative w-full h-full">
              <Clock className="w-full h-full absolute text-white animate-pulse" />
              <svg className="w-full h-full absolute" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="5"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="white"
                  strokeWidth="5"
                  strokeDasharray="283"
                  strokeDashoffset={283 * (1 - progress / 100)}
                  className="transform -rotate-90 origin-center transition-all duration-300 ease-in-out"
                />
              </svg>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-base">{description}</p>
          
          <div className="mt-6 flex gap-2 items-center">
            <div className="h-1 bg-white/20 rounded-full w-64 overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-xs">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
