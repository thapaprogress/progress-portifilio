import React, { useState } from 'react';
import { UserProfile, SavedTrail } from '../types/trail';
import {
  MapPin,
  Calendar,
  Share2,
  Bookmark,
  Check,
  Award,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Mountain,
  Compass,
} from 'lucide-react';

interface ProfileSidebarProps {
  profile: UserProfile;
  savedTrails: SavedTrail[];
  onSelectSavedTrail: (trail: SavedTrail) => void;
  onOpenFollowersModal: (type: 'followers' | 'following') => void;
  onShareProfile: () => void;
  shareCopied: boolean;
  selectedTrailId?: string | null;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  profile,
  savedTrails,
  onSelectSavedTrail,
  onOpenFollowersModal,
  onShareProfile,
  shareCopied,
  selectedTrailId,
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredTrails = savedTrails.filter(
    (t) =>
      t.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      t.park.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <aside className="w-full space-y-5">
      {/* Profile Overview Card */}
      <div className="bg-white rounded-xl border border-[#E8E2D5] p-5 shadow-xs transition-shadow hover:shadow-sm">
        {/* Avatar & Verification Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="relative">
            {/* Outdoor Avatar Frame */}
            <div className="w-20 h-20 rounded-full border-2 border-[#1B4332] p-0.5 bg-[#FAF8F5] overflow-hidden shadow-xs">
              <div className="w-full h-full rounded-full bg-[#E5ECE7] flex items-center justify-center text-[#1B4332] font-serif font-bold text-2xl relative overflow-hidden">
                {/* Visual Avatar Motif */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1B4332] to-[#2D5A27] opacity-90" />
                <span className="relative z-10 text-[#FAF8F5] font-serif">EV</span>
                {/* Subtle mountain ridge silhouette behind initials */}
                <svg className="absolute bottom-0 inset-x-0 w-full h-10 opacity-30 text-white fill-current" viewBox="0 0 100 60">
                  <polygon points="0,60 30,20 60,45 80,10 100,60" />
                </svg>
              </div>
            </div>

            {profile.verifiedSteward && (
              <div
                className="absolute -bottom-1 -right-1 bg-[#1B4332] text-[#FAF8F5] p-1 rounded-full border-2 border-white shadow-xs"
                title="Verified Alpine Trail Steward"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          {/* Share CTA button */}
          <button
            onClick={onShareProfile}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1B4332] bg-[#F2ECE1] hover:bg-[#E8E0D2] active:bg-[#DDD3C2] rounded-lg transition-colors whitespace-nowrap"
            title="Share hiker profile"
          >
            {shareCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#2D5A27]" />
                <span className="text-[#2D5A27]">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Profile</span>
              </>
            )}
          </button>
        </div>

        {/* Identity & Bio */}
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-serif font-bold text-[#14261C] tracking-tight">
              {profile.name}
            </h1>
          </div>
          <p className="text-xs text-[#526357] font-medium mt-0.5">{profile.handle}</p>

          <p className="text-xs font-semibold text-[#1B4332] mt-1.5 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{profile.role}</span>
          </p>

          <p className="text-xs text-[#3E4E44] leading-relaxed mt-2.5">
            {profile.bio}
          </p>

          {/* Location & Join date metadata - clean unboxed text */}
          <div className="mt-3.5 pt-3 border-t border-[#F0ECE1] space-y-1.5 text-xs text-[#63756A]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-[#1B4332]/70" />
              <span className="truncate">{profile.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 shrink-0 text-[#1B4332]/70" />
              <span>{profile.joinedDate}</span>
            </div>
          </div>
        </div>

        {/* Avatar Follower Stats Grid */}
        <div className="mt-4 pt-3.5 border-t border-[#F0ECE1] grid grid-cols-2 gap-2 text-center">
          <button
            onClick={() => onOpenFollowersModal('followers')}
            className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#F2ECE1] transition-colors text-left"
          >
            <div className="text-sm font-semibold font-mono tabular-nums text-[#14261C]">
              {profile.followersCount.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#5A6D60]">Followers</div>
          </button>

          <button
            onClick={() => onOpenFollowersModal('following')}
            className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#F2ECE1] transition-colors text-left"
          >
            <div className="text-sm font-semibold font-mono tabular-nums text-[#14261C]">
              {profile.followingCount.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#5A6D60]">Following</div>
          </button>

          <div className="p-2 rounded-lg bg-[#FAF8F5] text-left">
            <div className="text-sm font-semibold font-mono tabular-nums text-[#14261C]">
              {profile.hikesLogged}
            </div>
            <div className="text-[11px] text-[#5A6D60]">Hikes Logged</div>
          </div>

          <div className="p-2 rounded-lg bg-[#FAF8F5] text-left">
            <div className="text-sm font-semibold font-mono tabular-nums text-[#14261C]">
              {(profile.totalElevationFt / 1000).toFixed(1)}k <span className="text-[10px] font-normal text-[#5A6D60]">ft</span>
            </div>
            <div className="text-[11px] text-[#5A6D60]">Total Vert</div>
          </div>
        </div>
      </div>

      {/* Saved Trails Nav List */}
      <div className="bg-white rounded-xl border border-[#E8E2D5] p-5 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-[#1B4332]" />
            <h2 className="text-sm font-serif font-bold text-[#14261C]">Saved Trails</h2>
          </div>
          <span className="text-xs font-mono tabular-nums text-[#6A7C70]">
            {savedTrails.length} planned
          </span>
        </div>

        {/* Quick Search */}
        <input
          type="text"
          placeholder="Filter saved routes..."
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          className="w-full text-xs px-3 py-1.5 rounded-lg border border-[#E2DBD0] bg-[#FAF8F5] text-[#1E2922] placeholder:text-[#8C9B90] focus:outline-none focus:ring-1 focus:ring-[#1B4332] mb-3"
        />

        {/* Trail Items */}
        <div className="space-y-2">
          {filteredTrails.map((trail) => {
            const isSelected = selectedTrailId === trail.id;
            return (
              <button
                key={trail.id}
                onClick={() => onSelectSavedTrail(trail)}
                className={`w-full text-left p-2.5 rounded-lg transition-colors border group ${
                  isSelected
                    ? 'bg-[#F2ECE1] border-[#1B4332]/40 ring-1 ring-[#1B4332]/20'
                    : 'bg-[#FAF8F5]/60 hover:bg-[#F5EFE4] border-transparent'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-[#14261C] group-hover:text-[#1B4332] truncate">
                      {trail.name}
                    </p>
                    <p className="text-[11px] text-[#65776C] truncate mt-0.5">
                      {trail.park}
                    </p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#91A296] group-hover:text-[#1B4332] shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5" />
                </div>

                {/* Clean unboxed stats with typographic bullet separators */}
                <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-[#55695C]">
                  <span className="font-mono tabular-nums font-medium">{trail.distanceMi} mi</span>
                  <span aria-hidden="true" className="text-[#B6C4BA]">·</span>
                  <span className="font-mono tabular-nums font-medium">+{trail.elevationFt.toLocaleString()} ft</span>
                  <span aria-hidden="true" className="text-[#B6C4BA]">·</span>
                  <span className={`text-[10px] font-medium ${
                    trail.status === 'Open'
                      ? 'text-[#2D5A27]'
                      : trail.status === 'Snow Caution'
                      ? 'text-[#B45309]'
                      : 'text-[#1B4332]'
                  }`}>
                    {trail.status}
                  </span>
                </div>
              </button>
            );
          })}

          {filteredTrails.length === 0 && (
            <div className="text-center py-4 text-xs text-[#7B8D81]">
              No saved trails matching "{filterQuery}"
            </div>
          )}
        </div>

        {/* Trail Steward Pledge Note */}
        <div className="mt-4 pt-3 border-t border-[#F0ECE1] text-[11px] text-[#63756A] flex items-center justify-between">
          <span>Leave No Trace Certified</span>
          <span className="text-[#1B4332] font-medium">Class of '24</span>
        </div>
      </div>
    </aside>
  );
};
