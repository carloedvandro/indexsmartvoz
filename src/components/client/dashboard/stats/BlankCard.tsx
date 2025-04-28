
import { Card } from "@/components/ui/card";
import { BadgeDollarSign } from "lucide-react";

export function BlankCard() {
  return (
    <Card className="h-[100px] w-full bg-white shadow-sm p-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">Total de rendimentos</h3>
          <p className="text-sm text-gray-700 font-medium">R$ 179.542,00</p>
        </div>
        <div className="bg-indigo-100 p-3 rounded-full">
          <BadgeDollarSign className="text-indigo-600 h-6 w-6" />
        </div>
      </div>
    </Card>
  );
}
