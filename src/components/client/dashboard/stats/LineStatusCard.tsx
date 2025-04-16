
import { Clock, PhoneIcon, Smartphone } from "lucide-react";
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
      
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center p-3 bg-purple-100 rounded-lg">
          <div className="w-10 h-10 flex items-center justify-center bg-purple-500 rounded-full mb-2">
            <Clock className="h-5 w-5 text-white" />
          </div>
          <p className="text-sm font-medium text-gray-600">Totais</p>
          <p className="text-xl font-bold text-purple-600">{totalLines}</p>
        </div>
        
        <div className="flex flex-col items-center p-3 bg-green-100 rounded-lg">
          <div className="w-10 h-10 flex items-center justify-center bg-green-500 rounded-full mb-2">
            <Smartphone className="h-5 w-5 text-white" />
          </div>
          <p className="text-sm font-medium text-gray-600">Ativas</p>
          <p className="text-xl font-bold text-green-600">{activeLines}</p>
        </div>
        
        <div className="flex flex-col items-center p-3 bg-red-100 rounded-lg">
          <div className="w-10 h-10 flex items-center justify-center bg-red-500 rounded-full mb-2">
            <PhoneIcon className="h-5 w-5 text-white" />
          </div>
          <p className="text-sm font-medium text-gray-600">Inativas</p>
          <p className="text-xl font-bold text-red-600">{inactiveLines}</p>
        </div>
      </div>
    </Card>
  );
}
