import React from 'react';
import { AchievementBadge, ResearchCollaborator } from '../types/portfolio';
import {
  TrendingUp,
  Cpu,
  Award,
  Users,
  Check,
  UserPlus,
  Activity,
  CheckCircle2,
  Terminal,
  ShieldCheck,
} from 'lucide-react';

interface DeveloperStatRailProps {
  totalCommits: number;
  publicationsCount: number;
  fieldTrialsCount: number;
  modelAccuracyScore: string;
  badges: AchievementBadge[];
  collaborators: ResearchCollaborator[];
  onToggleConnectCollaborator: (id: string) => void;
  onOpenBadgeDetails?: (badge: AchievementBadge) => void;
}

export const DeveloperStatRail: React.FC<DeveloperStatRailProps> = ({
  totalCommits,
  publicationsCount,
  fieldTrialsCount,
  modelAccuracyScore,
  badges,
  collaborators,
  onToggleConnectCollaborator,
  onOpenBadgeDetails,
}) => {
  // Monthly commits & training evaluations
  const monthlyActivity = [
    { month: 'Apr', count: 180, label: '180 commits' },
    { month: 'May', count: 240, label: '240 commits' },
    { month: 'Jun', count: 310, label: '310 commits' },
    { month: 'Jul', count: 290, label: '290 commits' },
    { month: 'Aug', count: 220, label: '220 commits' },
    { month: 'Sep', count: 180, label: '180 commits' },
  ];
  const maxActivity = Math.max(...monthlyActivity.map((m) => m.count));

  return (
    <aside className="w-full space-y-5">
      {/* 2026 Developer & Research Rail */}
      <div className="bg-white rounded-xl border border-[#E8E2D5] p-5 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#1B4332]" />
            <h2 className="text-sm font-serif font-bold text-[#14261C]">
              2026 Research Rail
            </h2>
          </div>
          <span className="text-[11px] font-mono text-[#627568]">MBUST &amp; Prajna</span>
        </div>

        {/* Primary Stat Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#EDE7DC]">
            <span className="text-[11px] text-[#55695C] block">Total Commits</span>
            <div className="text-lg font-mono tabular-nums font-bold text-[#14261C] mt-0.5">
              {totalCommits.toLocaleString()}
            </div>
            <div className="text-[10px] text-[#2D5A27] font-medium mt-1">
              +32% research velocity
            </div>
          </div>

          <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#EDE7DC]">
            <span className="text-[11px] text-[#55695C] block">Model Precision</span>
            <div className="text-lg font-mono tabular-nums font-bold text-[#14261C] mt-0.5">
              {modelAccuracyScore}
            </div>
            <div className="text-[10px] text-[#63756A] mt-1">
              Across 28 field trials
            </div>
          </div>
        </div>

        {/* Monthly Activity Mini Bar Chart */}
        <div className="border-t border-[#F0ECE1] pt-3.5">
          <div className="flex items-center justify-between text-xs text-[#526357] mb-2 font-medium">
            <span>Commit &amp; Training Activity</span>
            <span className="font-mono tabular-nums text-[10px] text-[#7A8C80]">
              Peak: 310 runs (Jun)
            </span>
          </div>

          <div className="flex items-end justify-between gap-1.5 h-18 pt-2">
            {monthlyActivity.map((item, idx) => {
              const heightPct = Math.round((item.count / maxActivity) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="w-full bg-[#FAF8F5] rounded-t flex items-end justify-center h-14">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full max-w-[20px] bg-[#1B4332] group-hover:bg-[#2D5A27] rounded-t transition-all relative"
                    >
                      {/* Tooltip on hover */}
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#14261C] text-white text-[9px] font-mono px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                        {item.label}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#6A7C70]">{item.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Architecture Discipline */}
        <div className="mt-3.5 pt-3 border-t border-[#F0ECE1] flex items-center justify-between text-xs text-[#526357]">
          <span>Philosophy</span>
          <span className="font-mono tabular-nums font-bold text-[#1B4332]">
            The Conscious Architect
          </span>
        </div>
      </div>

      {/* Lab Systems & Hardware Telemetry Status */}
      <div className="bg-[#FAF8F5] rounded-xl border border-[#E5DFD4] p-4 text-xs">
        <div className="flex items-center gap-2 mb-2 font-semibold text-[#1B4332]">
          <Activity className="w-4 h-4 text-[#2D5A27]" />
          <span>Active Edge Lab &amp; System Health</span>
        </div>

        <div className="space-y-2 text-[#435448] leading-relaxed">
          <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-[#E8E2D5]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5A27] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-[#14261C]">MBUST Vision Lab Server</p>
              <p className="text-[11px] text-[#63756A] mt-0.5">
                Model checkpoint v2.4 synced · CUDA TensorRT inference nominal (32ms).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-[#E8E2D5]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5A27] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-[#14261C]">Chitlang Field Stations</p>
              <p className="text-[11px] text-[#63756A] mt-0.5">
                Solar battery reserve 94% · LoRa &amp; Cellular gateways heartbeat active.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Badges & Recognition */}
      <div className="bg-white rounded-xl border border-[#E8E2D5] p-5 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#1B4332]" />
            <h2 className="text-sm font-serif font-bold text-[#14261C]">
              Honors &amp; Badges
            </h2>
          </div>
          <span className="text-xs font-mono text-[#6A7C70] tabular-nums">
            {badges.length} verified
          </span>
        </div>

        <div className="space-y-2.5">
          {badges.map((badge) => (
            <div
              key={badge.id}
              onClick={() => onOpenBadgeDetails?.(badge)}
              className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#EAE4D9] hover:bg-[#F4EFE5] transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-[#14261C]">
                  {badge.title}
                </p>
                <span className="text-[10px] font-mono font-medium text-[#1B4332] bg-[#E3EFE6] px-1.5 py-0.5 rounded">
                  {badge.tier}
                </span>
              </div>
              <p className="text-[11px] text-[#55695C] mt-1 leading-snug">
                {badge.description}
              </p>
              <div className="mt-1 text-[10px] text-[#7E9184] font-mono">
                {badge.organization}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Research Collaborators & Mentors */}
      <div className="bg-white rounded-xl border border-[#E8E2D5] p-5 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#1B4332]" />
            <h2 className="text-sm font-serif font-bold text-[#14261C]">
              Collaborators
            </h2>
          </div>
          <span className="text-[11px] text-[#6A7C70]">Research Network</span>
        </div>

        <div className="space-y-3">
          {collaborators.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#1B4332] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {c.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-[#14261C] truncate leading-tight">
                    {c.name}
                  </p>
                  <p className="text-[10px] text-[#63756A] truncate">
                    {c.institution}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onToggleConnectCollaborator(c.id)}
                className={`p-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                  c.connected
                    ? 'bg-[#EDF5EE] text-[#1B4332]'
                    : 'bg-[#FAF8F5] hover:bg-[#F2ECE1] text-[#4A5D50]'
                }`}
                title={c.connected ? 'Connected' : 'Connect'}
              >
                {c.connected ? (
                  <Check className="w-3.5 h-3.5 text-[#2D5A27]" />
                ) : (
                  <UserPlus className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
