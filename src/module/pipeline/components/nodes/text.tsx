import { type LucideProps } from "lucide-react";
import { Node } from "../ui/node";
import type { Node as NodeType } from "@xyflow/react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

type TextNodeProps = NodeType<
  {
    title: string;
    description: string;
    Icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  },
  "input_node"
>;

export const TextNode = ({ data }: TextNodeProps) => {
  return (
    <Node title={data.title} description={data.description} Icon={data.Icon}>
      123
    </Node>
  );
};
