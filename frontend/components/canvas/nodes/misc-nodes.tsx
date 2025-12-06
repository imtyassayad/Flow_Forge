
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function ToolNode({ data }: NodeProps) {
  return (
    <Card className="min-w-[150px] border-orange-500 shadow-sm">
      <CardHeader className="p-2 pb-1 bg-orange-50/10">
        <CardTitle className="text-xs uppercase font-bold text-center">🛠️ Tool</CardTitle>
      </CardHeader>
      <CardContent className="p-2 text-xs text-center">
          {data.label as string}
          <Handle type="source" position={Position.Bottom} className="!bg-orange-500" />
      </CardContent>
    </Card>
  );
}

export function MemoryNode({ data }: NodeProps) {
  return (
    <Card className="min-w-[120px] border-green-500 shadow-sm rounded-full">
      <CardContent className="p-3 text-xs text-center font-bold flex flex-col items-center justify-center">
          💾 {data.label as string || "Memory"}
          <Handle type="source" position={Position.Bottom} className="!bg-green-500" />
      </CardContent>
    </Card>
  );
}

export function OutputNode({ data }: NodeProps) {
    return (
      <Card className="min-w-[200px] border-gray-500 shadow-sm bg-muted/50">
        <CardHeader className="p-2 pb-1">
          <CardTitle className="text-xs uppercase font-bold">🏁 Output</CardTitle>
        </CardHeader>
        <CardContent className="p-2 text-sm">
            <Handle type="target" position={Position.Left} className="!bg-blue-500" />
            <div className="min-h-[40px] whitespace-pre-wrap font-mono text-xs">
                {data.output ? String(data.output) : "Waiting for output..."}
            </div>
        </CardContent>
      </Card>
    );
  }
