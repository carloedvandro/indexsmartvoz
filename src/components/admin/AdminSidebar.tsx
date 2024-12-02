import { Link } from "react-router-dom";
import {
  Home,
  Settings,
  Users,
  FileText,
  HelpCircle,
  LogOut,
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
  { icon: Home, label: "Dashboard", path: "/admin/dashboard" },
  { icon: Settings, label: "Configurações", path: "/admin/settings" },
  { icon: Users, label: "Usuários", path: "/admin/users" },
  { icon: FileText, label: "Relatórios", path: "/admin/reports" },
  { icon: HelpCircle, label: "Suporte", path: "/admin/support" },
  { icon: LogOut, label: "Sair", path: "/admin/logout" },
];

export function AdminSidebar() {
  return (
    <Sidebar className="bg-white border-r">
      <SidebarHeader className="flex items-center justify-between border-b border-border p-4 bg-white">
        <img
          src="/lovable-uploads/dd13194a-ddb9-41f1-ac14-d4e483f9b1df.png"
          alt="Y-TECH Logo"
          className="h-12 w-auto object-contain"
        />
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
  );
}
