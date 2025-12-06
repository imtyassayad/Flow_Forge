
import logging
from typing import TypedDict, List, Dict, Any, Optional
from langgraph.graph import StateGraph, END
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

# LangChain / Ollama integration
try:
    from langchain_ollama import ChatOllama
    from langchain_core.messages import HumanMessage, SystemMessage
    from langchain_core.tools import tool
except ImportError:
    ChatOllama = None

logger = logging.getLogger(__name__)

class WorkflowState(TypedDict):
    data: Dict[str, Any]
    logs: List[str]
    messages: List[Any] # LangChain messages

# Mock Tool
@tool
def search_tool(query: str):
    """Useful for searching the internet."""
    return f"Mock search result for: {query}"

class WorkflowExecutor:
    def __init__(self, workflow_json: Dict[str, Any], workflow_id: str):
        self.nodes = workflow_json.get('nodes', [])
        self.edges = workflow_json.get('edges', [])
        self.workflow_id = workflow_id
        self.graph = None
        self.resources = {} # Cache for LLMs/Tools

    def _get_upstream_node(self, node_id, handle_id):
        """Find the node connected to a specific target handle."""
        for edge in self.edges:
            if edge['target'] == node_id and edge.get('targetHandle') == handle_id:
                source_id = edge['source']
                return next((n for n in self.nodes if n['id'] == source_id), None)
        return None

    def _init_llm(self, node):
        if not ChatOllama:
            return None
            
        provider = node['data'].get('provider', 'ollama').lower()
        model = node['data'].get('model', 'llama3')
        
        if provider == 'ollama':
            # Use host.docker.internal to access host Ollama
            return ChatOllama(model=model, base_url="http://host.docker.internal:11434")
        elif provider == 'openai':
            # Placeholder for OpenAI (needs API Key)
            return None 
        return None

    def _make_node_func(self, node):
        """Create logic for a node."""
        node_type = node.get('type')
        node_id = node.get('id')
        workflow_id = self.workflow_id
        
        # 1. Agent Logic
        if node_type == 'agent':
            # Find dependencies
            llm_node = self._get_upstream_node(node_id, 'llm')
            tool_node = self._get_upstream_node(node_id, 'tools')
            
            llm = self._init_llm(llm_node) if llm_node else None
            
            def agent_func(state: WorkflowState):
                msg = f"Agent '{node['data'].get('label')}' Executing..."
                self._log(msg, state)
                
                input_text = state['data'].get('input', '')
                
                if llm:
                    # Simple LLM invoke for now (Agent logic can be expanded to create_react_agent)
                    self._log(f"Invoking LLM: {llm.model}", state)
                    try:
                        response = llm.invoke([HumanMessage(content=input_text)])
                        output = response.content
                    except Exception as e:
                        output = f"LLM Error: {str(e)}"
                else:
                     output = "Agent Error: No LLM connected."
                
                self._log(f"Agent Output: {output}", state)
                state['data']['output'] = output # Pass to output
                return {"logs": state['logs'], "data": state['data']}
                
            return agent_func

        # 2. Output Logic
        elif node_type == 'output':
             def output_func(state: WorkflowState):
                 self._log(f"Final Output: {state['data'].get('output')}", state)
                 return state
             return output_func
             
        # 3. Default (Pass-through)
        def default_func(state: WorkflowState):
            self._log(f"Passing Node: {node_type}", state)
            return state
        return default_func

    def _log(self, message, state):
        entry = message
        state.setdefault('logs', []).append(entry)
        try:
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                f"workflow_{self.workflow_id}",
                {"type": "workflow_update", "message": entry}
            )
        except:
            pass

    def build(self):
        builder = StateGraph(WorkflowState)
        
        if not self.nodes:
            raise ValueError("No nodes")

        node_ids = set()
        for node in self.nodes:
            # Skip resource nodes (LLM/Tools/Memory) as they are dependencies, not execution steps
            # Unless we want to explicitly flow through them. 
            # Strategy: Only add execution nodes (Agent, Action, Output, Input/Start).
            if node['type'] in ['llm', 'tool', 'memory']:
                continue
                
            builder.add_node(node['id'], self._make_node_func(node))
            node_ids.add(node['id'])
            
        # Edges
        for edge in self.edges:
            source = edge['source']
            target = edge['target']
            
            # Only add edges between execution nodes
            if source in node_ids and target in node_ids:
                builder.add_edge(source, target)
            
        # Entry
        start_node = next((n for n in self.nodes if n['type'] == 'input'), None)
        if start_node and start_node['id'] in node_ids:
            builder.set_entry_point(start_node['id'])
        else:
            # If no start node, use first execution node
            first_exec = next((n['id'] for n in self.nodes if n['id'] in node_ids), None)
            if first_exec:
                 builder.set_entry_point(first_exec)
        
        self.graph = builder.compile()
        return self.graph

    def run(self, input_data: Dict[str, Any]):
        if not self.graph:
            self.build()
            
        initial_state = {
            "data": input_data,
            "logs": ["Starting..."],
            "messages": []
        }
        
        return self.graph.invoke(initial_state)
