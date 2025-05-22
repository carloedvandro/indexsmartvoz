
import Image from "@/components/ui/image";

interface ProgressStepsProps {
  currentStep: number;
}

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
  return (
    <div className="flex items-center justify-center mb-8 max-w-3xl mx-auto">
      <div className="flex items-center mx-4">
        <div className={`flex flex-col items-center ${currentStep === 1 ? 'opacity-100' : 'opacity-70'}`}>
          <div className="w-16 h-16 mb-2">
            <Image
              src="/lovable-uploads/30feee55-907b-451b-8c97-dbdef249346b.png"
              alt="Identidade"
              className="w-full h-full"
            />
          </div>
          <span className="text-sm font-medium text-purple-800">Identidade</span>
        </div>
        
        <div className="h-1 bg-purple-300 w-16 mx-2"></div>
        
        <div className={`flex flex-col items-center ${currentStep === 2 ? 'opacity-100' : 'opacity-70'}`}>
          <div className="w-16 h-16 mb-2">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-purple-100 border-2 border-purple-600">
              <span className="text-purple-800 font-bold">SIM</span>
            </div>
          </div>
          <span className="text-sm font-medium text-purple-800">SIM Card</span>
        </div>
        
        <div className="h-1 bg-purple-300 w-16 mx-2"></div>
        
        <div className={`flex flex-col items-center ${currentStep === 3 ? 'opacity-100' : 'opacity-70'}`}>
          <div className="w-16 h-16 mb-2">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-500 font-bold">3</span>
            </div>
          </div>
          <span className="text-sm font-medium text-gray-500">Linhas</span>
        </div>
      </div>
    </div>
  );
}
