import { Card } from "@/components/ui/card";
import Image from "@/components/ui/image";

export function LineStatusCard() {
  // No futuro, esses dados viriam de uma API
  const totalLines = 1;
  const activeLines = 1;
  const inactiveLines = 0;

  return (
    <Card className="p-6 shadow-sm w-full">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-lg font-medium">Linhas</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>
      <p className="text-sm text-gray-500 mb-4">Visualize o total de linhas de sua equipe.</p>
      
      <div className="grid grid-cols-3 gap-1 -ml-[10px]">
        <div className="flex items-center space-x-1 -ml-[3px]">
          <div className="w-16 h-17 rounded-md flex items-center justify-center">
            <Image 
              src="/lovable-uploads/aa2bacf8-c5da-4ad5-bfb5-6ec14b524ae7.png" 
              alt="Linhas Totais" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="text-xs text-gray-500">Totais</p>
            <p className="text-lg font-semibold">{totalLines}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 ml-[8px]">
          <div className="w-16 h-17 rounded-md flex items-center justify-center">
            <Image 
              src="/lovable-uploads/5cd2c244-1d2c-41d6-9de7-76865f32923d.png" 
              alt="Linhas Ativas" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="text-xs text-gray-500">Ativas</p>
            <p className="text-lg font-semibold">{activeLines}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <div className="w-16 h-17 rounded-md flex items-center justify-center">
            <Image 
              src="/lovable-uploads/55a072a8-cbbf-4b4d-8546-448bcacdfd3e.png" 
              alt="Linhas Inativas" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="text-xs text-gray-500">Inativas</p>
            <p className="text-lg font-semibold">{inactiveLines}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
