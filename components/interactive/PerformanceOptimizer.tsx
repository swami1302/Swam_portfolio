"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Zap, ImageIcon, Code2, Database } from "lucide-react";

export function PerformanceOptimizer() {
  const [memoization, setMemoization] = useState(false);
  const [codeSplitting, setCodeSplitting] = useState(false);
  const [apiCaching, setApiCaching] = useState(false);
  const [imageOptimization, setImageOptimization] = useState(false);

  // Base metrics
  const baseBundle = 820;
  const baseLoad = 3.2;
  const baseApi = 420;

  // Calculate current metrics
  const bundleSize = baseBundle - (codeSplitting ? 400 : 0) - (imageOptimization ? 100 : 0);
  const loadTime = baseLoad - (memoization ? 0.4 : 0) - (codeSplitting ? 0.8 : 0) - (apiCaching ? 0.5 : 0) - (imageOptimization ? 0.4 : 0);
  const apiLatency = baseApi - (apiCaching ? 280 : 0) - (memoization ? 20 : 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Controls */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Optimization Toggles
        </h3>
        
        <div className="space-y-4">
          <ControlRow 
            icon={<Code2 className="w-4 h-4" />}
            title="Enable Memoization" 
            description="Prevent unnecessary re-renders in React components" 
            checked={memoization} 
            onChange={setMemoization} 
          />
          <ControlRow 
            icon={<Activity className="w-4 h-4" />}
            title="Enable Code Splitting" 
            description="Dynamic imports for route-based chunking" 
            checked={codeSplitting} 
            onChange={setCodeSplitting} 
          />
          <ControlRow 
            icon={<Database className="w-4 h-4" />}
            title="Enable API Caching" 
            description="Use React Query/Redis for caching responses" 
            checked={apiCaching} 
            onChange={setApiCaching} 
          />
          <ControlRow 
            icon={<ImageIcon className="w-4 h-4" />}
            title="Image Optimization" 
            description="Next/Image with WebP and intelligent sizing" 
            checked={imageOptimization} 
            onChange={setImageOptimization} 
          />
        </div>
      </div>

      {/* Dashboard */}
      <div className="bg-card border border-primary/20 rounded-3xl p-6 md:p-8 flex flex-col justify-center relative overflow-hidden transition-all duration-300 hover:border-primary/50">
        
        <h3 className="text-xl font-bold mb-6 text-center z-10">Live Performance Metrics</h3>
        
        <div className="space-y-4 z-10">
          <MetricCard 
            label="Bundle Size" 
            value={bundleSize} 
            unit="KB" 
            trend={bundleSize < baseBundle ? "down" : "neutral"} 
          />
          <MetricCard 
            label="Load Time" 
            value={loadTime.toFixed(1)} 
            unit="s" 
            trend={loadTime < baseLoad ? "down" : "neutral"} 
          />
          <MetricCard 
            label="API Latency" 
            value={apiLatency} 
            unit="ms" 
            trend={apiLatency < baseApi ? "down" : "neutral"} 
          />
        </div>
      </div>
    </div>
  );
}

interface ControlRowProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ControlRow({ icon, title, description, checked, onChange }: ControlRowProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 transition-all hover:bg-white/10">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-primary/10 text-primary mt-1">
          {icon}
        </div>
        <div>
          <h4 className="font-semibold text-white/90">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string | number;
  unit: string;
  trend: "down" | "neutral";
}

function MetricCard({ label, value, unit, trend }: MetricCardProps) {
  const [animatedValue, setAnimatedValue] = useState(value);

  useEffect(() => {
    setAnimatedValue(value);
  }, [value]);

  return (
    <Card className="bg-background border-white/10 overflow-hidden relative group">
      <CardContent className="p-5 flex items-center justify-between">
        <span className="text-muted-foreground font-medium">{label}</span>
        <div className="flex items-baseline gap-1">
          <motion.span 
            key={animatedValue}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-3xl font-bold tracking-tight ${trend === 'down' ? 'text-green-400' : 'text-white'}`}
          >
            {animatedValue}
          </motion.span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
      </CardContent>
      {trend === 'down' && (
        <motion.div 
          layoutId={`highlight-${label}`}
          className="absolute bottom-0 left-0 h-1 bg-green-500/50" 
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.5 }}
        />
      )}
    </Card>
  );
}
