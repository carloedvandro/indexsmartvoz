
import React from 'react';

interface DueDateSelectorProps {
  selectedDueDate: number | null;
  onDueDateChange: (date: number) => void;
}

export function DueDateSelector({ selectedDueDate, onDueDateChange }: DueDateSelectorProps) {
  const dueDateOptions = [5, 10, 15, 20, 25];

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
            onClick={() => onDueDateChange(date)}
            className={`
              px-3 py-2 text-sm font-medium rounded-lg border transition-all
              ${selectedDueDate === date
                ? 'bg-[#8425af] text-white border-[#8425af]'
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
