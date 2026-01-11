import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { CopyPlus, Trash2, type LucideProps } from "lucide-react";
import type {
  ForwardRefExoticComponent,
  PropsWithChildren,
  RefAttributes,
} from "react";

interface NodeProps extends PropsWithChildren {
  title: string;
  description: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

export const Node = ({ title, description, Icon, children }: NodeProps) => {
  const reactFlowNode = document.querySelector(".react-flow__node");
  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Card className="min-w-sm border rounded-sm py-0">
          <CardHeader className="flex items-center gap-4 p-5 border-3 bg-linear-to-b from-[#fff0f8] to-white border-white rounded-sm">
            <div className="flex items-center justify-center border-none rounded-sm bg-[#ffd5ec] p-2">
              <Icon width={30} height={30} className="text-[#510424]" />
            </div>
            <div className="flex flex-col gap-1">
              <CardTitle className="capitalize">{title}</CardTitle>
              <CardDescription className="font-light text-xs">
                {description}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent
        className="p-2 w-auto"
        side="top"
        align="end"
        sideOffset={7}
        container={reactFlowNode}
      >
        <ButtonGroup>
          <Button
            variant="outline"
            size="icon"
            className="text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 />
          </Button>
          <Button variant="outline" size="icon">
            <CopyPlus />
          </Button>
        </ButtonGroup>
      </HoverCardContent>
      <HoverCardContent
        className="min-w-sm flex flex-col gap-2 p-2"
        side="right"
        align="end"
        sideOffset={7}
        container={reactFlowNode}
      >
        <span className="text-sm">Output</span>
        <Separator />
        <Badge variant="outline">Text</Badge>
      </HoverCardContent>
    </HoverCard>
  );
};
