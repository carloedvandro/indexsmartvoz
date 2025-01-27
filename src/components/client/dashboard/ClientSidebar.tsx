import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function ClientSidebar() {
  return (
    <>
      <Sidebar className="w-40 border-r">
        <SidebarContent className="bg-white">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
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