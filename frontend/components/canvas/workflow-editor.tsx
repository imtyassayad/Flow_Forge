
"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Sidebar } from './sidebar';
import { ActionNode } from './nodes/action-node';
import { AgentNode } from './nodes/agent-node';
import { LLMNode } from './nodes/llm-node';
import { ToolNode, MemoryNode, OutputNode } from './nodes/misc-nodes';
import { useWebSocket } from '@/hooks/use-websocket';

const defaultNodes = [
  { id: 'start', position: { x: 50, y: 300 }, data: { label: 'Start' }, type: 'input' },
];

function WorkflowEditorContent({ workflowId }: { workflowId: string }) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [logs, setLogs] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const { isConnected, lastMessage } = useWebSocket(`ws://localhost:8000/ws/workflow/${workflowId}/`);

  useEffect(() => {
      if (lastMessage && lastMessage.data) {
          setLogs(prev => [...prev, lastMessage.data]);
      }
  }, [lastMessage]);

  const nodeTypes = useMemo(() => ({ 
      action: ActionNode,
      agent: AgentNode,
      llm: LLMNode,
      tool: ToolNode,
      memory: MemoryNode,
      output: OutputNode
  }), []);

  const { data: workflow, isLoading } = useQuery({
      queryKey: ['workflow', workflowId],
      queryFn: async () => (await api.get(`/workflows/${workflowId}/`)).data
  });

  useEffect(() => {
    if (workflow) {
      if (workflow.reactflow_json && workflow.reactflow_json.nodes) {
         setNodes(workflow.reactflow_json.nodes);
         setEdges(workflow.reactflow_json.edges || []);
      } else {
         setNodes(defaultNodes);
         setEdges([]);
      }
    }
  }, [workflow, setNodes, setEdges]);
  
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow/type');
      const label = event.dataTransfer.getData('application/reactflow/label');
      const metadataStr = event.dataTransfer.getData('application/reactflow/metadata');
      
      let metadata = {};
      try {
          metadata = metadataStr ? JSON.parse(metadataStr) : {};
      } catch (e) {}

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { label, ...metadata },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes],
  );

  const saveMutation = useMutation({
      mutationFn: async () => {
          const flowData = { nodes, edges };
          return api.patch(`/workflows/${workflowId}/`, {
              reactflow_json: flowData
          });
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['workflow', workflowId] });
          alert("Saved!");
      },
  });

  const runMutation = useMutation({
      mutationFn: async () => {
          setLogs(['Requesting execution...']);
          return api.post(`/workflows/${workflowId}/run/`, { input: {} });
      },
      onSuccess: (data) => {
           console.log("Execution Result", data);
      },
      onError: (err) => {
          setLogs(prev => [...prev, `Error: ${err.message}`]);
      }
  });

  if (isLoading) return <div className="p-8">Loading...</div>;

  return (
    <div className="h-[calc(100vh-64px)] w-full flex flex-col">
       <div className="border-b h-14 px-4 flex justify-between items-center bg-background">
            <div className="flex flex-col">
                <h3 className="font-semibold leading-none tracking-tight flex items-center gap-2">
                    {workflow?.name || 'Workflow'}
                    {isConnected ? (
                        <span className="h-2 w-2 rounded-full bg-green-500" title="Connected"></span>
                    ) : (
                        <span className="h-2 w-2 rounded-full bg-red-500" title="Disconnected"></span>
                    )}
                </h3>
            </div>
            <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
                    {saveMutation.isPending ? 'Saving...' : 'Save'}
                </Button>
                <Button size="sm" onClick={() => runMutation.mutate()} disabled={runMutation.isPending}>
                    {runMutation.isPending ? 'Running...' : 'Run Workflow'}
                </Button>
            </div>
       </div>
       
       <div className="flex-1 w-full flex bg-muted/10 relative overflow-hidden">
          <div className="flex-1 h-full relative" ref={reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDragOver={onDragOver}
                onDrop={onDrop}
                nodeTypes={nodeTypes}
                fitView
            >
                <Controls />
                <MiniMap />
                <Background gap={12} size={1} />
            </ReactFlow>
          </div>
          <Sidebar />
          
           {/* Console / Logs Panel */}
           <div className="absolute bottom-0 left-0 right-0 h-48 bg-background border-t z-10 flex flex-col shadow-lg">
                <div className="border-b px-4 py-2 bg-muted/50 text-xs font-semibold uppercase">Execution Logs</div>
                <div className="flex-1 p-4 overflow-y-auto font-mono text-sm space-y-1">
                    {logs.length === 0 && <span className="text-muted-foreground italic">Ready.</span>}
                    {logs.map((log, i) => (
                        <div key={i}>{log}</div>
                    ))}
                </div>
           </div>
      </div>
    </div>
  );
}

export default function WorkflowEditor({ workflowId }: { workflowId: string }) {
    return (
        <ReactFlowProvider>
            <WorkflowEditorContent workflowId={workflowId} />
        </ReactFlowProvider>
    )
}
