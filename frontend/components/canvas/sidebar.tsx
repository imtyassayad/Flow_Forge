
import React from 'react';

export function Sidebar() {
    const onDragStart = (event: React.DragEvent, nodeType: string, label: string, metadata: any = {}) => {
        event.dataTransfer.setData('application/reactflow/type', nodeType);
        event.dataTransfer.setData('application/reactflow/label', label);
        event.dataTransfer.setData('application/reactflow/metadata', JSON.stringify(metadata));
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className="w-[240px] border-l bg-background p-4 flex flex-col gap-4 overflow-y-auto h-full scrollbar-hide">
            
            {/* Logic */}
            <div className="grid gap-2">
                <div className="text-xs text-muted-foreground uppercase font-semibold">Logic</div>
                 <div className="p-3 border rounded-md cursor-grab bg-card hover:bg-accent transition-colors flex items-center gap-2 text-sm"
                    draggable onDragStart={(e) => onDragStart(e, 'input', 'Start')}>
                    🚀 Start
                </div>
                <div className="p-3 border rounded-md cursor-grab bg-card hover:bg-accent transition-colors flex items-center gap-2 text-sm border-blue-200"
                    draggable onDragStart={(e) => onDragStart(e, 'agent', 'AI Agent')}>
                    🤖 AI Agent
                </div>
                 <div className="p-3 border rounded-md cursor-grab bg-card hover:bg-accent transition-colors flex items-center gap-2 text-sm border-gray-200"
                    draggable onDragStart={(e) => onDragStart(e, 'output', 'Output')}>
                    🏁 Output
                </div>
            </div>

            {/* LLMs */}
            <div className="grid gap-2">
                <div className="text-xs text-muted-foreground uppercase font-semibold">LLMs</div>
                 <div className="p-3 border rounded-md cursor-grab bg-card hover:bg-accent transition-colors flex items-center gap-2 text-sm"
                    draggable onDragStart={(e) => onDragStart(e, 'llm', 'Ollama', { provider: 'ollama' })}>
                    🦙 Ollama
                </div>
                 <div className="p-3 border rounded-md cursor-grab bg-card hover:bg-accent transition-colors flex items-center gap-2 text-sm"
                    draggable onDragStart={(e) => onDragStart(e, 'llm', 'OpenAI', { provider: 'openai' })}>
                    🟢 OpenAI
                </div>
                 <div className="p-3 border rounded-md cursor-grab bg-card hover:bg-accent transition-colors flex items-center gap-2 text-sm"
                    draggable onDragStart={(e) => onDragStart(e, 'llm', 'Gemini', { provider: 'gemini' })}>
                    ✨ Gemini
                </div>
                 <div className="p-3 border rounded-md cursor-grab bg-card hover:bg-accent transition-colors flex items-center gap-2 text-sm"
                    draggable onDragStart={(e) => onDragStart(e, 'llm', 'Grok', { provider: 'grok' })}>
                    🌌 Grok
                </div>
            </div>

             {/* Resources */}
             <div className="grid gap-2">
                <div className="text-xs text-muted-foreground uppercase font-semibold">Resources</div>
                 <div className="p-3 border rounded-md cursor-grab bg-card hover:bg-accent transition-colors flex items-center gap-2 text-sm border-orange-200"
                    draggable onDragStart={(e) => onDragStart(e, 'tool', 'Tavily Search')}>
                    🔍 Tavily Search
                </div>
                 <div className="p-3 border rounded-md cursor-grab bg-card hover:bg-accent transition-colors flex items-center gap-2 text-sm border-green-200"
                    draggable onDragStart={(e) => onDragStart(e, 'memory', 'Short Term')}>
                    💾 Memory
                </div>
            </div>
        </aside>
    )
}
