
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function AgentNode({ data }: NodeProps) {
  return (
    <Card className="min-w-[250px] border-blue-500 shadow-md">
      <CardHeader className="p-3 bg-blue-50 dark:bg-blue-950/20 pb-2">
        <div className="flex justify-between items-center">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
                🤖 Agent
            </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-3 grid gap-4">
         {/* Inputs */}
         <div className="flex justify-between items-center relative h-6">
            <div className="flex items-center gap-2">
                 <Handle id="flow-in" type="target" position={Position.Left} className="!bg-blue-500" />
                 <span className="text-xs font-semibold">Input</span>
            </div>
         </div>

         {/* Resources */}
         <div className="grid grid-cols-3 gap-2 text-[10px] text-muted-foreground text-center">
             <div className="relative p-1 border rounded bg-background">
                 <span className="mb-1 block">LLM</span>
                 <Handle id="llm" type="target" position={Position.Top} className="!bg-purple-500 !-top-2 !left-1/2" />
             </div>
             <div className="relative p-1 border rounded bg-background">
                 <span className="mb-1 block">Tools</span>
                 <Handle id="tools" type="target" position={Position.Top} className="!bg-orange-500 !-top-2 !left-1/2" />
             </div>
             <div className="relative p-1 border rounded bg-background">
                 <span className="mb-1 block">Memory</span>
                 <Handle id="memory" type="target" position={Position.Top} className="!bg-green-500 !-top-2 !left-1/2" />
             </div>
         </div>

         {/* Outputs */}
         <div className="flex justify-end items-center relative h-6">
             <span className="text-xs font-semibold mr-2">Result</span>
             <Handle id="flow-out" type="source" position={Position.Right} className="!bg-blue-500" />
         </div>
      </CardContent>
    </Card>
  );
}
