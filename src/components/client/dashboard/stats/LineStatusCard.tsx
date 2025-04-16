
import { Clock, PhoneOff, Smartphone } from "lucide-react";
import { Card } from "@/components/ui/card";

export function LineStatusCard() {
  // No futuro, esses dados viriam de uma API
  const totalLines = 1;
  const activeLines = 1;
  const inactiveLines = 0;

  return (
    <Card className="p-5 shadow-sm">
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
      <p className="text-sm text-gray-500 mb-5">Visualize o total de linhas de sua operadora.</p>
      
      <div className="flex justify-between gap-4">
        <div className="flex-1 bg-purple-100 rounded-lg p-4 flex flex-col items-center">
          <div className="w-12 h-12 flex items-center justify-center bg-purple-500 rounded-full mb-3">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <span className="text-sm text-gray-600 mb-1">Totais</span>
          <span className="text-2xl font-bold text-purple-600">{totalLines}</span>
        </div>
        
        <div className="flex-1 bg-green-100 rounded-lg p-4 flex flex-col items-center">
          <div className="w-12 h-12 flex items-center justify-center bg-green-500 rounded-full mb-3">
            <Smartphone className="h-6 w-6 text-white" />
          </div>
          <span className="text-sm text-gray-600 mb-1">Ativas</span>
          <span className="text-2xl font-bold text-green-600">{activeLines}</span>
        </div>
        
        <div className="flex-1 bg-red-100 rounded-lg p-4 flex flex-col items-center">
          <div className="w-12 h-12 flex items-center justify-center bg-red-500 rounded-full mb-3">
            <PhoneOff className="h-6 w-6 text-white" />
          </div>
          <span className="text-sm text-gray-600 mb-1">Inativas</span>
          <span className="text-2xl font-bold text-red-600">{inactiveLines}</span>
        </div>
      </div>
    </Card>
  );
}
