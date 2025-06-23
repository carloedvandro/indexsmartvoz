
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
    <div className="p-4">
      {/* Layout responsivo: horizontal no mobile, vertical no desktop */}
      <nav className="flex md:flex-col gap-2">
        {/* Mobile: scroll horizontal se necessário */}
        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap md:w-full",
                activeTab === item.id
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 flex-shrink-0",
                activeTab === item.id ? "text-blue-600" : "text-gray-400"
              )} />
              <div className="flex flex-col items-start">
                <span className="font-medium">{item.title}</span>
                <span className={cn(
                  "text-xs hidden md:block",
                  activeTab === item.id ? "text-blue-600" : "text-gray-500"
                )}>
                  {item.description}
                </span>
              </div>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
