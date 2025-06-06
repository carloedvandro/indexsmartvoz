
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

const data = [
  { month: "jan 2019", value: 278.25 },
  { month: "mar 2019", value: 341.23 },
  { month: "mai 2019", value: 308.53 },
  { month: "jul 2019", value: 267.30 },
  { month: "set 2019", value: 344.01 },
  { month: "nov 2019", value: 426.06 },
];

export function RevenueByMonthChart() {
  return (
    <Card className="p-6 shadow-sm w-full rounded-xl bg-[#1A1F2C] text-white">
      <CardHeader className="p-0">
        <CardTitle className="text-lg font-medium">Receita por Ano e Mês</CardTitle>
      </CardHeader>
      
      <div className="h-[300px] mt-4">
        <ChartContainer config={{}} className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <defs>
                <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9b87f5" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#9b87f5" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={true}
                dy={10}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={true}
                tickFormatter={(value) => `${value} Mi`}
                width={60}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const value = payload[0].value;
                    // Format the value based on its type
                    const formattedValue = typeof value === 'number' 
                      ? `R$ ${value.toFixed(2)} Mi`
                      : `R$ ${value} Mi`;
                    
                    return (
                      <div className="rounded-lg border bg-white p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-gray-500">
                              Valor
                            </span>
                            <span className="font-bold text-black">
                              {formattedValue}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#9b87f5"
                fill="url(#gradientArea)"
                strokeWidth={2}
                dot={{
                  r: 4,
                  fill: "#9b87f5",
                  strokeWidth: 2,
                  stroke: "#ffffff"
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </Card>
  );
}
