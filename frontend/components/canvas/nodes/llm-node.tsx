
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function LLMNode({ data }: NodeProps) {
  const provider = data.provider as string || 'Generic';
  const colors: Record<string, string> = {
      openai: 'border-green-500 text-green-500',
      ollama: 'border-white text-white', // Dark mode assumption
      gemini: 'border-blue-400 text-blue-400',
      grok: 'border-stone-500 text-stone-500'
  };
  const colorClass = colors[provider.toLowerCase()] || 'border-purple-500';

  return (
    <Card className={`min-w-[180px] shadow-sm ${colorClass}`}>
      <CardHeader className="p-2 pb-1">
        <CardTitle className="text-xs uppercase font-bold text-center">🧠 {provider} LLM</CardTitle>
      </CardHeader>
      <CardContent className="p-2 text-xs text-center text-muted-foreground">
          {data.model as string || "Default Model"}
          <Handle type="source" position={Position.Bottom} className="!bg-purple-500" />
      </CardContent>
    </Card>
  );
}
