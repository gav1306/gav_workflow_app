import { Handle, type HandleProps } from "@xyflow/react";

export const CustomHandle = (props: HandleProps) => {
  return (
    <Handle
      style={{
        background: "none",
        border: "none",
        width: "20px",
        height: "20px",
      }}
      {...props}
    >
      <div className="absolute border bg-primary/10 rounded-full left-0 pointer-none w-5 h-5 flex items-center justify-center">
        <div className="bg-primary animate-pulse w-3 h-3 rounded-full" />
      </div>
    </Handle>
  );
};
