
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { formatCurrency } from "@/utils/format";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function SalesDetailsCard() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedPlanValue, setSelectedPlanValue] = useState<number | null>(null);
  const isMobile = useIsMobile();
  
  const pieData = [
    { name: "Alimentos", value: 70, color: "#4ADE80" },
    { name: "Bebidas", value: 30, color: "#F59E0B" },
  ];

  const barData = [
    { name: "Cachaça", value: 310000, color: "#38BDF8" },
    { name: "Fermentos", value: 260000, color: "#38BDF8" },
    { name: "Farinhas de ...", value: 220000, color: "#38BDF8" },
    { name: "Óleos", value: 170000, color: "#38BDF8" },
    { name: "Farinhas", value: 100000, color: "#38BDF8" },
  ];

  const sellerData = [
    { name: "Julio Lima", value: 683150, color: "#A855F7" },
    { name: "Gustavo Go...", value: 505730, color: "#A855F7" },
    { name: "Kaua Araujo", value: 281860, color: "#A855F7" },
    { name: "Estevan Sou...", value: 71750, color: "#A855F7" },
  ];
  
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
    setSelectedPlanValue(pieData[index].value);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
    setSelectedPlanValue(null);
  };

  const formatValue = (value: number) => {
    return `R$ ${(value / 1000).toFixed(2)} Mi`;
  };

  // Calculate total sum
  const totalSum = pieData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="p-6 shadow-sm h-auto min-h-[850px] w-full rounded-xl bg-white border-[1px] text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Margem por Linha Produto</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Total:</span>
          <span className="text-lg font-bold">{totalSum}%</span>
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-8">
        {/* Pie Chart Section with Legend */}
        <div className="w-full h-[280px] flex flex-col items-center">
          <div className="w-full max-w-[280px] h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={70}
                  outerRadius={95}
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke="white"
                      strokeWidth={2}
                      style={{
                        filter: activeIndex === index ? "drop-shadow(0px 0px 6px rgba(0,0,0,0.3))" : "none",
                        opacity: activeIndex === null || activeIndex === index ? 1 : 0.6,
                        transition: "all 0.3s ease"
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Margem']}
                />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ paddingTop: "20px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {pieData.map((entry, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                onMouseEnter={() => onPieEnter(null, index)}
                onMouseLeave={onPieLeave}
              >
                <div 
                  className="w-4 h-4 rounded-sm" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm font-medium">{entry.name}: {entry.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Charts Section */}
        <div className="w-full">
          <h3 className="text-lg font-bold mb-4">Margem por Grupo Produto</h3>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                <XAxis type="number" tickFormatter={formatValue} stroke="#6b7280" />
                <YAxis type="category" dataKey="name" width={100} stroke="#6b7280" />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'Valor']}
                  contentStyle={{ backgroundColor: "#fff", borderColor: "#e5e7eb" }}
                  cursor={{ fill: 'rgba(200, 200, 200, 0.1)' }}
                />
                <Bar
                  dataKey="value"
                  fill="#38BDF8"
                  radius={[0, 4, 4, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sellers Section */}
        <div className="w-full">
          <h3 className="text-lg font-bold mb-4">Margem por Vendedor e Supervisor</h3>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sellerData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                <XAxis type="number" tickFormatter={formatValue} stroke="#6b7280" />
                <YAxis type="category" dataKey="name" width={100} stroke="#6b7280" />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'Valor']}
                  contentStyle={{ backgroundColor: "#fff", borderColor: "#e5e7eb" }}
                  cursor={{ fill: 'rgba(200, 200, 200, 0.1)' }}
                />
                <Bar
                  dataKey="value"
                  fill="#A855F7"
                  radius={[0, 4, 4, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  );
}
