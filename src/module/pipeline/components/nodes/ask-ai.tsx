import { type LucideProps } from "lucide-react";
import { Node } from "../ui/node";
import type { Node as NodeType } from "@xyflow/react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

type AskAiNodeProps = NodeType<
  {
    title: string;
    description: string;
    Icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  },
  "input_node"
>;

export const AskAiNode = ({ data }: AskAiNodeProps) => {
  return (
    <Node title={data.title} description={data.description} Icon={data.Icon}>
      123
    </Node>
  );
};
