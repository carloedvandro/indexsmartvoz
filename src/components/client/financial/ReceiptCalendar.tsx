
import { useState } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

export function ReceiptCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 5, 5)); // 05/06/2025
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2025, 5, 1)); // Junho 2025

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  // Dados simulados para os dias com recebimentos
  const receivedDays = {
    1: { type: 'received', amount: 0 },
    2: { type: 'received', amount: 0 },
    3: { type: 'received', amount: 0 },
    4: { type: 'received', amount: 0 },
    5: { type: 'confirmed', amount: 1389.92 },
    6: { type: 'received', amount: 0 },
    9: { type: 'received', amount: 0 },
    10: { type: 'confirmed', amount: 1389.92 }
  };

  const getDayStyle = (day: number) => {
    const dayData = receivedDays[day as keyof typeof receivedDays];
    if (!dayData) return '';
    
    if (dayData.type === 'received') {
      return 'bg-green-500 text-white hover:bg-green-600';
    } else if (dayData.type === 'confirmed') {
      return 'bg-blue-500 text-white hover:bg-blue-600';
    }
    return '';
  };

  const renderCalendarDay = (day: number, isCurrentMonth: boolean) => {
    const dayData = receivedDays[day as keyof typeof receivedDays];
    const isSelected = selectedDate.getDate() === day && isCurrentMonth;
    
    return (
      <div
        key={day}
        className={`
          w-10 h-10 flex items-center justify-center text-sm cursor-pointer rounded
          ${!isCurrentMonth ? 'text-gray-400' : ''}
          ${isSelected ? 'ring-2 ring-blue-500' : ''}
          ${getDayStyle(day)}
        `}
        onClick={() => {
          if (isCurrentMonth) {
            setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
          }
        }}
      >
        {day}
        {dayData && dayData.amount > 0 && (
          <div className="absolute mt-6 bg-black text-white text-xs px-1 rounded opacity-0 hover:opacity-100 transition-opacity">
            {formatCurrency(dayData.amount)}
          </div>
        )}
      </div>
    );
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      const day = current.getDate();
      const isCurrentMonth = current.getMonth() === month;
      days.push(renderCalendarDay(day, isCurrentMonth));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  return (
    <div className="bg-white p-6 rounded-xl border">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Calendário de recebimento</h2>
        <p className="text-gray-600 text-sm">
          Acompanhe as cobranças recebidas e a previsão de repasse das cobranças que estão aguardando o prazo de compensação.
        </p>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-700">Recebidas</span>
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-gray-400 hover:text-gray-600">
                <Info size={16} />
              </button>
            </PopoverTrigger>
            <PopoverContent className="bg-white p-3 shadow-lg rounded-md text-sm">
              Cobranças recebidas dentro do período.
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-sm text-gray-700">Confirmadas</span>
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-gray-400 hover:text-gray-600">
                <Info size={16} />
              </button>
            </PopoverTrigger>
            <PopoverContent className="bg-white p-3 shadow-lg rounded-md text-sm">
              Cobranças recebidas dentro do período, mas que estão aguardando o repasse.
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <ChevronLeft size={20} />
          </button>
          
          <h3 className="text-lg font-medium">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
          
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 relative">
          {renderCalendar()}
        </div>
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
              </svg>
            </div>
            <span className="text-sm font-medium">{formatDate(selectedDate)}</span>
          </div>
          
          <button className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-700">
            Extrato
            <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="mt-3 flex items-center gap-3">
          <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <div>
            <div className="text-sm text-gray-600">Cobranças recebidas</div>
            <div className="text-lg font-semibold text-gray-800">{formatCurrency(1389.92)}</div>
          </div>
          <button className="ml-auto text-gray-400 hover:text-gray-600">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
