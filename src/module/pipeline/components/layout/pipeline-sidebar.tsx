import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SIDEBAR_NODES } from "../../utils/const";

export const PipelineSidebar = () => {
  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <SidebarGroup className="p-4">
          <SidebarGroupLabel className="">Core Nodes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_NODES.map((item) => (
                <SidebarMenuItem key={item.type}>
                  <SidebarMenuButton size="lg" className="h-16 flex gap-2">
                    <div className="flex items-center justify-center border rounded-sm p-2.5 bg-[#fef5fa]">
                      <item.icon className="text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="capitalize font-medium">
                        {item.title}
                      </span>
                      <span className="text-wrap line-clamp-2 text-xs text-muted-foreground font-light">
                        {item.text}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
