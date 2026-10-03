import React, { useState, useEffect, useRef } from 'react';
import {
  Cpu,
  Zap,
  Activity,
  Radio,
  Layers,
  Sparkles,
  Maximize2,
  Minimize2,
  Eye,
  Sliders,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface FuturisticVisualHeroImageProps {
  onExploreTech?: () => void;
  onLaunchStream?: () => void;
}

export const FuturisticVisualHeroImage: React.FC<FuturisticVisualHeroImageProps> = ({
  onExploreTech,
  onLaunchStream,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeMode, setActiveMode] = useState<'matrix' | 'neural' | 'tensor'>('matrix');
  const [showScanlines, setShowScanlines] = useState(true);
  const [showHud, setShowHud] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [tick, setTick] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animation frame loop
  useEffect(() => {
    let animId: number;
    let localTick = 0;

    const render = () => {
      if (isPlaying) {
        localTick++;
        setTick(localTick);

        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const w = canvas.width;
            const h = canvas.height;

            // Clear with dark cybernetic gradient
            ctx.fillStyle = '#06130B';
            ctx.fillRect(0, 0, w, h);

            // Perspective Grid in Background
            ctx.save();
            ctx.strokeStyle = 'rgba(16, 185, 129, 0.12)';
            ctx.lineWidth = 1;

            const horizon = h * 0.55;
            const vanishX = w * (0.5 + (mousePos.x - 0.5) * 0.2);

            // Vertical converging perspective lines
            for (let i = -10; i <= 20; i++) {
              const xStart = (w / 10) * i + Math.sin(localTick * 0.02) * 4;
              ctx.beginPath();
              ctx.moveTo(vanishX, horizon);
              ctx.lineTo(xStart, h);
              ctx.stroke();
            }

            // Horizontal perspective lines
            for (let j = 1; j <= 8; j++) {
              const y = horizon + Math.pow(j / 8, 2) * (h - horizon);
              ctx.beginPath();
              ctx.moveTo(0, y);
              ctx.lineTo(w, y);
              ctx.stroke();
            }
            ctx.restore();

            // Draw Mode Specific Animated Elements
            if (activeMode === 'matrix' || activeMode === 'neural') {
              // Draw Neural Nodes & Synapses
              const numNodes = 14;
              const nodes: { x: number; y: number; r: number; color: string }[] = [];

              for (let i = 0; i < numNodes; i++) {
                const angle = (i / numNodes) * Math.PI * 2 + localTick * 0.015;
                const radius = (Math.sin(i * 1.5 + localTick * 0.03) * 0.2 + 0.3) * Math.min(w, h);
                const cx = w * 0.5 + Math.cos(angle) * radius;
                const cy = h * 0.45 + Math.sin(angle) * radius * 0.6;
                const r = 3 + Math.sin(localTick * 0.08 + i) * 1.5;
                const isCore = i % 3 === 0;

                nodes.push({
                  x: cx,
                  y: cy,
                  r,
                  color: isCore ? '#10B981' : i % 2 === 0 ? '#06B6D4' : '#A3E635',
                });
              }

              // Draw Synaptic Connections
              ctx.lineWidth = 1.2;
              for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                  const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
                  if (dist < w * 0.35) {
                    const alpha = (1 - dist / (w * 0.35)) * 0.35;
                    ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();

                    // Animated travelling packet
                    const packetT = ((localTick * 0.02 + i * 0.3) % 1);
                    const px = nodes[i].x + (nodes[j].x - nodes[i].x) * packetT;
                    const py = nodes[i].y + (nodes[j].y - nodes[i].y) * packetT;
                    ctx.fillStyle = '#FFFFFF';
                    ctx.beginPath();
                    ctx.arc(px, py, 2, 0, Math.PI * 2);
                    ctx.fill();
                  }
                }
              }

              // Draw Nodes with Bloom
              for (const n of nodes) {
                const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3);
                grad.addColorStop(0, n.color);
                grad.addColorStop(1, 'transparent');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fill();
              }
            }

            // Radar Scan Sweep
            ctx.save();
            const sweepX = w * 0.75;
            const sweepY = h * 0.35;
            const sweepR = Math.min(w, h) * 0.22;
            const sweepAngle = (localTick * 0.04) % (Math.PI * 2);

            ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(sweepX, sweepY, sweepR, 0, Math.PI * 2);
            ctx.stroke();

            ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
            ctx.beginPath();
            ctx.arc(sweepX, sweepY, sweepR * 0.6, 0, Math.PI * 2);
            ctx.stroke();

            // Sweep line
            ctx.strokeStyle = '#38BDF8';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(sweepX, sweepY);
            ctx.lineTo(
              sweepX + Math.cos(sweepAngle) * sweepR,
              sweepY + Math.sin(sweepAngle) * sweepR
            );
            ctx.stroke();

            // Sweep gradient trail
            const trailGrad = ctx.createRadialGradient(sweepX, sweepY, 0, sweepX, sweepY, sweepR);
            trailGrad.addColorStop(0, 'rgba(6, 182, 212, 0.15)');
            trailGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = trailGrad;
            ctx.beginPath();
            ctx.arc(sweepX, sweepY, sweepR, sweepAngle - 0.6, sweepAngle);
            ctx.lineTo(sweepX, sweepY);
            ctx.fill();
            ctx.restore();

            // Animated DSP Frequency Bars at bottom
            const numBars = 32;
            const barW = (w * 0.5) / numBars;
            const startX = w * 0.25;
            const baseY = h * 0.92;

            for (let b = 0; b < numBars; b++) {
              const hBar = (Math.sin(localTick * 0.1 + b * 0.4) * 0.5 + 0.5) * 36 + 6;
              const barGrad = ctx.createLinearGradient(0, baseY - hBar, 0, baseY);
              barGrad.addColorStop(0, '#A3E635');
              barGrad.addColorStop(1, '#065F46');

              ctx.fillStyle = barGrad;
              ctx.fillRect(startX + b * barW, baseY - hBar, barW - 2, hBar);
            }
          }
        }
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, activeMode, mousePos]);

  // Handle canvas sizing on resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (canvas && container) {
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full aspect-[16/9] min-h-[300px] sm:min-h-[420px] rounded-3xl overflow-hidden bg-[#050F09] border border-[#1B4332] shadow-2xl transition-all duration-300 select-none ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none w-screen h-screen' : ''
      }`}
    >
      {/* Interactive Canvas Background Rendering */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Cybernetic Holographic Overlay HUD */}
      {showHud && (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 sm:p-7">
          {/* Top HUD Telemetry Row */}
          <div className="flex items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-ping" />
              <span className="px-2.5 py-1 rounded bg-[#0A2617]/90 border border-[#22C55E]/40 text-[#86EFAC] font-bold tracking-wider text-[11px] shadow-lg backdrop-blur-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>PRAJNA TENSOR CORE // KATHMANDU</span>
              </span>
              <span className="hidden md:inline px-2 py-0.5 rounded bg-black/50 text-[#86EFAC]/70 border border-white/10 text-[10px]">
                COORD: 27.7149° N, 85.2904° E
              </span>
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              {/* Mode Switcher Tabs */}
              <div className="hidden sm:flex items-center bg-black/60 backdrop-blur-md rounded-xl p-1 border border-white/10 text-[11px]">
                <button
                  onClick={() => setActiveMode('matrix')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                    activeMode === 'matrix'
                      ? 'bg-[#10B981] text-black shadow-xs'
                      : 'text-[#A7F3D0] hover:text-white'
                  }`}
                >
                  Neural Matrix
                </button>
                <button
                  onClick={() => setActiveMode('neural')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                    activeMode === 'neural'
                      ? 'bg-[#06B6D4] text-black shadow-xs'
                      : 'text-[#A7F3D0] hover:text-white'
                  }`}
                >
                  Synapse Flow
                </button>
                <button
                  onClick={() => setActiveMode('tensor')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                    activeMode === 'tensor'
                      ? 'bg-[#A3E635] text-black shadow-xs'
                      : 'text-[#A7F3D0] hover:text-white'
                  }`}
                >
                  INT8 Quant Core
                </button>
              </div>

              {/* Pause/Play Toggle */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-lg bg-black/60 hover:bg-[#142C1F] text-[#86EFAC] border border-white/10 transition-colors"
                title={isPlaying ? 'Pause Animation' : 'Play Animation'}
                aria-label={isPlaying ? 'Pause Animation' : 'Play Animation'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>

              {/* Fullscreen Toggle */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 rounded-lg bg-black/60 hover:bg-[#142C1F] text-[#86EFAC] border border-white/10 transition-colors"
                title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Center Holographic Reticle & Futuristic Typography */}
          <div className="flex flex-col items-center justify-center text-center my-auto space-y-2 pointer-events-auto">
            {/* Holographic Target Rings */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center mb-1">
              <div
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#10B981]/40 animate-spin"
                style={{ animationDuration: '24s' }}
              />
              <div
                className="absolute inset-2 rounded-full border border-[#06B6D4]/50 animate-spin"
                style={{ animationDuration: '14s', animationDirection: 'reverse' }}
              />
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#092315]/80 border border-[#22C55E] flex items-center justify-center text-[#22C55E] shadow-[0_0_25px_rgba(34,197,94,0.4)] backdrop-blur-md">
                <Cpu className="w-7 h-7 sm:w-8 sm:h-8 animate-pulse text-[#4ADE80]" />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#A3E635] uppercase bg-black/60 px-3 py-1 rounded-full border border-[#22C55E]/30 inline-block shadow-md">
                Autonomous Primate Detection &amp; Early Alert Cybernetics
              </span>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight drop-shadow-md">
                Futuristic Edge AI &amp; Spatial Inference Core
              </h2>
              <p className="text-xs sm:text-sm text-[#A7F3D0] font-mono max-w-xl mx-auto drop-shadow-xs">
                YOLOv8n NCNN Quantized INT8 Engine · 15–18 FPS Real-Time Latency · 48D Kinematic Skeleton Tracking
              </p>
            </div>

            {/* Quick Action Navigation CTAs inside the futuristic viewport */}
            <div className="flex items-center gap-3 pt-2">
              {onLaunchStream && (
                <button
                  onClick={onLaunchStream}
                  className="px-4 py-2 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-[#050F09] font-mono font-bold text-xs sm:text-sm transition-all shadow-lg hover:shadow-[#22C55E]/40 flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Launch Live Stream</span>
                </button>
              )}

              {onExploreTech && (
                <button
                  onClick={onExploreTech}
                  className="px-4 py-2 rounded-xl bg-black/60 hover:bg-[#142C1F] border border-[#22C55E]/60 text-white font-mono font-semibold text-xs sm:text-sm transition-all backdrop-blur-md flex items-center gap-2"
                >
                  <Layers className="w-4 h-4 text-[#A3E635]" />
                  <span>Explore Architecture</span>
                </button>
              )}
            </div>
          </div>

          {/* Bottom HUD Metrics & Telemetry Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono border-t border-[#142C1F] pt-3 bg-black/50 -mx-4 -mb-4 sm:-mx-7 sm:-mb-7 px-4 sm:px-7 py-3 backdrop-blur-md">
            <div className="flex items-center gap-4 text-[#86EFAC] flex-wrap">
              <div className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>FPS: <strong>17.4</strong> (±0.4)</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>INFERENCE: <strong>32.4ms</strong></span>
              </div>
              <div className="hidden md:flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>mAP SCORE: <strong>88.4%</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-[#A3E635] animate-pulse" />
                <span>UPTIME: <strong>672 HRS CONTINUOUS</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-white/70">
              <span className="text-[10px]">MBUST AIoT LAB // J-NaNA VOL 5</span>
            </div>
          </div>
        </div>
      )}

      {/* Cybernetic Scanlines Filter Overlay */}
      {showScanlines && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(34, 197, 94, 0.25) 50%)',
            backgroundSize: '100% 4px',
          }}
        />
      )}

      {/* Corner Bracket Graphics */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#22C55E] pointer-events-none" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#22C55E] pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#22C55E] pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#22C55E] pointer-events-none" />
    </div>
  );
};
