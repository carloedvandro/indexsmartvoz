
import { useState } from "react";
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
  ChevronRight,
  ChevronDown,
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
    icon: Users,
    label: "Usuários",
    submenu: [
      { icon: UserCheck, label: "Lista de Usuário", path: "/admin/users" },
      { icon: UserCheck, label: "Grupos de usuários", path: "/admin/user-groups" },
      { icon: UserCheck, label: "Árvore de referência", path: "/admin/reference-tree" },
      { icon: UserCheck, label: "Remetente de e-mail", path: "/admin/email-sender" },
    ]
  },
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
  { icon: FileText, label: "Relatórios", path: "/admin/reports" },
  { icon: HelpCircle, label: "Suporte", path: "/admin/support" },
  { icon: LogOut, label: "Sair", path: "/admin/logout" },
];

export function AdminSidebar() {
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleSubmenu = (label: string) => {
    setOpenMenus(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label) 
        : [...prev, label]
    );
  };

  const isSubmenuOpen = (label: string) => openMenus.includes(label);

  return (
    <Sidebar className="bg-sidebar border-r border-sidebar-border">
      <SidebarHeader className="flex items-center justify-between p-4 border-b border-sidebar-border bg-sidebar">
        <img
          src="/lovable-uploads/a4a911e3-a6ea-47f3-a5c0-a855aa60803b.png"
          alt="Smartvoz Logo"
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
                      <SidebarMenuButton 
                        onClick={() => toggleSubmenu(item.label)}
                        className="text-sidebar-foreground hover:text-primary transition-colors flex justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </div>
                        {isSubmenuOpen(item.label) ? (
                          <ChevronDown className="h-4 w-4 ml-1" />
                        ) : (
                          <ChevronRight className="h-4 w-4 ml-1" />
                        )}
                      </SidebarMenuButton>
                      {isSubmenuOpen(item.label) && (
                        <SidebarMenuSub>
                          {item.submenu.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.label}>
                              <SidebarMenuSubButton asChild>
                                <Link
                                  to={subItem.path}
                                  className="flex items-center gap-2 text-sidebar-foreground hover:text-primary transition-colors"
                                >
                                  <div className="flex items-center gap-2">
                                    <subItem.icon className="h-4 w-4" />
                                    <span>{subItem.label}</span>
                                  </div>
                                  <ChevronRight className="h-4 w-4 ml-auto" />
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
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
