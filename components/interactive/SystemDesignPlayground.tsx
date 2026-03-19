"use client";

import React, { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  NodeProps,
  Handle,
  Position,
  Node,
  Edge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, LayoutTemplate, Database, Activity, Zap, Globe, RefreshCw, Cpu, Search, Box } from 'lucide-react';

type ArchitectureNodeData = {
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  description: string;
  isHovered?: boolean;
};

type ArchNode = Node<ArchitectureNodeData>;

const EMERALD_GREEN = "#3ecf8e";

// Idle Path Colors
const IDLE_COLORS = {
  client: "#38bdf8", // Blue
  api: "#3ecf8e",    // Emerald
  data: "#a855f7",   // Purple
  async: "#f59e0b",  // Amber
};

// Custom Node component
function ArchitectureNode({ data, selected, id }: NodeProps<ArchNode>) {
  return (
    <div className={`px-4 py-3 shadow-lg rounded-xl border-2 transition-all w-60 ${
      selected || data.isHovered ? 'border-[#3ecf8e] bg-[#3ecf8e]/10 shadow-[0_0_15px_rgba(62,207,142,0.3)]' : 'border-white/10 bg-[#111111]/90'
    }`}>
      {id !== 'client' && <Handle type="target" position={Position.Left} className="w-2 h-2 bg-[#3ecf8e]/50 border-none" />}
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${selected || data.isHovered ? 'bg-[#3ecf8e]/20 text-white' : 'bg-white/5 text-muted-foreground'}`}>
          {data.icon}
        </div>
        <div>
          <div className="font-bold text-sm text-white font-mono">{data.label}</div>
          <div className="text-[10px] text-muted-foreground font-mono">{data.sublabel}</div>
        </div>
      </div>
      {id !== 'search' && id !== 'storage' && id !== 'db' && (
        <Handle type="source" position={Position.Right} className="w-2 h-2 bg-[#3ecf8e]/50 border-none" />
      )}
    </div>
  );
}

// Custom Group Label Node
function GroupLabelNode({ data }: NodeProps<Node<{ label: string }>>) {
  return (
    <div className="px-4 py-2 border border-white/10 bg-white/5 rounded-md backdrop-blur-sm">
      <span className="text-xs font-bold text-neutral-400 font-mono tracking-widest uppercase">
        [ {data.label} ]
      </span>
    </div>
  );
}

const nodeTypes = {
  architectureNode: ArchitectureNode,
  groupLabelNode: GroupLabelNode,
};

const initialNodes: Node[] = [
  // Labels
  { id: 'l1', type: 'groupLabelNode', position: { x: 50, y: 50 }, data: { label: 'Client Layer' }, selectable: false, draggable: false },
  { id: 'l2', type: 'groupLabelNode', position: { x: 500, y: 50 }, data: { label: 'Application Layer' }, selectable: false, draggable: false },
  { id: 'l3', type: 'groupLabelNode', position: { x: 800, y: 50 }, data: { label: 'Data & Async Layer' }, selectable: false, draggable: false },

  // Client Layer
  { id: 'client', type: 'architectureNode', position: { x: 50, y: 120 }, data: { label: 'Client', sublabel: 'Browser / Mobile App', icon: <LayoutTemplate className="w-4 h-4" />, description: 'The user interface built with React and Next.js. Optimized for performance with Server Components.' } },
  { id: 'cdn', type: 'architectureNode', position: { x: 50, y: 240 }, data: { label: 'CDN / Edge', sublabel: 'Cloudflare', icon: <Globe className="w-4 h-4" />, description: 'Caches static assets and serves them from edge locations globally to reduce latency.' } },
  { id: 'gateway', type: 'architectureNode', position: { x: 50, y: 360 }, data: { label: 'API Gateway', sublabel: 'Nginx / Kong', icon: <Activity className="w-4 h-4" />, description: 'Routes API traffic, handles rate limiting, and manages SSL termination.' } },

  // Application Layer
  { id: 'api', type: 'architectureNode', position: { x: 500, y: 240 }, data: { label: 'REST API', sublabel: 'Node.js / Express', icon: <Server className="w-4 h-4" />, description: 'Core backend service. Handles synchronous user requests, authentication, and business logic.' } },

  // Data & Async Layer
  { id: 'cache', type: 'architectureNode', position: { x: 800, y: 120 }, data: { label: 'Cache Layer', sublabel: 'Redis', icon: <Cpu className="w-4 h-4" />, description: 'In-memory data store for extremely fast retrieval of frequent queries and session states.' } },
  { id: 'db', type: 'architectureNode', position: { x: 1150, y: 120 }, data: { label: 'Primary Database', sublabel: 'PostgreSQL', icon: <Database className="w-4 h-4" />, description: 'Primary ACID-compliant relational database for critical persistent business data.' } },
  { id: 'queue', type: 'architectureNode', position: { x: 800, y: 360 }, data: { label: 'Message Queue', sublabel: 'Redis / BullMQ', icon: <RefreshCw className="w-4 h-4" />, description: 'Handles asynchronous jobs such as sending emails, processing images, and background tasks.' } },
  { id: 'worker', type: 'architectureNode', position: { x: 1150, y: 360 }, data: { label: 'Background Worker', sublabel: 'Node.js', icon: <Zap className="w-4 h-4" />, description: 'Processes heavy asynchronous jobs pulled from the queue without blocking the main API.' } },
  { id: 'search', type: 'architectureNode', position: { x: 1450, y: 280 }, data: { label: 'Search Engine', sublabel: 'Elasticsearch', icon: <Search className="w-4 h-4" />, description: 'Optimized document store for executing fast, complex full-text search queries.' } },
  { id: 'storage', type: 'architectureNode', position: { x: 1450, y: 440 }, data: { label: 'Object Storage', sublabel: 'AWS S3', icon: <Box className="w-4 h-4" />, description: 'Scalable storage for user-uploaded assets, media, and unstructured files.' } }
];

const defaultEdges: Edge[] = [
  // Client flow - Blue
  { id: 'e1', source: 'client', target: 'cdn', animated: false, style: { stroke: IDLE_COLORS.client, strokeWidth: 2, opacity: 0.6 } },
  { id: 'e2', source: 'cdn', target: 'gateway', animated: false, style: { stroke: IDLE_COLORS.client, strokeWidth: 2, opacity: 0.6 } },
  { id: 'e3', source: 'gateway', target: 'api', animated: false, style: { stroke: IDLE_COLORS.client, strokeWidth: 2, opacity: 0.6 } },
  
  // Data flow - Purple
  { id: 'e4', source: 'api', target: 'cache', animated: false, style: { stroke: IDLE_COLORS.data, strokeWidth: 2, opacity: 0.6 } },
  { id: 'e5', source: 'cache', target: 'db', animated: false, style: { stroke: IDLE_COLORS.data, strokeWidth: 2, opacity: 0.6 } },
  { id: 'e6', source: 'api', target: 'db', animated: false, style: { stroke: IDLE_COLORS.data, strokeWidth: 2, opacity: 0.6 } },
  
  // Async flow - Amber
  { id: 'e7', source: 'api', target: 'queue', animated: false, style: { stroke: IDLE_COLORS.async, strokeWidth: 2, opacity: 0.6 } },
  { id: 'e8', source: 'queue', target: 'worker', animated: false, style: { stroke: IDLE_COLORS.async, strokeWidth: 2, opacity: 0.6 } },
  { id: 'e9', source: 'worker', target: 'search', animated: false, style: { stroke: IDLE_COLORS.async, strokeWidth: 2, opacity: 0.6 } },
  { id: 'e10', source: 'worker', target: 'storage', animated: false, style: { stroke: IDLE_COLORS.async, strokeWidth: 2, opacity: 0.6 } },
];

export function SystemDesignPlayground() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);
  const [hoveredNode, setHoveredNode] = useState<ArchitectureNodeData | null>(null);
  
  const animationTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const onNodeMouseEnter = useCallback((_: React.MouseEvent, node: Node) => {
    if (node.type === 'architectureNode') {
      setHoveredNode(node.data as ArchitectureNodeData);
      setNodes((nds) => 
        nds.map((n) => {
          if (n.id === node.id) {
            return { ...n, data: { ...n.data, isHovered: true } };
          }
          return n;
        })
      );
    }
  }, [setNodes]);

  const onNodeMouseLeave = useCallback((_: React.MouseEvent, node: Node) => {
    if (node.type === 'architectureNode') {
      setHoveredNode(null);
      setNodes((nds) => 
        nds.map((n) => {
          if (n.id === node.id) {
            return { ...n, data: { ...n.data, isHovered: false } };
          }
          return n;
        })
      );
    }
  }, [setNodes]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    if (node.type === 'architectureNode') {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      
      setNodes((nds) => 
        nds.map((n) => {
          if (n.id === node.id) {
             return { ...n, selected: true };
          }
          return { ...n, selected: false };
        })
      );

      const downstreamEdges = new Set<string>();
      const queue = [node.id];
      while (queue.length > 0) {
        const currentId = queue.shift();
        for (const e of defaultEdges) {
          if (e.source === currentId) {
            downstreamEdges.add(e.id);
            queue.push(e.target);
          }
        }
      }

      setEdges((eds) => 
        defaultEdges.map((e) => {
          if (downstreamEdges.has(e.id)) {
            // Force EMERALD GREEN for active flow
            return { 
              ...e, 
              animated: true, 
              style: { 
                stroke: EMERALD_GREEN, 
                strokeWidth: 4, 
                opacity: 1,
                filter: `drop-shadow(0 0 10px ${EMERALD_GREEN})` 
              } 
            };
          }
          // Dim non-involved edges
          return { ...e, style: { ...e.style, opacity: 0.05 } };
        })
      );

      animationTimeoutRef.current = setTimeout(() => {
        setEdges(defaultEdges);
        setNodes((nds) => nds.map((n) => ({ ...n, selected: false })));
      }, 4000);
    }
  }, [setEdges, setNodes]);

  return (
    <div className="workflow-container relative w-full h-[600px] bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 shadow-inner transition-all duration-300">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        colorMode="dark"
        minZoom={0.5}
        maxZoom={1.5}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#27272a" />
        <Controls className="bg-[#111111] border-neutral-800 fill-white" />
      </ReactFlow>

      <AnimatePresence>
        {hoveredNode && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute bottom-6 right-6 w-80 bg-[#111111]/95 border border-neutral-700 rounded-xl shadow-2xl p-6 z-20 pointer-events-none"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-primary/20 text-primary">
                {hoveredNode.icon}
              </div>
              <div>
                <h4 className="font-mono font-bold text-lg leading-tight text-white">{hoveredNode.label}</h4>
                <span className="text-[10px] font-mono text-neutral-400 bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800 inline-block mt-1">
                  {hoveredNode.sublabel}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-neutral-400 leading-relaxed">
              {hoveredNode.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="absolute top-4 right-4 pointer-events-none text-xs font-mono text-neutral-400 bg-black/50 px-3 py-1.5 rounded-md border border-neutral-800 backdrop-blur-sm">
        Hover over nodes • Click nodes to trace connection flow
      </div>
    </div>
  );
}
