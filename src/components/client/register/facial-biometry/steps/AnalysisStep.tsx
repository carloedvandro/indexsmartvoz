
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface AnalysisStepProps {
  onNext: () => void;
  title: string;
  description: string;
  step: number;
  totalSteps: number;
}

export const AnalysisStep = ({ onNext, title, description, step, totalSteps }: AnalysisStepProps) => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        onNext();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, onNext]);

  return (
    <div className="bg-[#8425af] text-white p-8 rounded-lg">
      <div className="text-center space-y-8">
        <div className="flex justify-center">
          <img src="/lovable-uploads/cb712966-b0ed-439a-ba83-8c50a897152e.png" alt="Vivo" className="h-8" />
        </div>
        <p className="text-sm">Passo {step} de {totalSteps}</p>
        
        <div className="flex flex-col items-center justify-center py-4">
          <div className="w-20 h-20 mb-6">
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
                  strokeDashoffset={283 * (1 - (3 - countdown) / 3)}
                  className="transform -rotate-90 origin-center"
                />
              </svg>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-base">{description}</p>
        </div>
      </div>
    </div>
  );
};
