
import React from 'react';

interface DueDateSelectorProps {
  selectedDueDate: number | null;
  onDueDateChange?: (date: number) => void;
  setSelectedDueDate?: (date: number) => void;
  selectedCardClassName?: string;
}

export function DueDateSelector({ 
  selectedDueDate, 
  onDueDateChange, 
  setSelectedDueDate,
  selectedCardClassName = "bg-[#8425af]"
}: DueDateSelectorProps) {
  const dueDateOptions = [5, 10, 15, 20, 25];

  const handleDateChange = (date: number) => {
    if (onDueDateChange) {
      onDueDateChange(date);
    }
    if (setSelectedDueDate) {
      setSelectedDueDate(date);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Data de Vencimento
      </label>
      <div className="grid grid-cols-5 gap-2">
        {dueDateOptions.map((date) => (
          <button
            key={date}
            type="button"
            onClick={() => handleDateChange(date)}
            className={`
              px-3 py-2 text-sm font-medium rounded-lg border transition-all
              ${selectedDueDate === date
                ? `${selectedCardClassName} text-white border-[#8425af]`
                : 'bg-white text-gray-700 border-gray-300 hover:border-[#8425af] hover:text-[#8425af]'
              }
            `}
          >
            {date}
          </button>
        ))}
      </div>
    </div>
  );
}
