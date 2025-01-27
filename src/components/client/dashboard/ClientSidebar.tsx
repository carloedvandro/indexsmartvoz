import { Link } from "react-router-dom";
import {
  Home,
  Megaphone,
  BookOpen,
  Calendar,
  UserPlus,
  ShoppingCart,
  Users,
  FileText,
  DollarSign,
  Wifi,
  FolderOpen,
  User,
  HelpCircle,
  ArrowUp,
} from "lucide-react";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/client/dashboard" },
  { icon: Megaphone, label: "Informativos", path: "/client/news" },
  { icon: BookOpen, label: "Meus Cursos", path: "/client/courses" },
  { icon: Calendar, label: "Eventos", path: "/client/events" },
  { icon: UserPlus, label: "Cadastrar", path: "/client/register" },
  { icon: ShoppingCart, label: "Loja Virtual", path: "/client/store" },
  { icon: Users, label: "Rede", path: "/client/network" },
  { icon: DollarSign, label: "Financeiro", path: "/client/financial" },
  { icon: User, label: "Liderança", path: "/client/leadership" },
  { icon: FileText, label: "Relatórios", path: "/client/reports" },
  { icon: Wifi, label: "MKT Digital", path: "/client/marketing" },
  { icon: FolderOpen, label: "Materiais", path: "/client/materials" },
  { icon: ArrowUp, label: "Upgrade", path: "/client/upgrade" },
  { icon: HelpCircle, label: "Suporte", path: "/client/support" },
];

export function ClientSidebar() {
  return (
    <div className="w-48 border-r bg-white">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-color-1 via-color-2 to-color-3 bg-clip-text text-transparent [text-shadow:_2px_2px_2px_rgb(0_0_0_/_20%)] animate-rainbow bg-[length:200%_auto]">
          Smartvoz
        </h1>
      </div>
      <div className="absolute bottom-2 left-1/2 max-w-full -translate-x-1/2">
        <Dock className="items-end pb-3">
          {menuItems.map((item, idx) => (
            <Link key={idx} to={item.path}>
              <DockItem className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800">
                <DockLabel>{item.label}</DockLabel>
                <DockIcon>
                  <item.icon className="h-full w-full text-neutral-600 dark:text-neutral-300" />
                </DockIcon>
              </DockItem>
            </Link>
          ))}
        </Dock>
      </div>
    </div>
  );
}