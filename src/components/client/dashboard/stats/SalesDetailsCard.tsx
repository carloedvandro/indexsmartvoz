import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Receipt } from "lucide-react";

export function SalesDetailsCard() {
  // Dados para o gráfico de pizza
  const pieData = [
    { name: "START 6 *GESIA", value: 300, color: "#9b87f5" },
    { name: "START 5GB + Minutos illimit.", value: 200, color: "#33C3F0" },
    { name: "START 6", value: 150, color: "#DFCCFB" },
    { name: "Outros Planos", value: 100, color: "#E5E7EB" }
  ];
  
  const totalSales = "R$ 691.526,00";
  
  return (
    <Card className="p-6 shadow-sm h-full w-full bg-white">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Detalhe das Vendas</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>
      
      <div className="flex items-center">
        <div className="w-[40%]">
          <div className="h-40 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs"
                  fill="#4B5563"
                >
                  Vendas do Mês
                </text>
                <Tooltip 
                  formatter={(value) => [`${value.toLocaleString('pt-BR')} vendas`, '']}
                  contentStyle={{
                    backgroundColor: "white", 
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    padding: "8px 12px"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="w-[60%] pl-4">
          <div className="p-2 bg-purple-100 rounded-md inline-flex mb-1">
            <Receipt className="h-5 w-5 text-purple-500" />
          </div>
          <p className="text-sm font-medium text-gray-600">Valor total de vendas</p>
          <p className="text-lg font-bold text-purple-600 mb-3">{totalSales}</p>
          
          <p className="text-sm font-medium text-gray-600 mb-2">Planos mais vendidos</p>
          <div className="grid grid-cols-2 gap-y-2">
            {pieData.map((plan, index) => (
              <div key={index} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: plan.color }}></div>
                <p className="text-xs text-gray-600">{plan.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
