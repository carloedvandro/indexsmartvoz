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
  { icon: HelpCircle, label: "Suporte", path: "/client/support" },
];

export function ClientSidebar() {
  return (
    <Sidebar className="w-56"> {/* Reduced from default width */}
      <SidebarHeader className="border-b border-border p-4">
        <img
          src="/lovable-uploads/dd13194a-ddb9-41f1-ac14-d4e483f9b1df.png"
          alt="Y-TECH Logo"
          className="h-6 w-auto object-contain" /* Added object-contain and w-auto to maintain aspect ratio */
        />
      </SidebarHeader>
      <SidebarContent>
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
  );
}