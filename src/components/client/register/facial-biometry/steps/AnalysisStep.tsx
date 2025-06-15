
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
    <div className="bg-white text-gray-800 p-6 relative min-h-screen flex flex-col justify-center">
      <div className="text-center space-y-6">
        <div className="flex flex-col items-center justify-center py-4">
          <div className="w-20 h-20 mb-5">
            <div className="relative w-full h-full">
              <Clock className="w-full h-full absolute text-[#8425af] animate-pulse" />
              <svg className="w-full h-full absolute" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(132,37,175,0.2)"
                  strokeWidth="5"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#8425af"
                  strokeWidth="5"
                  strokeDasharray="283"
                  strokeDashoffset={283 * (1 - progress / 100)}
                  className="transform -rotate-90 origin-center transition-all duration-300 ease-in-out"
                />
              </svg>
            </div>
          </div>
          
          <h2 className="text-xl font-medium text-gray-800">{title}</h2>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
          
          <div className="mt-5 flex gap-2 items-center">
            <div className="h-1 bg-gray-200 rounded-full w-56 overflow-hidden">
              <div 
                className="h-full bg-[#8425af] transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-600">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
