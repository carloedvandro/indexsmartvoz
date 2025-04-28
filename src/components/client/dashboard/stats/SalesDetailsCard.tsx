
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { formatCurrency } from "@/utils/format";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function SalesDetailsCard() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedPlanValue, setSelectedPlanValue] = useState<number | null>(null);
  const isMobile = useIsMobile();
  
  const pieData = [
    { name: "Alimentos", value: 70, color: "#B14EF9" },
    { name: "Bebidas", value: 30, color: "#FFD700" },
  ];

  const barData = [
    { name: "Cachaça", value: 310000, color: "#B14EF9" },
    { name: "Fermentos", value: 260000, color: "#B14EF9" },
    { name: "Farinhas de ...", value: 220000, color: "#B14EF9" },
    { name: "Óleos", value: 170000, color: "#B14EF9" },
    { name: "Farinhas", value: 100000, color: "#B14EF9" },
  ];

  const sellerData = [
    { name: "Julio Lima", value: 683150, color: "#B14EF9" },
    { name: "Gustavo Go...", value: 505730, color: "#B14EF9" },
    { name: "Kaua Araujo", value: 281860, color: "#33BFFF" },
    { name: "Estevan Sou...", value: 71750, color: "#B14EF9" },
  ];
  
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const formatValue = (value: number) => {
    return `R$ ${(value / 1000).toFixed(2)} Mi`;
  };

  return (
    <Card className="p-6 shadow-sm h-auto min-h-[850px] w-full rounded-xl bg-[#0A0B45] text-white">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Margem por Linha Produto</h3>
      </div>
      
      <div className="flex flex-col items-center gap-8">
        {/* Pie Chart Section */}
        <div className="w-full max-w-[400px] h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={70}
                outerRadius={95}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke="transparent"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Charts Section */}
        <div className="w-full">
          <h3 className="text-lg font-bold mb-4">Margem por Grupo Produto</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#ffffff20" />
                <XAxis type="number" tickFormatter={formatValue} stroke="#fff" />
                <YAxis type="category" dataKey="name" width={100} stroke="#fff" />
                <Bar
                  dataKey="value"
                  fill="#B14EF9"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sellers Section */}
        <div className="w-full">
          <h3 className="text-lg font-bold mb-4">Margem por Vendedor e Supervisor</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sellerData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#ffffff20" />
                <XAxis type="number" tickFormatter={formatValue} stroke="#fff" />
                <YAxis type="category" dataKey="name" width={100} stroke="#fff" />
                <Bar
                  dataKey="value"
                  fill="#B14EF9"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  );
}
