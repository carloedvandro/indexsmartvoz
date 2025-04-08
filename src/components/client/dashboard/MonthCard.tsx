
import React from 'react';

interface MonthCardProps {
  month: string;
  day: string;
  active: boolean;
  onClick: () => void;
  upValue?: number;
  downValue?: number;
}

export function MonthCard({ 
  month, 
  day, 
  active, 
  onClick,
  upValue = 0,
  downValue = 0
}: MonthCardProps) {
  return (
    <div 
      className={`min-w-full p-4 rounded-xl text-center ${active ? 'bg-[#0E1C36] text-white' : 'bg-white text-gray-700'} shadow cursor-pointer transition-colors`}
      onClick={onClick}
    >
      <div className="font-medium">{month} {day}</div>
      <div className="flex justify-center mt-2 text-sm">
        <span className={`mr-2 ${active ? 'text-green-400' : 'text-green-500'}`}>↑ {upValue}</span>
        <span className={active ? 'text-red-400' : 'text-red-500'}>↓ {downValue}</span>
      </div>
    </div>
  );
}
