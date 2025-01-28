import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { PieChartStats } from "./PieChartStats";

export const CalendarStats = () => {
  const [currentDate] = useState(new Date());

  const weekDays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
  const currentMonth = format(currentDate, "MMMM", { locale: ptBR });
  
  const lineData = [
    { name: "01", value: 340 },
    { name: "02", value: 380 },
    { name: "03", value: 420 },
    { name: "04", value: 400 },
    { name: "05", value: 440 },
    { name: "06", value: 420 },
    { name: "07", value: 400 },
    { name: "08", value: 380 },
    { name: "09", value: 360 },
    { name: "10", value: 340 },
  ];

  const pieData = [
    { name: "Completo", value: 75, color: "#33C3F0" },
    { name: "Restante", value: 25, color: "#D3E4FD" },
  ];

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  return (
    <div className="space-y-8">
      {/* Gráfico de Linha */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#33C3F0" stopOpacity={1} />
                  <stop offset="100%" stopColor="#33C3F0" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  padding: '8px 12px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#33C3F0" 
                strokeWidth={3}
                dot={{ fill: '#33C3F0', r: 4 }}
                activeDot={{ r: 6, fill: '#33C3F0' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráficos Circulares */}
      <div className="grid grid-cols-3 gap-6">
        <div className="aspect-square">
          <PieChartStats data={pieData} title="VOCIBUS" value={75} />
        </div>
        <div className="aspect-square">
          <PieChartStats data={pieData} title="VOCIBUS" value={82} />
        </div>
        <div className="aspect-square">
          <PieChartStats data={pieData} title="VOCIBUS" value={65} />
        </div>
      </div>

      {/* Calendário */}
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
    </div>
  );
};