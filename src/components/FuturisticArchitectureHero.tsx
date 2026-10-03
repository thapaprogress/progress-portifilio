import React, { useState, useEffect } from 'react';
import { FuturisticVisualHeroImage } from './FuturisticVisualHeroImage';
import {
  Cpu,
  Activity,
  Layers,
  Zap,
  Radio,
  Eye,
  Bell,
  CheckCircle2,
  Terminal,
  Sparkles,
  ArrowRight,
  Disc,
  Play,
  RotateCw,
} from 'lucide-react';

interface FuturisticArchitectureHeroProps {
  onNavigateToCrate?: () => void;
  onNavigateToVideo?: () => void;
}

interface PipelineNode {
  id: string;
  name: string;
  shortCode: string;
  sub: string;
  role: string;
  latency: string;
  tensorShape: string;
  color: string;
  accentHex: string;
  details: string;
}

export const FuturisticArchitectureHero: React.FC<FuturisticArchitectureHeroProps> = ({
  onNavigateToCrate,
  onNavigateToVideo,
}) => {
  const [activeNodeId, setActiveNodeId] = useState<string>('yolo');
  const [pulseTick, setPulseTick] = useState<number>(0);
  const [simulatedFps, setSimulatedFps] = useState<number>(17.4);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseTick((prev) => (prev + 1) % 100);
      setSimulatedFps(+(16.2 + Math.sin(Date.now() / 900) * 1.5).toFixed(1));
    }, 120);
    return () => clearInterval(timer);
  }, []);

  const pipelineNodes: PipelineNode[] = [
    {
      id: 'rtsp',
      name: 'RTSP Video Ingestion',
      shortCode: 'NODE-01',
      sub: 'Sony IMX477 1080p @ 30 FPS',
      role: 'Dual-camera RTSP ingestion pipeline with hardware ring-buffer queue and zero frame-drop buffering.',
      latency: '2.4 ms',
      tensorShape: '[1, 3, 1080, 1920] (RGB888)',
      color: 'border-emerald-500/60 text-emerald-400 bg-emerald-950/40',
      accentHex: '#10B981',
      details: 'Decodes RTSP stream over gigabit LAN, normalizing frames into contiguous memory buffers with zero CPU copy overhead.',
    },
    {
      id: 'prep',
      name: 'OpenCV Preprocessor & INT8 Quantizer',
      shortCode: 'NODE-02',
      sub: 'Affine Warp & Symmetric INT8 Calibration',
      role: 'Hardware-accelerated resize to 640x640, mean subtraction, and symmetric INT8 scalar quantization.',
      latency: '5.8 ms',
      tensorShape: '[1, 3, 640, 640] (INT8 Tensor)',
      color: 'border-cyan-500/60 text-cyan-400 bg-cyan-950/40',
      accentHex: '#06B6D4',
      details: 'Shrinks 25MB float32 weight tensors to 6.2MB with calibrated dynamic range, minimizing thermal throttle on edge boards.',
    },
    {
      id: 'yolo',
      name: 'YOLOv8n + 48D Kinematic Tensor Core',
      shortCode: 'NODE-03',
      sub: '15–18 FPS NCNN Inference Engine',
      role: 'Core neural inference executing 225 layer layers in 32ms, outputting bounding boxes and 48-dimensional skeletal landmark vectors.',
      latency: '18.2 ms',
      tensorShape: '[1, 84, 8400] + [1, 48] (Pose)',
      color: 'border-lime-500 text-lime-300 bg-lime-950/50',
      accentHex: '#84CC16',
      details: 'Dual-head architecture: Head A detects primate presence with 88.4% mAP; Head B extracts 17 skeletal joint positions in real time.',
    },
    {
      id: 'hsmm',
      name: 'Duration-Aware HSMM Forecaster',
      shortCode: 'NODE-04',
      sub: 'Temporal Smoothing · 86.6% Jitter Cut',
      role: 'Hidden Semi-Markov Model filtering instantaneous frame flicker and estimating behavioral transition states (Observing -> Approaching -> Feeding).',
      latency: '4.1 ms',
      tensorShape: '[4 State Vector] (P_trans)',
      color: 'border-amber-500/60 text-amber-400 bg-amber-950/40',
      accentHex: '#F59E0B',
      details: 'Eliminates false alarms by modeling dwell times, suppressing 86.6% temporal variance when animals rapidly dart behind temple walls.',
    },
    {
      id: 'alert',
      name: 'Slack Webhook & LoRa SX1262 Gateway',
      shortCode: 'NODE-05',
      sub: '< 1.2s Dispatch · 8km Hill-to-Hill Mesh',
      role: 'Instantaneous multi-channel dispatch sending photo snapshots to farmers smartphones and broadcasting LoRa telemetry across valley hills.',
      latency: '1,180 ms',
      tensorShape: 'JSON Payload + 28KB JPEG Crop',
      color: 'border-rose-500/60 text-rose-400 bg-rose-950/40',
      accentHex: '#F43F5E',
      details: 'Dispatches high-priority Slack notifications with crop image verification and broadcasts LoRa packets when cellular towers fail.',
    },
  ];

  const activeNode = pipelineNodes.find((n) => n.id === activeNodeId) || pipelineNodes[2];

  return (
    <div className="relative rounded-3xl overflow-hidden bg-[#07130C] border border-[#1B4332] shadow-2xl text-white select-none">
      {/* Background Cybernetic Blueprint & Matrix Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {/* Isometric Matrix Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #22C55E 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Animated Glow Gradient */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#10B981]/20 blur-3xl pointer-events-none transition-transform duration-1000"
          style={{
            transform: `translate(${Math.sin(pulseTick * 0.05) * 40}px, ${Math.cos(pulseTick * 0.05) * 40}px)`,
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#22C55E]/20 blur-3xl pointer-events-none"
        />

        {/* Subtle scanline sweep */}
        <div
          className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-[#22C55E]/10 to-transparent pointer-events-none"
          style={{
            transform: `translateY(${(pulseTick * 5) % 400}px)`,
          }}
        />
      </div>

      {/* Top Header HUD Bar */}
      <div className="relative z-10 px-5 sm:px-8 pt-6 pb-4 border-b border-[#142C1F] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#A3E635] uppercase bg-[#142C1F] px-2.5 py-0.5 rounded-full border border-[#2D5A27] flex items-center gap-1.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-ping" />
              <span>Prajna Architecture · Cybernetic Edge Schematic</span>
            </span>
            <span className="text-[10px] font-mono text-[#86EFAC] hidden sm:inline">
              SYS-REF: MBUST-AIOT-2026
            </span>
          </div>

          <h1 className="text-xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            High-Throughput Edge AI &amp; Real-Time Neural Schematic
          </h1>
        </div>

        {/* Live Hardware Telemetry Chips */}
        <div className="flex items-center gap-2 font-mono text-[11px] flex-wrap">
          <div className="px-3 py-1 rounded-lg bg-[#0F261A] border border-[#1B4332] text-[#86EFAC] flex items-center gap-1.5 shadow-xs">
            <Activity className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>FPS: <strong>{simulatedFps}</strong></span>
          </div>
          <div className="px-3 py-1 rounded-lg bg-[#0F261A] border border-[#1B4332] text-[#86EFAC] flex items-center gap-1.5 shadow-xs">
            <Cpu className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>NCNN INT8: <strong>32ms</strong></span>
          </div>
          <div className="px-3 py-1 rounded-lg bg-[#0F261A] border border-[#1B4332] text-[#A3E635] flex items-center gap-1.5 shadow-xs">
            <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Precision: <strong>88.4% mAP</strong></span>
          </div>
        </div>
      </div>

      {/* Main Interactive Animated Pipeline Canvas */}
      <div className="relative z-10 p-5 sm:p-8 space-y-6">
        {/* Animated & Responsive Futuristic Cybernetic Viewport Image */}
        <div className="w-full">
          <FuturisticVisualHeroImage
            onLaunchStream={onNavigateToVideo}
            onExploreTech={() => {}}
          />
        </div>

        {/* Animated Schematic Rail (Horizontal scroll on mobile, flex on desktop) */}
        <div className="relative">
          {/* Animated Connecting Pathway Line */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 -translate-y-1/2 h-0.5 bg-[#1B4332] z-0 pointer-events-none">
            {/* Traveling Light Pulse */}
            <div
              className="absolute top-0 h-full w-24 bg-gradient-to-r from-transparent via-[#22C55E] to-transparent"
              style={{
                left: `${(pulseTick * 2) % 100}%`,
                filter: 'drop-shadow(0 0 6px #22C55E)',
              }}
            />
          </div>

          {/* Pipeline Nodes List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 relative z-10">
            {pipelineNodes.map((node, idx) => {
              const isSelected = activeNodeId === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNodeId(node.id)}
                  className={`relative p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-3 ${
                    isSelected
                      ? `${node.color} ring-2 ring-[#22C55E] shadow-[0_0_25px_rgba(34,197,94,0.35)] scale-[1.03] z-20`
                      : 'bg-[#0B1A12]/90 border-[#1B4332] text-white/80 hover:bg-[#122B1E] hover:border-[#2D5A27] hover:scale-[1.01]'
                  }`}
                >
                  {/* Node Header */}
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="font-bold opacity-80">{node.shortCode}</span>
                      <span className="font-semibold px-1.5 py-0.2 rounded bg-black/40 text-white/90">
                        {node.latency}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-sm sm:text-base leading-snug text-white">
                      {node.name}
                    </h3>
                    <p className="text-[11px] font-mono text-[#A7F3D0] mt-1 leading-tight line-clamp-2">
                      {node.sub}
                    </p>
                  </div>

                  {/* Node Footer with Tensor Spec */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#86EFAC]">
                    <span className="truncate max-w-[120px]">{node.tensorShape}</span>
                    <span className="text-white/60">Stage {idx + 1}</span>
                  </div>

                  {/* Pulsing selection indicator on active node */}
                  {isSelected && (
                    <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-[#22C55E] border-2 border-[#07130C] shadow-xs animate-ping" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Node Telemetry & Subsystem Details Box */}
        <div className="bg-[#091C12] rounded-2xl border border-[#1B4332] p-5 sm:p-6 shadow-inner space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#142C1F] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#142C1F] text-[#A3E635] border border-[#2D5A27]">
                  ACTIVE SUB-MODULE INSPECTOR
                </span>
                <span className="text-xs font-mono text-[#86EFAC] font-semibold">
                  {activeNode.shortCode} · {activeNode.name}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#DFECE3] mt-1 leading-relaxed">
                {activeNode.role}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-3 py-1 rounded-lg bg-[#0F2B1D] border border-[#1E4D34] text-xs font-mono text-[#22C55E] font-bold">
                Latency: {activeNode.latency}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 bg-[#07160E] rounded-xl border border-[#142C1F]">
              <span className="text-[#86EFAC] text-[10px] uppercase block mb-1">
                Data Representation / Tensor Shape
              </span>
              <span className="text-white font-bold text-xs">{activeNode.tensorShape}</span>
            </div>

            <div className="p-3 bg-[#07160E] rounded-xl border border-[#142C1F]">
              <span className="text-[#86EFAC] text-[10px] uppercase block mb-1">
                Field Deployment Benchmark
              </span>
              <span className="text-white font-bold text-xs">
                {activeNode.id === 'yolo'
                  ? '88.4% mAP · 32ms INT8'
                  : activeNode.id === 'hsmm'
                  ? '86.6% Jitter Reduction'
                  : activeNode.id === 'alert'
                  ? '< 1.2s Phone Notification'
                  : 'Zero Memory Leak (672hr Uptime)'}
              </span>
            </div>

            <div className="p-3 bg-[#07160E] rounded-xl border border-[#142C1F]">
              <span className="text-[#86EFAC] text-[10px] uppercase block mb-1">
                Engineering Invariant
              </span>
              <span className="text-white font-bold text-xs">Deterministic Low-Power Edge Execution</span>
            </div>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-[#86EFAC] leading-relaxed max-w-xl">
              {activeNode.details}
            </p>

            <div className="flex items-center gap-2">
              {onNavigateToVideo && (
                <button
                  onClick={onNavigateToVideo}
                  className="px-3.5 py-1.5 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-black text-xs font-mono font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch Live Video Player</span>
                </button>
              )}

              {onNavigateToCrate && (
                <button
                  onClick={onNavigateToCrate}
                  className="px-3.5 py-1.5 rounded-xl bg-[#142C1F] hover:bg-[#1B4332] border border-[#2D5A27] text-white text-xs font-mono font-medium transition-colors flex items-center gap-1.5"
                >
                  <Disc className="w-3.5 h-3.5" />
                  <span>3D Project Crate</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
