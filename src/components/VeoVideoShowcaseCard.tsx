import React, { useState } from 'react';
import { Film, Play, Pause, Sparkles, Volume2, VolumeX, Maximize2, Download } from 'lucide-react';

interface VeoVideoShowcaseCardProps {
  onOpenVideoStudio: () => void;
  videoUrl?: string | null;
}

export const VeoVideoShowcaseCard: React.FC<VeoVideoShowcaseCardProps> = ({
  onOpenVideoStudio,
  videoUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-[#07140B] border border-[#1B4332] shadow-md text-white select-none">
      {/* Top Banner Header */}
      <div className="bg-[#050D08] px-3.5 py-2.5 border-b border-[#142C1F] flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          <span className="font-mono font-bold uppercase text-[10px] text-[#86EFAC] tracking-wider">
            VEO PORTRAIT MOTION VIDEO
          </span>
        </div>
        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#142C1F] text-[#86EFAC] border border-[#2D5A27]">
          veo-3.1-fast-generate-preview
        </span>
      </div>

      {/* Video Viewport: Living Portrait Video */}
      <div className="relative aspect-video w-full bg-black overflow-hidden group">
        {videoUrl ? (
          <video
            src={videoUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          /* High-Fidelity Animated Living Portrait Simulation */
          <div className="w-full h-full relative flex items-center justify-center bg-radial from-[#122B1E] via-[#08170F] to-[#030805]">
            {/* Ambient Animated Cybernetic Light Rays */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#22C55E]/15 via-transparent to-[#38BDF8]/15 animate-pulse" />

            {/* Living Formal Portrait of Progress Jung Thapa */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-[#22C55E]/60 shadow-[0_0_25px_rgba(34,197,94,0.35)] animate-float">
              <svg
                className="w-full h-full"
                viewBox="0 0 200 200"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <linearGradient id="sc_skin" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#E0AC84" />
                    <stop offset="100%" stopColor="#AF754E" />
                  </linearGradient>
                </defs>
                <rect width="200" height="200" fill="#FFFFFF" />
                <path d="M48,80 C44,45 65,18 100,18 C135,18 156,45 152,80 C156,98 152,122 144,135 C136,110 138,85 138,70 C138,38 122,25 100,25 C78,25 62,38 62,70 C62,85 64,110 56,135 C48,122 44,98 48,80 Z" fill="#171717" />
                <path d="M0,158 C25,146 55,140 100,140 C145,140 175,146 200,158 L200,200 L0,200 Z" fill="#18181B" />
                <polygon points="72,142 128,142 100,186" fill="#FFFFFF" />
                <polygon points="72,142 86,172 100,165 88,142" fill="#F8FAFC" />
                <polygon points="128,142 114,172 100,165 112,142" fill="#F8FAFC" />
                <polygon points="94,164 106,164 103,174 97,174" fill="#0C0A09" />
                <polygon points="96,174 104,174 108,200 92,200" fill="#0C0A09" />
                <path d="M40,155 L74,180 L76,200 L25,200 Z" fill="#18181B" />
                <path d="M160,155 L126,180 L124,200 L175,200 Z" fill="#18181B" />
                <rect x="85" y="112" width="30" height="35" rx="4" fill="url(#sc_skin)" />
                <ellipse cx="100" cy="85" rx="42" ry="50" fill="url(#sc_skin)" />
                <path d="M58,68 C62,40 76,28 100,28 C124,28 138,40 142,68 C135,52 120,44 100,45 C80,44 65,52 58,68 Z" fill="#171717" />
                <ellipse cx="58" cy="86" rx="6" ry="12" fill="#C99066" />
                <ellipse cx="142" cy="86" rx="6" ry="12" fill="#C99066" />
                <path d="M72,70 Q84,65 94,70" fill="none" stroke="#171717" strokeWidth="4" strokeLinecap="round" />
                <path d="M106,70 Q116,65 128,70" fill="none" stroke="#171717" strokeWidth="4" strokeLinecap="round" />
                <ellipse cx="83" cy="78" rx="8" ry="5.5" fill="#FAF5F0" />
                <ellipse cx="117" cy="78" rx="8" ry="5.5" fill="#FAF5F0" />
                <circle cx="83" cy="78" r="4.2" fill="#3D2314" />
                <circle cx="117" cy="78" r="4.2" fill="#3D2314" />
                <circle cx="84.5" cy="76.5" r="1.2" fill="#FFFFFF" />
                <circle cx="118.5" cy="76.5" r="1.2" fill="#FFFFFF" />
                <ellipse cx="100" cy="94" rx="5" ry="3" fill="#A86F49" />
                <path d="M86,102 Q94,98 100,102 Q106,98 114,102 C122,106 116,112 108,109 Q100,106 92,109 C84,112 78,106 86,102 Z" fill="#171717" />
                <path d="M58,86 C58,110 65,138 100,140 C135,138 142,110 142,86 C138,98 132,122 122,128 C114,133 86,133 78,128 C68,122 62,98 58,86 Z" fill="#171717" />
              </svg>
            </div>

            {/* Subtle Scanlines Overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(34, 197, 94, 0.25) 50%)',
                backgroundSize: '100% 4px',
              }}
            />
          </div>
        )}

        {/* Hover Overlay Controls */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={onOpenVideoStudio}
            className="px-3.5 py-1.5 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-black text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg transform hover:scale-105 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate New with Veo</span>
          </button>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-3 bg-[#050D08] flex items-center justify-between gap-2 text-xs">
        <div className="text-[11px] font-mono text-[#86EFAC] truncate">
          Portrait Animated by Veo AI
        </div>

        <button
          onClick={onOpenVideoStudio}
          className="px-2.5 py-1 rounded-lg bg-[#142C1F] hover:bg-[#1B4332] text-white text-[11px] font-mono font-semibold border border-[#2D5A27] transition-colors flex items-center gap-1 shrink-0"
        >
          <Film className="w-3 h-3 text-[#22C55E]" />
          <span>Veo Studio</span>
        </button>
      </div>
    </div>
  );
};
