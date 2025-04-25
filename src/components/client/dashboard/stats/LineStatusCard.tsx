
import { ScanCard } from "lucide-react";
import { Card } from "@/components/ui/card";

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
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-md flex items-center justify-center bg-purple-500 mr-3">
            <ScanCard className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Totais</p>
            <p className="text-lg font-semibold">{totalLines}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-md flex items-center justify-center bg-green-500 mr-3">
            <ScanCard className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Ativas</p>
            <p className="text-lg font-semibold">{activeLines}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-md flex items-center justify-center bg-red-500 mr-3">
            <ScanCard className="h-5 w-5 text-white" />
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
