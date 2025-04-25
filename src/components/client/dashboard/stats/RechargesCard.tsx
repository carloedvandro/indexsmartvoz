
import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { useMemo } from "react";

export function RechargesCard() {
  const monthlyData = [
    { name: "Jan", value: 13500 },
    { name: "Fev", value: 14200 },
    { name: "Mar", value: 13800 },
    { name: "Abr", value: 14500 },
    { name: "Mai", value: 14100 },
    { name: "Jun", value: 15200 },
    { name: "Jul", value: 14800 },
    { name: "Ago", value: 15500 },
    { name: "Set", value: 15100 },
    { name: "Out", value: 16200 },
    { name: "Nov", value: 15800 },
    { name: "Dez", value: 16500 }
  ];
  
  // Calcular valores acumulados
  const chartData = useMemo(() => {
    let accumulatedValue = 0;
    return monthlyData.map(item => {
      accumulatedValue += item.value;
      return {
        name: item.name,
        value: accumulatedValue,
        monthlyValue: item.value  // Mantemos o valor mensal para o tooltip
      };
    });
  }, []);
  
  const fullMonthNames = {
    "Jan": "Janeiro",
    "Fev": "Fevereiro",
    "Mar": "Março",
    "Abr": "Abril",
    "Mai": "Maio",
    "Jun": "Junho",
    "Jul": "Julho",
    "Ago": "Agosto",
    "Set": "Setembro",
    "Out": "Outubro",
    "Nov": "Novembro",
    "Dez": "Dezembro"
  };
  
  // Calcular o total final
  const totalRecharges = chartData[chartData.length - 1]?.value || 0;
  
  return (
    <Card className="p-6 shadow-sm h-full w-full">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-lg font-bold">Total de recargas pagas</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>
      <p className="text-sm text-gray-700 font-medium">{totalRecharges.toLocaleString('pt-BR')} ICCID's</p>
      
      <div className="mt-3 h-32">
        <ChartContainer config={{}} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={chartData} 
              margin={{ top: 5, right: 30, left: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="rechargeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4ADE80" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 10 }}
                dy={10}
                padding={{ left: 10, right: 30 }}
                interval={0}
              />
              <YAxis 
                hide={true}
                domain={['auto', 'auto']}
              />
              <ChartTooltip 
                content={({ active, payload, label }) => (
                  <ChartTooltipContent
                    active={active}
                    payload={payload}
                    label={label}
                    hideIndicator={true}
                    labelFormatter={(name) => fullMonthNames[name] || name}
                    formatter={(value, name, entry) => {
                      // Exibir valor mensal e acumulado no tooltip
                      if (entry && entry.payload) {
                        const monthlyValue = entry.payload.monthlyValue;
                        const accumulatedValue = entry.payload.value;
                        
                        return [
                          <>
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold">
                                {`R$ ${monthlyValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} no mês`}
                              </span>
                              <span className="text-sm font-bold text-green-500">
                                {`R$ ${accumulatedValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} acumulado`}
                              </span>
                            </div>
                          </>,
                          ''
                        ];
                      }
                      
                      return [`R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, ''];
                    }}
                  />
                )}
              />
              <Area
                type="basis"
                dataKey="value"
                stroke="#4ADE80"
                strokeWidth={3}
                fill="url(#rechargeGradient)"
                dot={false}
                activeDot={{
                  r: 6,
                  stroke: '#4ADE80',
                  strokeWidth: 2,
                  fill: '#fff',
                  filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.2))'
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </Card>
  );
}
