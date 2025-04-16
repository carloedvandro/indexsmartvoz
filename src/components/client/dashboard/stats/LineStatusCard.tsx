
import { Clock, PhoneOff, Smartphone } from "lucide-react";
import { Card } from "@/components/ui/card";

export function LineStatusCard() {
  // No futuro, esses dados viriam de uma API
  const totalLines = 1;
  const activeLines = 1;
  const inactiveLines = 0;

  return (
    <Card className="p-4 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Linhas</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>
      <p className="text-sm text-gray-500 mb-3">Visualize o total de linhas de sua operadora.</p>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center rounded-lg p-3">
          <div className="mr-3 flex items-center justify-center">
            <Clock className="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Totais</p>
            <p className="text-lg font-semibold text-purple-600">{totalLines}</p>
          </div>
        </div>
        
        <div className="flex items-center rounded-lg p-3">
          <div className="mr-3 flex items-center justify-center">
            <Smartphone className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Ativas</p>
            <p className="text-lg font-semibold text-green-600">{activeLines}</p>
          </div>
        </div>
        
        <div className="flex items-center rounded-lg p-3">
          <div className="mr-3 flex items-center justify-center">
            <PhoneOff className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Inativas</p>
            <p className="text-lg font-semibold text-red-600">{inactiveLines}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
