import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

interface BarChartStatsProps {
  data: Array<{ 
    name: string; 
    value: number;
    previousValue: number;
  }>;
}

export const BarChartStats = ({ data }: BarChartStatsProps) => {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data} 
          margin={{ right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            {/* Rosa para Roxo */}
            <linearGradient id="colorGradient1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF69B4" stopOpacity={1} />
              <stop offset="100%" stopColor="#9b87f5" stopOpacity={0.8} />
            </linearGradient>
            {/* Laranja para Amarelo */}
            <linearGradient id="colorGradient2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F97316" stopOpacity={1} />
              <stop offset="100%" stopColor="#FFA500" stopOpacity={0.8} />
            </linearGradient>
            {/* Verde para Azul */}
            <linearGradient id="colorGradient3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00ffa3" stopOpacity={1} />
              <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0.8} />
            </linearGradient>
            {/* Roxo para Rosa */}
            <linearGradient id="colorGradient4" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D946EF" stopOpacity={1} />
              <stop offset="100%" stopColor="#FF69B4" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="rgba(238, 238, 238, 0.3)"
          />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: window.innerWidth < 768 ? 8 : 10, fill: '#666' }}
            interval={window.innerWidth < 768 ? 2 : 0}
            axisLine={{ stroke: '#E0E0E0' }}
            tickLine={{ stroke: '#E0E0E0' }}
          />
          <YAxis 
            tick={{ fontSize: window.innerWidth < 768 ? 8 : 10, fill: '#666' }}
            axisLine={{ stroke: '#E0E0E0' }}
            tickLine={{ stroke: '#E0E0E0' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              padding: '10px'
            }}
            labelStyle={{ color: '#666', fontWeight: 'bold', marginBottom: '5px' }}
            itemStyle={{ color: '#333', padding: '2px 0' }}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />
          {data.map((entry, index) => (
            <Bar
              key={`bar-${index}`}
              dataKey="value"
              data={[entry]}
              radius={[6, 6, 0, 0]}
              barSize={window.innerWidth < 768 ? 12 : 20}
              fill={`url(#colorGradient${(index % 4) + 1})`}
              style={{
                filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.1))',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (e.target) {
                  e.target.style.opacity = '0.8';
                  e.target.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (e.target) {
                  e.target.style.opacity = '1';
                  e.target.style.transform = 'translateY(0)';
                }
              }}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};