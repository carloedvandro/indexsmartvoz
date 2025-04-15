
import React from 'react';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

interface MonthCardProps {
  month: string;
  day: string;
  active: boolean;
  onClick: () => void;
  upValue?: number;
  downValue?: number;
  date?: Date;
}

export function MonthCard({ 
  month, 
  day, 
  active, 
  onClick,
  upValue = 0,
  downValue = 0,
  date
}: MonthCardProps) {
  // Format day for display
  const displayDay = date 
    ? `${day}/${month.substring(0, 3)}`
    : `${month} ${day}`;

  return (
    <div 
      className={`min-w-[140px] sm:min-w-[160px] p-4 rounded-xl text-center ${active ? 'bg-[#0E1C36] text-white' : 'bg-white text-gray-700'} shadow cursor-pointer transition-colors`}
      onClick={onClick}
    >
      <div className="font-semibold text-base text-gray-500">{displayDay}</div>
      <div className="flex justify-center mt-2.5 text-sm space-x-6">
        <span className="flex items-center">
          <ArrowUpIcon className="w-5 h-5 mr-1.5 stroke-[#22c55e] stroke-[2.5px]" />
          <span className="text-gray-500 font-medium">{upValue}</span>
        </span>
        <span className="flex items-center">
          <ArrowDownIcon className="w-5 h-5 mr-1.5 stroke-[#ef4444] stroke-[2.5px]" />
          <span className="text-gray-500 font-medium">{downValue}</span>
        </span>
      </div>
    </div>
  );
}
