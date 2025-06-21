
import { User, BarChart3, Gift } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlanForm } from "./PlanFormProvider";

const menuItems = [
  {
    id: 'informacoes',
    title: 'Informações',
    icon: User,
    description: 'Dados básicos do plano'
  },
  {
    id: 'niveis',
    title: 'Níveis',
    icon: BarChart3,
    description: 'Configuração de cashback'
  },
  {
    id: 'beneficios',
    title: 'Benefícios',
    icon: Gift,
    description: 'Lista de benefícios'
  }
];

export function PlanFormSidebar() {
  const { activeTab, setActiveTab } = usePlanForm();

  return (
    <div className="w-80 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                activeTab === item.id
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5",
                activeTab === item.id ? "text-blue-600" : "text-gray-400"
              )} />
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-gray-500">{item.description}</div>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
