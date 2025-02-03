import { Card, CardContent } from "@/components/ui/card";

interface DueDateSelectorProps {
  selectedDueDate: number | null;
  setSelectedDueDate: (date: number) => void;
}

export function DueDateSelector({ selectedDueDate, setSelectedDueDate }: DueDateSelectorProps) {
  const dueDates = [1, 5, 7, 10, 15, 20];

  return (
    <div className="flex flex-col w-full">
      <div className="mb-4 flex items-center justify-center min-h-[40px]">
        <h2 className="text-sm font-medium w-[90%] text-center whitespace-nowrap">
          Escolha a data de vencimento da sua fatura:
        </h2>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-3 gap-2">
          {dueDates.map((date) => (
            <Card 
              key={date}
              className={`cursor-pointer transition-colors h-11 flex items-center justify-center bg-white border-gray-200 ${
                selectedDueDate === date 
                  ? 'bg-[#8425af] text-white border-[#8425af]' 
                  : 'hover:bg-[#8425af] hover:text-white hover:border-[#8425af]'
              }`}
              onClick={() => setSelectedDueDate(date)}
            >
              <CardContent className="flex items-center justify-center h-full p-0">
                <span className="text-lg font-medium">{String(date).padStart(2, '0')}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}