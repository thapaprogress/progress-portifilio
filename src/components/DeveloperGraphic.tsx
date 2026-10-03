import React from 'react';

interface DeveloperGraphicProps {
  diagramType?: 'yolo_detection' | 'edge_hardware' | 'architecture_diagram' | 'field_trial' | 'prajna_system' | 'hsmm_kinematics' | 'unesco_shrine';
  className?: string;
}

export const DeveloperGraphic: React.FC<DeveloperGraphicProps> = ({
  diagramType = 'yolo_detection',
  className = 'w-full h-full',
}) => {
  if (diagramType === 'unesco_shrine') {
    return (
      <div className={`relative overflow-hidden bg-[#0C1B14] text-[#FAF8F5] ${className}`}>
        <svg viewBox="0 0 600 400" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="shrineSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1B3828" />
              <stop offset="100%" stopColor="#0B1A12" />
            </linearGradient>
          </defs>
          <rect width="600" height="400" fill="url(#shrineSky)" />
          {/* Kathmandu Pagoda Temple Shrine Silhouette */}
          <path d="M420,180 L490,130 L560,180 Z M440,130 L490,85 L540,130 Z M480,85 L490,50 L500,85 Z" fill="#183626" />
          <rect x="465" y="180" width="50" height="100" fill="#183626" />
          <path d="M0,280 L600,280 L600,400 L0,400 Z" fill="#122A1E" />

          {/* Bounding Box on Temple Steps */}
          <g transform="translate(160, 150)">
            <rect x="0" y="0" width="190" height="170" fill="rgba(34, 197, 94, 0.08)" stroke="#22C55E" strokeWidth="2" strokeDasharray="6 3" />
            <rect x="0" y="-24" width="180" height="24" fill="#22C55E" rx="3" />
            <text x="8" y="-7" fill="#000000" fontSize="11" fontFamily="monospace" fontWeight="bold">
              macaque: 88.4% [SENTINEL]
            </text>
            {/* 48D Pose skeleton */}
            <circle cx="95" cy="65" r="4" fill="#38BDF8" />
            <line x1="95" y1="65" x2="95" y2="115" stroke="#38BDF8" strokeWidth="2" />
            <line x1="95" y1="85" x2="65" y2="105" stroke="#38BDF8" strokeWidth="2" />
            <line x1="95" y1="85" x2="125" y2="105" stroke="#38BDF8" strokeWidth="2" />
            <circle cx="65" cy="105" r="3" fill="#38BDF8" />
            <circle cx="125" cy="105" r="3" fill="#38BDF8" />
          </g>

          <g fill="#A3E635" fontFamily="monospace" fontSize="11">
            <text x="24" y="32">J-NaNA VOL. 5 (21 PAGES) · 672-HR CONTINUOUS SHRINE DEPLOYMENT</text>
            <text x="24" y="52" fill="#86EFAC">YOLOv8n NCNN INT8 @ 15–18 FPS · 86.6% JITTER CUT</text>
          </g>
        </svg>
      </div>
    );
  }

  if (diagramType === 'hsmm_kinematics') {
    return (
      <div className={`relative overflow-hidden bg-[#0A1811] text-[#FAF8F5] ${className}`}>
        <svg viewBox="0 0 600 400" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="400" fill="#0A1811" />
          {/* HSMM Markov Nodes */}
          <g transform="translate(60, 180)">
            {/* State 1: Observing */}
            <circle cx="60" cy="0" r="45" fill="#142C1F" stroke="#22C55E" strokeWidth="2" />
            <text x="60" y="-6" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="12">OBSERVE</text>
            <text x="60" y="14" textAnchor="middle" fill="#86EFAC" fontFamily="monospace" fontSize="10">State S1</text>

            {/* Transition Arrow S1 -> S2 */}
            <path d="M 110,-10 Q 180,-40 250,-10" fill="none" stroke="#4ADE80" strokeWidth="2" />
            <text x="180" y="-35" textAnchor="middle" fill="#A7F3D0" fontFamily="monospace" fontSize="10">P(S2|S1) = 0.34</text>

            {/* State 2: Approaching */}
            <circle cx="300" cy="0" r="45" fill="#1F3A2A" stroke="#EAB308" strokeWidth="2" />
            <text x="300" y="-6" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="12">APPROACH</text>
            <text x="300" y="14" textAnchor="middle" fill="#FDE047" fontFamily="monospace" fontSize="10">State S2</text>

            {/* Transition Arrow S2 -> S3 */}
            <path d="M 350,-10 Q 420,-40 490,-10" fill="none" stroke="#EF4444" strokeWidth="2" />
            <text x="420" y="-35" textAnchor="middle" fill="#FCA5A5" fontFamily="monospace" fontSize="10">P(S3|S2) = 0.72</text>

            {/* State 3: Feeding Alert */}
            <circle cx="540" cy="0" r="45" fill="#2E1B1B" stroke="#EF4444" strokeWidth="2.5" />
            <text x="540" y="-6" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="12">FEEDING</text>
            <text x="540" y="14" textAnchor="middle" fill="#F87171" fontFamily="monospace" fontSize="10">🚨 ALERT TRIGGER</text>
          </g>

          <g fill="#A3E635" fontFamily="monospace" fontSize="11">
            <text x="24" y="32">DURATION-AWARE HSMM TEMPORAL SMOOTHING</text>
            <text x="24" y="52" fill="#86EFAC">ELIMINATES 86.6% CLASSIFICATION JITTER VIA ResNet18-BiLSTM</text>
          </g>
        </svg>
      </div>
    );
  }

  if (diagramType === 'yolo_detection') {
    return (
      <div className={`relative overflow-hidden bg-[#0F1E16] text-[#FAF8F5] ${className}`}>
        <svg
          viewBox="0 0 600 400"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bgField" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1B3325" />
              <stop offset="100%" stopColor="#0B1610" />
            </linearGradient>
            <pattern id="gridPattern" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#254B37" strokeWidth="0.5" strokeOpacity="0.4" />
            </pattern>
          </defs>

          {/* Background Field with Grid */}
          <rect width="600" height="400" fill="url(#bgField)" />
          <rect width="600" height="400" fill="url(#gridPattern)" />

          {/* Simulated Farmland Terraces in Nepal */}
          <path d="M0,240 Q150,220 300,245 T600,230 L600,400 L0,400 Z" fill="#14291D" opacity="0.8" />
          <path d="M0,290 Q200,270 400,295 T600,280 L600,400 L0,400 Z" fill="#0E1D15" />

          {/* Distant Hills Silhouette */}
          <path d="M0,180 L120,130 L220,160 L380,100 L500,150 L600,120 L600,240 L0,240 Z" fill="#183627" opacity="0.6" />

          {/* YOLO Detection Bounding Box 1: Active Feeding Macaque */}
          <g transform="translate(180, 140)">
            <rect
              x="0"
              y="0"
              width="210"
              height="180"
              fill="#22C55E"
              fillOpacity="0.08"
              stroke="#22C55E"
              strokeWidth="2.5"
              strokeDasharray="6 3"
            />
            <path d="M -2,15 L -2,-2 L 15,-2" fill="none" stroke="#22C55E" strokeWidth="3.5" />
            <path d="M 195,-2 L 212,-2 L 212,15" fill="none" stroke="#22C55E" strokeWidth="3.5" />
            <path d="M -2,165 L -2,182 L 15,182" fill="none" stroke="#22C55E" strokeWidth="3.5" />
            <path d="M 195,182 L 212,182 L 212,165" fill="none" stroke="#22C55E" strokeWidth="3.5" />

            <rect x="0" y="-24" width="200" height="24" fill="#22C55E" rx="3" />
            <text x="8" y="-7" fill="#0B1610" fontSize="11" fontFamily="monospace" fontWeight="bold">
              macaque: 88.4% [FEEDING]
            </text>

            <line x1="105" y1="80" x2="105" y2="100" stroke="#22C55E" strokeWidth="1.5" />
            <line x1="95" y1="90" x2="115" y2="90" stroke="#22C55E" strokeWidth="1.5" />
            <circle cx="105" cy="90" r="14" fill="none" stroke="#22C55E" strokeWidth="1" strokeDasharray="3 2" />

            <circle cx="105" cy="65" r="16" fill="#1B4332" stroke="#22C55E" strokeWidth="1" />
            <ellipse cx="105" cy="115" rx="28" ry="36" fill="#1B4332" stroke="#22C55E" strokeWidth="1" />
            <path d="M130,120 Q165,100 155,70" fill="none" stroke="#22C55E" strokeWidth="2" />
          </g>

          {/* Real-time telemetry HUD overlay */}
          <g fill="#A3E635" fontFamily="monospace" fontSize="11">
            <text x="24" y="32">IEEE DOI: 10.1109/ICTP67998.2026.11485402</text>
            <text x="24" y="52" fill="#86EFAC">MODEL: YOLOv8n NCNN ON RASPBERRY PI 5 · CONF: 0.88</text>
            <text x="440" y="32" textAnchor="end" fill="#FDE047">DISPATCH: SLACK WEBHOOK OK</text>
          </g>
        </svg>
      </div>
    );
  }

  if (diagramType === 'edge_hardware') {
    return (
      <div className={`relative overflow-hidden bg-[#0C1712] text-[#FAF8F5] ${className}`}>
        <svg viewBox="0 0 600 400" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="400" fill="#0E1D16" />
          {/* Raspberry Pi 5 Board outline */}
          <rect x="80" y="50" width="440" height="300" rx="12" fill="#132B20" stroke="#22C55E" strokeWidth="2" />

          {/* Processor / SoC */}
          <rect x="220" y="120" width="160" height="150" rx="8" fill="#1F3D2F" stroke="#86EFAC" strokeWidth="2" />
          <text x="300" y="175" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="bold" fontSize="14">
            RASPBERRY PI 5
          </text>
          <text x="300" y="198" textAnchor="middle" fill="#86EFAC" fontFamily="monospace" fontSize="11">
            Broadcom BCM2712 Quad Cortex-A76
          </text>
          <text x="300" y="218" textAnchor="middle" fill="#FDE047" fontFamily="monospace" fontSize="10">
            NCNN INT8 Acceleration @ 32ms
          </text>

          {/* Camera CSI Interface */}
          <rect x="105" y="160" width="45" height="80" rx="4" fill="#334155" stroke="#94A3B8" strokeWidth="1.5" />
          <text x="127" y="205" textAnchor="middle" fill="#CBD5E1" fontFamily="monospace" fontSize="9" transform="rotate(-90 127 205)">
            SONY IMX477 CSI
          </text>

          {/* Status LEDs */}
          <circle cx="115" cy="315" r="5" fill="#22C55E" />
          <text x="130" y="319" fill="#86EFAC" fontFamily="monospace" fontSize="10">SYS PWR</text>
          <circle cx="215" cy="315" r="5" fill="#EAB308" />
          <text x="230" y="319" fill="#FDE047" fontFamily="monospace" fontSize="10">INFERENCE 15-18 FPS</text>
        </svg>
      </div>
    );
  }

  if (diagramType === 'prajna_system') {
    return (
      <div className={`relative overflow-hidden bg-[#0A1610] text-[#FAF8F5] ${className}`}>
        <svg viewBox="0 0 600 400" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="400" fill="#0C1B13" />
          <circle cx="300" cy="200" r="64" fill="#1B4332" stroke="#4ADE80" strokeWidth="2.5" />
          <text x="300" y="196" textAnchor="middle" fill="#FFFFFF" fontFamily="serif" fontWeight="bold" fontSize="16">
            PRAJNA
          </text>
          <text x="300" y="216" textAnchor="middle" fill="#86EFAC" fontFamily="monospace" fontSize="10">
            DATA WISDOM ENGINE
          </text>

          {[
            { x: 130, y: 110, label: 'FastAPI Core', sub: 'REST & Webhooks' },
            { x: 470, y: 110, label: 'Vector Store', sub: 'Semantic Graphs' },
            { x: 130, y: 290, label: 'Edge Worker', sub: 'YOLO Pipelines' },
            { x: 470, y: 290, label: 'PostgreSQL', sub: 'Field Telemetry' },
          ].map((node, idx) => (
            <g key={idx}>
              <line x1="300" y1="200" x2={node.x} y2={node.y} stroke="#22C55E" strokeWidth="1.5" strokeOpacity="0.7" />
              <rect x={node.x - 70} y={node.y - 30} width="140" height="60" rx="8" fill="#142C1F" stroke="#34D399" strokeWidth="1.5" />
              <text x={node.x} y={node.y - 6} textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="bold" fontSize="12">
                {node.label}
              </text>
              <text x={node.x} y={node.y + 14} textAnchor="middle" fill="#A7F3D0" fontFamily="monospace" fontSize="9">
                {node.sub}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // Fallback to architecture diagram
  return (
    <div className={`relative overflow-hidden bg-[#0F2218] text-[#FAF8F5] ${className}`}>
      <svg viewBox="0 0 600 400" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
        <rect width="600" height="400" fill="#0D1E15" />
        <g transform="translate(40, 160)">
          <rect x="0" y="0" width="105" height="75" rx="8" fill="#183627" stroke="#4ADE80" strokeWidth="1.5" />
          <text x="52" y="34" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="11">RTSP Stream</text>
          <text x="52" y="52" textAnchor="middle" fill="#86EFAC" fontFamily="monospace" fontSize="9">1080p 30fps</text>

          <line x1="105" y1="37" x2="135" y2="37" stroke="#4ADE80" strokeWidth="2" />

          <rect x="135" y="0" width="115" height="75" rx="8" fill="#183627" stroke="#4ADE80" strokeWidth="1.5" />
          <text x="192" y="34" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="11">OpenCV Prep</text>
          <text x="192" y="52" textAnchor="middle" fill="#86EFAC" fontFamily="monospace" fontSize="9">NCNN INT8 Quant</text>

          <line x1="250" y1="37" x2="280" y2="37" stroke="#4ADE80" strokeWidth="2" />

          <rect x="280" y="-10" width="125" height="95" rx="8" fill="#1C4330" stroke="#FBBF24" strokeWidth="2" />
          <text x="342" y="30" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="12">YOLOv8n + HSMM</text>
          <text x="342" y="48" textAnchor="middle" fill="#FDE68A" fontFamily="monospace" fontSize="9">15-18 FPS · 88.4%</text>
          <text x="342" y="66" textAnchor="middle" fill="#BBF7D0" fontFamily="monospace" fontSize="8">86.6% Jitter Reduction</text>

          <line x1="405" y1="37" x2="435" y2="37" stroke="#4ADE80" strokeWidth="2" />

          <rect x="435" y="0" width="115" height="75" rx="8" fill="#183627" stroke="#4ADE80" strokeWidth="1.5" />
          <text x="492" y="34" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="11">Slack Pipeline</text>
          <text x="492" y="52" textAnchor="middle" fill="#86EFAC" fontFamily="monospace" fontSize="9">DOI: 10.1109/ICTP...</text>
        </g>
      </svg>
    </div>
  );
};
