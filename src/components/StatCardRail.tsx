import React, { useState } from 'react';
import { Badge, CommunityMember } from '../types/trail';
import {
  TrendingUp,
  Mountain,
  Compass,
  Award,
  Users,
  Check,
  UserPlus,
  CloudSun,
  AlertCircle,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

interface StatCardRailProps {
  totalMiles: number;
  totalVertFt: number;
  hikesCount: number;
  badges: Badge[];
  communityMembers: CommunityMember[];
  onToggleFollowMember: (memberId: string) => void;
  onOpenBadgeDetails?: (badge: Badge) => void;
}

export const StatCardRail: React.FC<StatCardRailProps> = ({
  totalMiles,
  totalVertFt,
  hikesCount,
  badges,
  communityMembers,
  onToggleFollowMember,
  onOpenBadgeDetails,
}) => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'badges'>('metrics');

  // Season monthly elevation gain data
  const monthlyVert = [
    { month: 'Apr', ft: 18400, label: '18.4k' },
    { month: 'May', ft: 42100, label: '42.1k' },
    { month: 'Jun', ft: 58900, label: '58.9k' },
    { month: 'Jul', ft: 74200, label: '74.2k' },
    { month: 'Aug', ft: 61500, label: '61.5k' },
    { month: 'Sep', ft: 48600, label: '48.6k' },
  ];
  const maxMonthly = Math.max(...monthlyVert.map((m) => m.ft));

  return (
    <aside className="w-full space-y-5">
      {/* 2026 Season Stats Card */}
      <div className="bg-white rounded-xl border border-[#E8E2D5] p-5 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#1B4332]" />
            <h2 className="text-sm font-serif font-bold text-[#14261C]">
              2026 Season Rail
            </h2>
          </div>
          <span className="text-[11px] font-mono text-[#627568]">Pacific Northwest</span>
        </div>

        {/* Primary Stat Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#EDE7DC]">
            <span className="text-[11px] text-[#55695C] block">Total Trail Miles</span>
            <div className="text-lg font-mono tabular-nums font-bold text-[#14261C] mt-0.5">
              {totalMiles.toFixed(1)} <span className="text-xs font-sans font-normal text-[#55695C]">mi</span>
            </div>
            <div className="text-[10px] text-[#2D5A27] font-medium mt-1">
              +14% vs 2025 season
            </div>
          </div>

          <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#EDE7DC]">
            <span className="text-[11px] text-[#55695C] block">Vertical Gain</span>
            <div className="text-lg font-mono tabular-nums font-bold text-[#14261C] mt-0.5">
              {(totalVertFt / 1000).toFixed(1)}k <span className="text-xs font-sans font-normal text-[#55695C]">ft</span>
            </div>
            <div className="text-[10px] text-[#63756A] mt-1">
              ≈ 5.1× Mt. Rainier
            </div>
          </div>
        </div>

        {/* Monthly Elevation Distribution Mini Bar Chart */}
        <div className="border-t border-[#F0ECE1] pt-3.5">
          <div className="flex items-center justify-between text-xs text-[#526357] mb-2 font-medium">
            <span>Elevation Gain by Month</span>
            <span className="font-mono tabular-nums text-[10px] text-[#7A8C80]">
              Peak: 74.2k ft (Jul)
            </span>
          </div>

          <div className="flex items-end justify-between gap-1.5 h-18 pt-2">
            {monthlyVert.map((item, idx) => {
              const heightPct = Math.round((item.ft / maxMonthly) * 100);
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

        {/* Trail Karma / Community Contribution Score */}
        <div className="mt-3.5 pt-3 border-t border-[#F0ECE1] flex items-center justify-between text-xs text-[#526357]">
          <span>Trail Steward Karma</span>
          <span className="font-mono tabular-nums font-bold text-[#1B4332]">
            4,850 pts · Tier 1
          </span>
        </div>
      </div>

      {/* Regional Conditions & Wilderness Advisory */}
      <div className="bg-[#FAF8F5] rounded-xl border border-[#E5DFD4] p-4 text-xs">
        <div className="flex items-center gap-2 mb-2 font-semibold text-[#1B4332]">
          <CloudSun className="w-4 h-4 text-[#D97706]" />
          <span>Regional Pass &amp; Weather Advisory</span>
        </div>

        <div className="space-y-2 text-[#435448] leading-relaxed">
          <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-[#E8E2D5]">
            <AlertCircle className="w-3.5 h-3.5 text-[#B45309] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-[#14261C]">Highway 20 North Cascades</p>
              <p className="text-[11px] text-[#63756A] mt-0.5">
                Pass is fully open. Snow line holding at 5,800 ft; early morning ice on shaded switchbacks.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-[#E8E2D5]">
            <AlertCircle className="w-3.5 h-3.5 text-[#2D5A27] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-[#14261C]">Rainier Paradise Ranger Station</p>
              <p className="text-[11px] text-[#63756A] mt-0.5">
                Skyline Trail upper loop snow bridge flagged. Navigation GPS recommended.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alpine Badges & Milestones */}
      <div className="bg-white rounded-xl border border-[#E8E2D5] p-5 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#1B4332]" />
            <h2 className="text-sm font-serif font-bold text-[#14261C]">
              Earned Badges
            </h2>
          </div>
          <span className="text-xs font-mono text-[#6A7C70] tabular-nums">
            {badges.length} unlocked
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
                  {badge.level}
                </span>
              </div>
              <p className="text-[11px] text-[#55695C] mt-1 leading-snug">
                {badge.description}
              </p>
              <div className="mt-1 text-[10px] text-[#7E9184] font-mono">
                Awarded {badge.dateEarned}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fellow Hikers on the Ridge */}
      <div className="bg-white rounded-xl border border-[#E8E2D5] p-5 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#1B4332]" />
            <h2 className="text-sm font-serif font-bold text-[#14261C]">
              Trail Mates
            </h2>
          </div>
          <span className="text-[11px] text-[#6A7C70]">Active Nearby</span>
        </div>

        <div className="space-y-3">
          {communityMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#2D5A27] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {member.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-[#14261C] truncate leading-tight">
                    {member.name}
                  </p>
                  <p className="text-[10px] text-[#63756A] truncate">
                    {member.lastHike}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onToggleFollowMember(member.id)}
                className={`p-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                  member.isFollowing
                    ? 'bg-[#EDF5EE] text-[#1B4332]'
                    : 'bg-[#FAF8F5] hover:bg-[#F2ECE1] text-[#4A5D50]'
                }`}
                title={member.isFollowing ? 'Following' : 'Follow Hiker'}
              >
                {member.isFollowing ? (
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
