import React from 'react';
import { Flame, ChevronRight, Terminal, Sparkles, Cpu } from 'lucide-react';

interface StreakBannerProps {
  currentStreakWeeks: number;
  onLogClick: () => void;
  daysRemainingThisWeek?: number;
}

export const StreakBanner: React.FC<StreakBannerProps> = ({
  currentStreakWeeks = 18,
  onLogClick,
  daysRemainingThisWeek = 2,
}) => {
  const daysOfWeek = [
    { day: 'M', completed: true },
    { day: 'T', completed: true },
    { day: 'W', completed: true },
    { day: 'T', completed: true },
    { day: 'F', completed: true },
    { day: 'S', completed: false, isTarget: true },
    { day: 'S', completed: false },
  ];

  return (
    <div className="relative overflow-hidden rounded-xl border border-[#D5E2D8] bg-gradient-to-r from-[#17382A] via-[#1B4332] to-[#25523D] text-[#FAF8F5] p-4 sm:p-5 shadow-xs">
      {/* Background Blueprint Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-15 overflow-hidden">
        <svg viewBox="0 0 800 200" className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M0,80 L200,80 L250,30 L450,30 L500,110 L700,110 L800,70"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <circle cx="250" cy="30" r="4" fill="#FFFFFF" />
          <circle cx="500" cy="110" r="4" fill="#FFFFFF" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left Side: Flame / Code Icon & Message */}
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-lg bg-[#2D5A27]/80 text-[#F5E6CC] border border-[#3E7437] shrink-0 mt-0.5">
            <Flame className="w-5 h-5 fill-current" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-medium tracking-wide uppercase text-[#B5DFCA]">
                Active Research &amp; Shipping Streak
              </span>
              <span aria-hidden="true" className="text-[#5A876F]">·</span>
              <span className="text-xs font-mono tabular-nums text-[#F5E6CC] font-semibold">
                {currentStreakWeeks} Consecutive Weeks
              </span>
            </div>

            <p className="text-sm font-serif font-bold text-white tracking-tight">
              Published YOLO Agricultural Research in Feb 2026 · Actively training next-gen Edge Vision weights
            </p>

            <p className="text-xs text-[#C6DACD] max-w-xl">
              28 field trials completed across Chitlang farmlands. Differentiating monkey foraging behavior with 88.4% precision.
            </p>
          </div>
        </div>

        {/* Right Side: Week Progress & Log Action */}
        <div className="flex items-center gap-3 shrink-0 self-end md:self-auto w-full md:w-auto justify-between md:justify-end">
          {/* Day dots mini indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-black/20 rounded-lg border border-white/10">
            {daysOfWeek.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <span className="text-[9px] text-[#A6C5B3] font-mono">{item.day}</span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.completed
                      ? 'bg-[#A3E635]'
                      : item.isTarget
                      ? 'bg-[#F59E0B] ring-2 ring-[#F59E0B]/40 animate-pulse'
                      : 'bg-white/20'
                  }`}
                />
              </div>
            ))}
          </div>

          <button
            onClick={onLogClick}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#14261C] bg-[#F5E6CC] hover:bg-[#FFF2DE] active:bg-[#EBD7B8] rounded-lg transition-colors whitespace-nowrap shadow-xs"
          >
            <span>Log Milestone</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
