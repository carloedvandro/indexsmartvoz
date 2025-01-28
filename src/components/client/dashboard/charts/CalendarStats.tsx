import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const CalendarStats = () => {
  const [currentDate] = useState(new Date());

  const weekDays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
  const currentMonth = format(currentDate, "MMMM", { locale: ptBR });
  
  // Generate calendar days for the current month
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold capitalize">{currentMonth}</h3>
        <div className="flex gap-2">
          <span className="px-4 py-1 rounded-full bg-[#33C3F0] text-white text-sm">
            OUTUBRO
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
        
        {getDaysInMonth().map((day, index) => (
          <div
            key={index}
            className={`
              aspect-square flex items-center justify-center rounded-full text-sm
              ${day === null ? 'invisible' : ''}
              ${day === currentDate.getDate() ? 'bg-[#33C3F0] text-white' : 'hover:bg-gray-100'}
              ${day === 2 ? 'bg-blue-100 text-blue-600' : ''}
              transition-colors duration-200 cursor-pointer
            `}
          >
            {day}
          </div>
        ))}
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#33C3F0]" />
          <span className="text-sm text-gray-600">Hoje</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-100" />
          <span className="text-sm text-gray-600">Eventos</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-100" />
          <span className="text-sm text-gray-600">Disponível</span>
        </div>
      </div>
    </div>
  );
};