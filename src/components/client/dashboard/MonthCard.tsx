
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
      <div className="font-semibold text-base text-gray-500">{month} {day}</div>
      <div className="flex justify-center mt-2 text-sm space-x-4">
        <span className="flex items-center">
          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill={active ? "#4ade80" : "#22c55e"}>
            <path d="M7 14l5-5 5 5H7z" />
          </svg>
          <span className="text-gray-500">{upValue}</span>
        </span>
        <span className="flex items-center">
          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill={active ? "#f87171" : "#ef4444"}>
            <path d="M7 10l5 5 5-5H7z" />
          </svg>
          <span className="text-gray-500">{downValue}</span>
        </span>
      </div>
    </div>
  );
}
