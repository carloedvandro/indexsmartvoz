
import { Card } from "@/components/ui/card";

export function BlankCard() {
  return (
    <Card className="p-6 shadow-sm w-full bg-gray-50/50 h-[140px] border border-gray-100">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-lg font-medium text-gray-400">Área em branco</h3>
      </div>
    </Card>
  );
}
