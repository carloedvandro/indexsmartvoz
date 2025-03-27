import { Link } from "react-router-dom";
import {
  Home,
  Settings,
  Users,
  FileText,
  HelpCircle,
  LogOut,
  ClipboardList,
  UserCheck,
  FileSpreadsheet,
  CircleDollarSign,
  PieChart,
  ShoppingBag,
  Package,
  Store,
  BarChart,
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/admin/dashboard" },
  {
    icon: ClipboardList,
    label: "Cadastros",
    submenu: [
      { icon: UserCheck, label: "Consultores", path: "/admin/consultores" },
      { icon: FileSpreadsheet, label: "Documentos", path: "/admin/documentos" },
      { icon: CircleDollarSign, label: "Pontos", path: "/admin/pontos" },
      { icon: PieChart, label: "Relatórios", path: "/admin/relatorios-cadastro" },
    ]
  },
  {
    icon: ShoppingBag,
    label: "Loja e Vendas",
    submenu: [
      { icon: Package, label: "Pedidos", path: "/admin/pedidos" },
      { icon: Store, label: "Produtos", path: "/admin/produtos" },
      { icon: Store, label: "Centros", path: "/admin/centros" },
      { icon: BarChart, label: "Relatórios", path: "/admin/relatorios-vendas" },
    ]
  },
  { icon: Settings, label: "Configurações", path: "/admin/settings" },
  { icon: Users, label: "Usuários", path: "/admin/users" },
  { icon: FileText, label: "Relatórios", path: "/admin/reports" },
  { icon: HelpCircle, label: "Suporte", path: "/admin/support" },
  { icon: LogOut, label: "Sair", path: "/admin/logout" },
];

export function AdminSidebar() {
  return (
    <Sidebar className="bg-sidebar border-r border-sidebar-border">
      <SidebarHeader className="flex items-center justify-between p-4 border-b border-sidebar-border bg-sidebar">
        <img
          src="/lovable-uploads/dd13194a-ddb9-41f1-ac14-d4e483f9b1df.png"
          alt="Y-TECH Logo"
          className="h-12 w-auto object-contain"
        />
        <SidebarTrigger className="md:hidden" />
      </SidebarHeader>
      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  {item.submenu ? (
                    <>
                      <SidebarMenuButton className="text-sidebar-foreground hover:text-primary transition-colors">
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                      <SidebarMenuSub>
                        {item.submenu.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.label}>
                            <SidebarMenuSubButton asChild>
                              <Link
                                to={subItem.path}
                                className="flex items-center gap-2 text-sidebar-foreground hover:text-primary transition-colors"
                              >
                                <subItem.icon className="h-4 w-4" />
                                <span>{subItem.label}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link 
                        to={item.path} 
                        className="flex items-center gap-2 text-sidebar-foreground hover:text-primary transition-colors"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
