
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function ActionNode({ data }: NodeProps) {
  return (
    <Card className="min-w-[150px] shadow-sm">
      <Handle type="target" position={Position.Top} className="!bg-primary" />
      <CardHeader className="p-3 pb-2">
        <CardTitle className="text-sm font-medium">{data.label as string}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0 text-xs text-muted-foreground">
         {data.description as string || "Configured action"}
      </CardContent>
      <Handle type="source" position={Position.Bottom} className="!bg-primary" />
    </Card>
  );
}
