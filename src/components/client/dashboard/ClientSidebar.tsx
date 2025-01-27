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
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarTrigger,
} from "@/components/ui/sidebar";

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
    <>
      <Sidebar className="w-72 border-r">
        <SidebarHeader className="flex items-center justify-between p-4 bg-white">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-color-1 via-color-2 to-color-3 bg-clip-text text-transparent [text-shadow:_2px_2px_2px_rgb(0_0_0_/_20%)] animate-rainbow bg-[length:200%_auto]">
            Smartvoz
          </h1>
          <SidebarTrigger className="md:hidden" />
        </SidebarHeader>
        <SidebarContent className="bg-white">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <Link to={item.path} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="fixed left-4 top-4 z-50 md:hidden">
        <SidebarTrigger />
      </div>
    </>
  );
}