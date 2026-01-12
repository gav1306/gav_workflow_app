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
import { NODES } from "../../utils/const";
import { DraggableNode } from "../ui/draggable-node";
import { GripVertical } from "lucide-react";
import type { VariableType } from "../../types";

export const PipelineSidebar = () => {
  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <SidebarGroup className="p-4">
          <SidebarGroupLabel>Core Nodes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NODES.map((item) => (
                <DraggableNode
                  key={item.type}
                  type={item.type}
                  title={item.title}
                  description={item.description}
                  Icon={item.Icon}
                  initialVariables={item.initialVariables as VariableType}
                  output={item.output}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      size="lg"
                      className="h-16 flex gap-2 group/item"
                    >
                      <div className="flex items-center justify-center border rounded-sm p-2.5 bg-primary/10">
                        <item.Icon className="text-primary group-hover/item:hidden" />
                        <GripVertical className="text-primary hidden group-hover/item:block" />
                      </div>
                      <div className="flex flex-col">
                        <span className="capitalize font-medium">
                          {item.title}
                        </span>
                        <span className="text-wrap line-clamp-2 text-xs text-muted-foreground font-light">
                          {item.description}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </DraggableNode>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
