import React, { useState, useEffect, useRef } from 'react';
import { RealisticCameraVisual } from './RealisticCameraVisual';
import {
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Volume2,
  VolumeX,
  Layers,
  Activity,
  Bell,
  CheckCircle2,
  Cpu,
  Eye,
  Sliders,
  Sparkles,
  Camera,
  Download,
  AlertTriangle,
  Radio,
  ExternalLink,
  Youtube,
  ShieldAlert,
} from 'lucide-react';

interface CameraChannel {
  id: 'shrine' | 'farm' | 'canopy' | 'thermal' | 'hardware';
  name: string;
  location: string;
  gps: string;
  imageUrl: string;
  defaultConfidence: number;
  boxCoords: { x: number; y: number; width: number; height: number };
  keypoints: { x: number; y: number; label: string }[];
  connections: [number, number][];
}

export const EdgeVideoPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeChannelId, setActiveChannelId] = useState<'shrine' | 'farm' | 'canopy' | 'thermal' | 'hardware'>('shrine');
  const [renderMode, setRenderMode] = useState<'realistic_composite' | 'camera_photo'>('realistic_composite');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [showKinematicPose, setShowKinematicPose] = useState(true);
  const [showTelemetryOSD, setShowTelemetryOSD] = useState(true);
  const [showSlackAlert, setShowSlackAlert] = useState(false);
  const [fps, setFps] = useState(17.4);
  const [timestamp, setTimestamp] = useState('');
  const [capturedSnapshot, setCapturedSnapshot] = useState<string | null>(null);

  // Behavioral states per J-NaNA paper
  const [behaviorState, setBehaviorState] = useState<'OBSERVING' | 'FEEDING' | 'APPROACHING'>('OBSERVING');
  const [dwellSeconds, setDwellSeconds] = useState(14);

  const containerRef = useRef<HTMLDivElement>(null);

  const channels: CameraChannel[] = [
    {
      id: 'shrine',
      name: 'Cam 01: Swayambhunath UNESCO Shrine',
      location: 'Swayambhunath Stupa (672-hr Continuous Deployment)',
      gps: '27.7149° N, 85.2904° E · Alt: 1,420m',
      imageUrl: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=1400&q=85',
      defaultConfidence: 94.8,
      boxCoords: { x: 38, y: 22, width: 28, height: 56 },
      keypoints: [
        { x: 50, y: 32, label: 'Nose' },
        { x: 48, y: 29, label: 'L_Eye' },
        { x: 52, y: 29, label: 'R_Eye' },
        { x: 46, y: 38, label: 'L_Shoulder' },
        { x: 54, y: 38, label: 'R_Shoulder' },
        { x: 44, y: 48, label: 'L_Elbow' },
        { x: 56, y: 48, label: 'R_Elbow' },
        { x: 43, y: 56, label: 'L_Wrist' },
        { x: 57, y: 56, label: 'R_Wrist' },
        { x: 47, y: 58, label: 'L_Hip' },
        { x: 53, y: 58, label: 'R_Hip' },
        { x: 46, y: 68, label: 'L_Knee' },
        { x: 54, y: 68, label: 'R_Knee' },
        { x: 45, y: 74, label: 'L_Ankle' },
        { x: 55, y: 74, label: 'R_Ankle' },
      ],
      connections: [
        [0, 1], [0, 2], [3, 4], [3, 5], [4, 6], [5, 7], [6, 8],
        [3, 9], [4, 10], [9, 10], [9, 11], [10, 12], [11, 13], [12, 14],
      ],
    },
    {
      id: 'farm',
      name: 'Cam 02: Chitlang Valley Maize Terrace',
      location: 'Chitlang Farm Perimeter Wall (IEEE ICTP 2026 Trial)',
      gps: '27.6180° N, 85.1610° E · Alt: 1,750m',
      imageUrl: 'https://images.unsplash.com/photo-1570288685369-f7305163d0e3?auto=format&fit=crop&w=1400&q=85',
      defaultConfidence: 91.2,
      boxCoords: { x: 42, y: 26, width: 32, height: 58 },
      keypoints: [
        { x: 54, y: 35, label: 'Nose' },
        { x: 51, y: 32, label: 'L_Eye' },
        { x: 57, y: 32, label: 'R_Eye' },
        { x: 48, y: 42, label: 'L_Shoulder' },
        { x: 60, y: 42, label: 'R_Shoulder' },
        { x: 45, y: 52, label: 'L_Elbow' },
        { x: 63, y: 52, label: 'R_Elbow' },
        { x: 44, y: 62, label: 'L_Wrist' },
        { x: 64, y: 62, label: 'R_Wrist' },
        { x: 49, y: 63, label: 'L_Hip' },
        { x: 59, y: 63, label: 'R_Hip' },
        { x: 48, y: 72, label: 'L_Knee' },
        { x: 60, y: 72, label: 'R_Knee' },
        { x: 47, y: 80, label: 'L_Ankle' },
        { x: 61, y: 80, label: 'R_Ankle' },
      ],
      connections: [
        [0, 1], [0, 2], [3, 4], [3, 5], [4, 6], [5, 7], [6, 8],
        [3, 9], [4, 10], [9, 10], [9, 11], [10, 12], [11, 13], [12, 14],
      ],
    },
    {
      id: 'canopy',
      name: 'Cam 03: Pashupatinath Sacred Canopy',
      location: 'Temple Forest Upper Canopy Station',
      gps: '27.7104° N, 85.3487° E · Alt: 1,350m',
      imageUrl: 'https://images.unsplash.com/photo-1574063413132-355dbfd83e23?auto=format&fit=crop&w=1400&q=85',
      defaultConfidence: 89.6,
      boxCoords: { x: 30, y: 18, width: 36, height: 64 },
      keypoints: [
        { x: 48, y: 28, label: 'Nose' },
        { x: 45, y: 25, label: 'L_Eye' },
        { x: 51, y: 25, label: 'R_Eye' },
        { x: 42, y: 36, label: 'L_Shoulder' },
        { x: 54, y: 36, label: 'R_Shoulder' },
        { x: 38, y: 46, label: 'L_Elbow' },
        { x: 58, y: 46, label: 'R_Elbow' },
        { x: 36, y: 56, label: 'L_Wrist' },
        { x: 60, y: 56, label: 'R_Wrist' },
        { x: 43, y: 58, label: 'L_Hip' },
        { x: 53, y: 58, label: 'R_Hip' },
        { x: 42, y: 68, label: 'L_Knee' },
        { x: 54, y: 68, label: 'R_Knee' },
        { x: 41, y: 78, label: 'L_Ankle' },
        { x: 55, y: 78, label: 'R_Ankle' },
      ],
      connections: [
        [0, 1], [0, 2], [3, 4], [3, 5], [4, 6], [5, 7], [6, 8],
        [3, 9], [4, 10], [9, 10], [9, 11], [10, 12], [11, 13], [12, 14],
      ],
    },
    {
      id: 'thermal',
      name: 'Cam 04: FLIR Infrared Night Vision',
      location: 'Nocturnal Wildlife Perimeter Fence',
      gps: '27.6185° N, 85.1620° E · Alt: 1,760m',
      imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1400&q=85',
      defaultConfidence: 96.1,
      boxCoords: { x: 35, y: 25, width: 34, height: 54 },
      keypoints: [
        { x: 52, y: 34, label: 'Nose' },
        { x: 49, y: 31, label: 'L_Eye' },
        { x: 55, y: 31, label: 'R_Eye' },
        { x: 46, y: 40, label: 'L_Shoulder' },
        { x: 58, y: 40, label: 'R_Shoulder' },
        { x: 42, y: 50, label: 'L_Elbow' },
        { x: 62, y: 50, label: 'R_Elbow' },
        { x: 40, y: 60, label: 'L_Wrist' },
        { x: 64, y: 60, label: 'R_Wrist' },
        { x: 48, y: 62, label: 'L_Hip' },
        { x: 56, y: 62, label: 'R_Hip' },
        { x: 46, y: 70, label: 'L_Knee' },
        { x: 58, y: 70, label: 'R_Knee' },
        { x: 45, y: 76, label: 'L_Ankle' },
        { x: 59, y: 76, label: 'R_Ankle' },
      ],
      connections: [
        [0, 1], [0, 2], [3, 4], [3, 5], [4, 6], [5, 7], [6, 8],
        [3, 9], [4, 10], [9, 10], [9, 11], [10, 12], [11, 13], [12, 14],
      ],
    },
    {
      id: 'hardware',
      name: 'Cam 05: Raspberry Pi 5 & NCNN Lab Testbed',
      location: 'MBUST Institute of Applied Sciences Lab Bench',
      gps: '27.7172° N, 85.3240° E · Alt: 1,320m',
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=85',
      defaultConfidence: 99.4,
      boxCoords: { x: 28, y: 22, width: 44, height: 56 },
      keypoints: [
        { x: 50, y: 40, label: 'RPi5_SoC' },
        { x: 38, y: 35, label: 'Camera_CSI' },
        { x: 62, y: 35, label: 'Active_Cooler' },
        { x: 50, y: 60, label: 'NCNN_INT8' },
      ],
      connections: [[0, 1], [0, 2], [0, 3]],
    },
  ];

  const currentChannel = channels.find((c) => c.id === activeChannelId) || channels[0];

  // Live timestamp clock update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const pad = (n: number) => n.toString().padStart(2, '0');
      const ms = now.getMilliseconds().toString().padStart(3, '0');
      const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
      const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${ms}`;
      setTimestamp(`${dateStr} ${timeStr} UTC`);
    };
    updateTime();
    const interval = setInterval(updateTime, 100);
    return () => clearInterval(interval);
  }, []);

  // Minor realistic FPS micro-fluctuations (15 - 18 FPS per J-NaNA paper)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setFps(+(16.4 + Math.sin(Date.now() / 900) * 1.4).toFixed(1));
      setDwellSeconds((prev) => (prev > 0 ? prev - 1 : 18));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Periodic simulated behavior transition (Observing -> Approaching -> Feeding)
  useEffect(() => {
    const states: ('OBSERVING' | 'FEEDING' | 'APPROACHING')[] = ['OBSERVING', 'APPROACHING', 'FEEDING'];
    const interval = setInterval(() => {
      if (isPlaying) {
        const next = states[(states.indexOf(behaviorState) + 1) % states.length];
        setBehaviorState(next);
        if (next === 'FEEDING') {
          setShowSlackAlert(true);
          setTimeout(() => setShowSlackAlert(false), 5000);
        }
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [isPlaying, behaviorState]);

  const handleTriggerIntrusion = () => {
    setBehaviorState('FEEDING');
    setShowSlackAlert(true);
    setTimeout(() => setShowSlackAlert(false), 6000);
  };

  const handleCaptureSnapshot = () => {
    setCapturedSnapshot(currentChannel.imageUrl);
    setTimeout(() => setCapturedSnapshot(null), 3500);
  };

  return (
    <div
      ref={containerRef}
      className="bg-[#07130C] text-[#FAF8F5] rounded-3xl border border-[#1B4332] overflow-hidden shadow-2xl flex flex-col select-none"
    >
      {/* Top Telemetry / CCTV Header Bar */}
      <div className="bg-[#050E09] px-4 sm:px-6 py-3 border-b border-[#142C1F] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="font-mono font-bold tracking-wider text-white uppercase text-[11px]">
              LIVE RTSP EDGE FEED · {currentChannel.name}
            </span>
          </div>

          <span className="hidden sm:inline font-mono text-[#86EFAC] text-[11px]">
            {currentChannel.gps}
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px] text-[#A7F3D0]">
          <span>
            FPS: <strong className="text-white">{fps}</strong> (15–18 FPS NCNN INT8)
          </span>
          <span className="hidden sm:inline text-[#1B4332]">|</span>
          <span className="hidden sm:inline">
            LATENCY: <strong className="text-[#A3E635]">32ms</strong>
          </span>
          <span className="hidden md:inline text-[#1B4332]">|</span>
          <a
            href="https://www.youtube.com/@pjt247"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold transition-colors"
          >
            <Youtube className="w-3 h-3 fill-current" />
            <span>YouTube @pjt247</span>
          </a>
        </div>
      </div>

      {/* Main Realistic Photographic Video Viewport */}
      <div className="relative w-full aspect-[16/9] bg-black overflow-hidden group">
        {/* Real Field Scene / Photograph Backdrop */}
        {renderMode === 'realistic_composite' || imageErrors[currentChannel.id] ? (
          <div className="w-full h-full">
            <RealisticCameraVisual
              channelId={currentChannel.id}
              behaviorState={behaviorState}
              fps={fps}
            />
          </div>
        ) : (
          <img
            src={currentChannel.imageUrl}
            alt={currentChannel.name}
            referrerPolicy="no-referrer"
            onError={() =>
              setImageErrors((prev) => ({ ...prev, [currentChannel.id]: true }))
            }
            className={`w-full h-full object-cover transition-all duration-700 ${
              activeChannelId === 'thermal'
                ? 'brightness-125 contrast-150 hue-rotate-180 invert'
                : 'brightness-95 contrast-105'
            }`}
          />
        )}

        {/* Security Camera Vignette & Subtle Scanlines Overlay */}
        <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage:
              'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.35) 50%)',
            backgroundSize: '100% 4px',
          }}
        />

        {/* Real-Time Security Camera On-Screen Display (OSD) */}
        {showTelemetryOSD && (
          <>
            {/* Top Left OSD */}
            <div className="absolute top-4 left-4 z-10 font-mono text-xs text-white/90 bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10 space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-bold tracking-wider">REC ● {timestamp}</span>
              </div>
              <div className="text-[10px] text-[#A7F3D0]">
                CAMERA ID: {currentChannel.id.toUpperCase()}_IMX477_1080P
              </div>
              <div className="text-[10px] text-white/70">
                BITRATE: 4.2 Mbps H.264 · NCNN INT8 CALIBRATED
              </div>
            </div>

            {/* Top Right OSD */}
            <div className="absolute top-4 right-4 z-10 font-mono text-xs text-right bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10 text-white/90">
              <div className="text-[#A3E635] font-bold">1920x1080 @ {fps} FPS</div>
              <div className="text-[10px] text-white/70">SOFIA-HSMM: DWELL {dwellSeconds}s</div>
              <div className="text-[10px] text-emerald-400 font-semibold">
                STATE: {behaviorState}
              </div>
            </div>
          </>
        )}

        {/* Realistic Computer Vision Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          {/* 48D Kinematic Skeletal Pose Lines */}
          {showKinematicPose && (
            <svg className="w-full h-full absolute inset-0">
              {currentChannel.connections.map(([fromIdx, toIdx], cIdx) => {
                const p1 = currentChannel.keypoints[fromIdx];
                const p2 = currentChannel.keypoints[toIdx];
                if (!p1 || !p2) return null;
                return (
                  <line
                    key={cIdx}
                    x1={`${p1.x}%`}
                    y1={`${p1.y}%`}
                    x2={`${p2.x}%`}
                    y2={`${p2.y}%`}
                    stroke="#38BDF8"
                    strokeWidth="2.5"
                    strokeOpacity="0.85"
                  />
                );
              })}

              {currentChannel.keypoints.map((kp, kpIdx) => (
                <g key={kpIdx}>
                  <circle
                    cx={`${kp.x}%`}
                    cy={`${kp.y}%`}
                    r="4"
                    fill="#38BDF8"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                </g>
              ))}
            </svg>
          )}

          {/* YOLOv8n Bounding Box Overlay */}
          {showBoundingBoxes && (
            <div
              className="absolute transition-all duration-300 pointer-events-auto"
              style={{
                left: `${currentChannel.boxCoords.x}%`,
                top: `${currentChannel.boxCoords.y}%`,
                width: `${currentChannel.boxCoords.width}%`,
                height: `${currentChannel.boxCoords.height}%`,
              }}
            >
              {/* Outer Bounding Box */}
              <div
                className={`w-full h-full border-2 rounded-lg relative transition-colors ${
                  behaviorState === 'FEEDING'
                    ? 'border-red-500 bg-red-500/15 shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                    : 'border-[#22C55E] bg-[#22C55E]/10 shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                }`}
              >
                {/* Corner Bracket Reticles */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-white" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-white" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-white" />

                {/* YOLO Classification Pill */}
                <div
                  className={`absolute -top-7 left-0 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold text-black flex items-center gap-1.5 shadow-md ${
                    behaviorState === 'FEEDING' ? 'bg-red-500 text-white' : 'bg-[#22C55E]'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  <span>macaque: {currentChannel.defaultConfidence}%</span>
                  <span className="font-mono text-[9px] px-1 rounded bg-black/30 text-white">
                    {behaviorState}
                  </span>
                </div>

                {/* Real-time Bounding Box Coordinates Telemetry */}
                <div className="absolute -bottom-5 left-0 text-[9px] font-mono text-white/90 bg-black/70 px-1.5 rounded">
                  POS: [{currentChannel.boxCoords.x}%, {currentChannel.boxCoords.y}%] · 48D KINEMATICS
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Real-Time Slack Webhook Alert Banner (Animated on Intrusion) */}
        {showSlackAlert && (
          <div className="absolute top-16 inset-x-4 sm:inset-x-12 z-30 animate-bounce">
            <div className="bg-[#142E1F] border-2 border-red-500 text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-lg">
                  <ShieldAlert className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400">
                      SLACK WEBHOOK ALERT DISPATCHED
                    </span>
                    <span className="text-[10px] font-mono text-white/70">LATENCY: 1.18s</span>
                  </div>
                  <h4 className="text-sm font-serif font-bold text-white">
                    Crop Perimeter Intrusion Confirmed (Chitlang Maize Terrace)
                  </h4>
                  <p className="text-[11px] font-mono text-[#A7F3D0] mt-0.5">
                    High-res JPEG crop dispatched to #farm-alerts Slack channel with GPS coordinates.
                  </p>
                </div>
              </div>

              <a
                href="https://www.youtube.com/@pjt247"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold whitespace-nowrap shadow-xs"
              >
                <Youtube className="w-3.5 h-3.5 fill-current" />
                <span>Field Video @pjt247</span>
              </a>
            </div>
          </div>
        )}

        {/* Snapshot Capture Feedback Flash */}
        {capturedSnapshot && (
          <div className="absolute inset-0 bg-white/30 z-30 pointer-events-none flex items-center justify-center transition-opacity">
            <div className="bg-black/90 text-white px-4 py-2 rounded-xl font-mono text-xs flex items-center gap-2 border border-white/20 shadow-2xl">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
              <span>Snapshot Captured with Detections!</span>
            </div>
          </div>
        )}
      </div>

      {/* Control Tray Bar */}
      <div className="p-4 sm:p-5 bg-[#050E09] border-t border-[#142C1F] space-y-4">
        {/* Row 1: Camera Channel Switcher Thumbnails */}
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#86EFAC] block mb-2 font-bold">
            SWITCH REAL FIELD CAMERA CHANNELS (5 LOCATIONS)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {channels.map((chan) => (
              <button
                key={chan.id}
                onClick={() => setActiveChannelId(chan.id)}
                className={`p-2 rounded-xl border text-left transition-all flex flex-col gap-1.5 overflow-hidden group ${
                  activeChannelId === chan.id
                    ? 'bg-[#142C1F] border-[#22C55E] ring-1 ring-[#22C55E]'
                    : 'bg-[#0B1A12] border-[#1B4332] hover:bg-[#102419] opacity-80 hover:opacity-100'
                }`}
              >
                <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black">
                  <img
                    src={chan.imageUrl}
                    alt={chan.name}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setImageErrors((prev) => ({ ...prev, [chan.id]: true }))
                    }
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {activeChannelId === chan.id && (
                    <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
                  )}
                </div>
                <div className="text-[11px] font-serif font-bold text-white truncate">
                  {chan.name.split(':')[1] || chan.name}
                </div>
                <span className="text-[9px] font-mono text-[#86EFAC] truncate">
                  {chan.location.split('(')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Video Operations, Toggles, and Trigger Simulation */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#142C1F] text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1.5 rounded-lg bg-[#142C1F] hover:bg-[#1B4332] text-white font-mono text-xs flex items-center gap-1.5 border border-[#2D5A27] shadow-xs"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlaying ? 'Pause Feed' : 'Resume Feed'}</span>
            </button>

            <button
              onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-colors flex items-center gap-1.5 border ${
                showBoundingBoxes
                  ? 'bg-[#22C55E] text-black font-bold border-[#22C55E]'
                  : 'bg-[#142C1F] text-white/70 border-[#2D5A27]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>YOLO Boxes: {showBoundingBoxes ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => setShowKinematicPose(!showKinematicPose)}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-colors flex items-center gap-1.5 border ${
                showKinematicPose
                  ? 'bg-[#38BDF8] text-black font-bold border-[#38BDF8]'
                  : 'bg-[#142C1F] text-white/70 border-[#2D5A27]'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>48D Pose: {showKinematicPose ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => setShowTelemetryOSD(!showTelemetryOSD)}
              className="px-2.5 py-1.5 rounded-lg bg-[#142C1F] hover:bg-[#1B4332] text-white font-mono text-xs border border-[#2D5A27]"
              title="Toggle Security Camera OSD text"
            >
              OSD: {showTelemetryOSD ? 'Show' : 'Hide'}
            </button>

            <button
              onClick={() =>
                setRenderMode(
                  renderMode === 'realistic_composite'
                    ? 'camera_photo'
                    : 'realistic_composite'
                )
              }
              className="px-2.5 py-1.5 rounded-lg bg-[#142C1F] hover:bg-[#1B4332] text-[#86EFAC] font-mono text-xs border border-[#2D5A27] flex items-center gap-1.5"
              title="Toggle between photorealistic vector scene and camera photo"
            >
              <Sparkles className="w-3 h-3 text-[#22C55E]" />
              <span>
                Mode: {renderMode === 'realistic_composite' ? 'Real Scene' : 'Photo Lens'}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://www.youtube.com/@pjt247"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Youtube className="w-3.5 h-3.5 fill-current" />
              <span>YouTube @pjt247</span>
            </a>
            <button
              onClick={handleCaptureSnapshot}
              className="px-3 py-1.5 rounded-lg bg-[#142C1F] hover:bg-[#1B4332] text-white font-mono text-xs flex items-center gap-1.5 border border-[#2D5A27]"
              title="Capture real-time frame snapshot"
            >
              <Camera className="w-3.5 h-3.5 text-[#A3E635]" />
              <span>Snapshot</span>
            </button>

            <button
              onClick={handleTriggerIntrusion}
              className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-mono font-bold text-xs flex items-center gap-1.5 shadow-md"
              title="Simulate primate crop breach and trigger instant Slack webhook"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Trigger Intrusion Alert</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
