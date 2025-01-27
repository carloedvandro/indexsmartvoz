import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function ClientSidebar() {
  return (
    <>
      <Sidebar className="w-0 border-none">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu />
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