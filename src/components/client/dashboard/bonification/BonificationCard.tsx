
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export function BonificationCard() {
  return (
    <Card className="p-5 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Bonificações</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>
      
      <div className="flex items-center mt-4">
        <div className="p-2 bg-amber-100 rounded-md">
          <Sparkles className="h-5 w-5 text-amber-500" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-600">Total Bonificações</p>
          <p className="text-xl font-bold text-amber-500">R$ 0,00</p>
        </div>
      </div>
    </Card>
  );
}
