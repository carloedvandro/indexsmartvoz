
import { Card } from "@/components/ui/card";

export function ActivationsCard() {
  // No futuro, esses dados viriam de uma API
  const totalActivations = 0;
  
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const currentMonth = new Date().getMonth();
  const displayMonths = months.slice(currentMonth - 5, currentMonth + 1);
  
  return (
    <Card className="p-5 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Total Ativações</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>
      <p className="text-sm text-gray-700">{totalActivations} ICCID</p>
      
      <div className="mt-6 h-32 flex items-end justify-between">
        {displayMonths.map((month, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="h-16 w-8 bg-gray-200 rounded-t-md mb-2"></div>
            <span className="text-xs text-gray-500">{month}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
