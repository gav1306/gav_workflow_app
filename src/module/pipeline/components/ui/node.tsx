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
import { Field, FieldSet } from "@/components/ui/field";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CopyPlus, Trash2, type LucideProps } from "lucide-react";
import {
  useEffect,
  useState,
  type ForwardRefExoticComponent,
  type PropsWithChildren,
  type RefAttributes,
} from "react";
import type { OutputTypes } from "../../types";
import { OUTPUT_TYPE_LABELS } from "../../utils/const";

interface NodeProps extends PropsWithChildren {
  title: string;
  description: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  name: string;
  output: { name: string; type: OutputTypes }[];
}

export const Node = ({
  title,
  description,
  Icon,
  name,
  output,
  children,
}: NodeProps) => {
  const [reactFlowNode, setReactFlowNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const node = document.querySelector(".react-flow__node") as HTMLElement;
    setReactFlowNode(node);
  }, []);

  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Card className="w-sm border rounded-sm py-0">
          <CardHeader className="flex items-center gap-4 px-5 pt-5 border-3 bg-linear-to-b from-[#fff0f8] to-white border-white rounded-sm">
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
          <CardContent className="pb-6">
            <div>
              <FieldSet>
                <Field>
                  <Input
                    readOnly
                    className="bg-primary/10 text-primary"
                    value={name}
                  />
                </Field>
                {children}
              </FieldSet>
            </div>
          </CardContent>
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
      {!!output.length && (
        <HoverCardContent
          className="max-w-sm flex flex-col gap-2 p-2"
          side="right"
          align="end"
          sideOffset={7}
          container={reactFlowNode}
        >
          <span className="text-sm">Output</span>
          <Separator />
          <div className="flex flex-wrap gap-2">
            {output.map((opt, index) => {
              return (
                <Badge
                  key={`${opt.name}-${opt.type}-${index}`}
                  variant="outline"
                  className="border-primary text-primary"
                >
                  {opt.name} : {OUTPUT_TYPE_LABELS[opt.type]}
                </Badge>
              );
            })}
          </div>
        </HoverCardContent>
      )}
    </HoverCard>
  );
};
