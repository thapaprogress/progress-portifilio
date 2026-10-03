import React, { useState } from 'react';
import { TrailLog, PhotoTile } from '../types/trail';
import { TrailCard } from './TrailCard';
import { Search, Filter, SlidersHorizontal, Mountain, Compass, RotateCcw } from 'lucide-react';

interface ContributionsFeedProps {
  trailLogs: TrailLog[];
  onOpenPhotoLightbox: (photos: PhotoTile[], index: number, trailName: string) => void;
  onToggleKudos: (trailId: string) => void;
  onAddComment: (trailId: string, commentText: string) => void;
  onSaveTrailRoute?: (trail: TrailLog) => void;
  onOpenLogModal: () => void;
}

export const ContributionsFeed: React.FC<ContributionsFeedProps> = ({
  trailLogs,
  onOpenPhotoLightbox,
  onToggleKudos,
  onAddComment,
  onSaveTrailRoute,
  onOpenLogModal,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'latest' | 'elevation' | 'distance'>('latest');

  // Filter chips
  const filterOptions = [
    { id: 'all', label: 'All Contributions', count: trailLogs.length },
    {
      id: 'alpine',
      label: 'Alpine Hikes',
      count: trailLogs.filter((t) => t.activityType === 'Alpine Hike' || t.activityType === 'Scramble').length,
    },
    {
      id: 'thru',
      label: 'Thru-Hikes',
      count: trailLogs.filter((t) => t.activityType === 'Thru-Hike').length,
    },
    {
      id: 'alerts',
      label: 'Condition Alerts',
      count: trailLogs.filter((t) => t.trailStatus !== 'Clear').length,
    },
    {
      id: 'milestones',
      label: 'Milestones',
      count: trailLogs.filter((t) => t.isMilestone).length,
    },
  ];

  // Filtering
  const filteredLogs = trailLogs.filter((trail) => {
    // Category filter
    if (activeFilter === 'alpine' && trail.activityType !== 'Alpine Hike' && trail.activityType !== 'Scramble') {
      return false;
    }
    if (activeFilter === 'thru' && trail.activityType !== 'Thru-Hike') {
      return false;
    }
    if (activeFilter === 'alerts' && trail.trailStatus === 'Clear') {
      return false;
    }
    if (activeFilter === 'milestones' && !trail.isMilestone) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = trail.trailName.toLowerCase().includes(q);
      const matchRegion = trail.region.toLowerCase().includes(q);
      const matchCondition = trail.conditionReport.toLowerCase().includes(q);
      if (!matchName && !matchRegion && !matchCondition) return false;
    }

    return true;
  });

  // Sorting
  const sortedLogs = [...filteredLogs].sort((a, b) => {
    if (sortBy === 'elevation') {
      return b.elevationGainFt - a.elevationGainFt;
    }
    if (sortBy === 'distance') {
      return b.distanceMi - a.distanceMi;
    }
    // Default: 'latest' (in-order as logs are already newest first)
    return 0;
  });

  return (
    <div className="space-y-4">
      {/* Interactive Filter Chips & Search Bar */}
      <div className="bg-white rounded-xl border border-[#E8E2D5] p-3.5 shadow-xs space-y-3">
        {/* Top: Filter chips (Functional segmented buttons per frontend design guidelines) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {filterOptions.map((opt) => {
            const isActive = activeFilter === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setActiveFilter(opt.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#1B4332] text-white shadow-xs'
                    : 'bg-[#FAF8F5] text-[#4A5D50] hover:bg-[#F2ECE1] hover:text-[#14261C]'
                }`}
              >
                <span>{opt.label}</span>
                <span
                  className={`text-[10px] font-mono tabular-nums ${
                    isActive ? 'text-[#C5E3D2]' : 'text-[#8A9C90]'
                  }`}
                >
                  {opt.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom: Search Input & Sort Selector */}
        <div className="flex items-center gap-2 pt-1 border-t border-[#F0ECE1]">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-[#8A9C90] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search peaks, routes, or condition keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-[#E2DBD0] bg-[#FAF8F5] text-[#1E2922] placeholder:text-[#8C9B90] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
            />
          </div>

          <div className="flex items-center gap-1 text-xs text-[#526357] shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#8A9C90]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-[#FAF8F5] border border-[#E2DBD0] rounded-lg px-2 py-1.5 text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
            >
              <option value="latest">Sort: Latest</option>
              <option value="elevation">Sort: Most Vert</option>
              <option value="distance">Sort: Longest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Feed List */}
      <div className="space-y-4">
        {sortedLogs.map((trail) => (
          <TrailCard
            key={trail.id}
            trail={trail}
            onOpenPhotoLightbox={onOpenPhotoLightbox}
            onToggleKudos={onToggleKudos}
            onAddComment={onAddComment}
            onSaveTrailRoute={onSaveTrailRoute}
          />
        ))}

        {/* Empty State */}
        {sortedLogs.length === 0 && (
          <div className="bg-white rounded-xl border border-[#E8E2D5] p-8 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF8F5] border border-[#E8E2D5] flex items-center justify-center text-[#1B4332]">
              <Mountain className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h3 className="text-sm font-serif font-bold text-[#14261C]">
                No Trail Contributions Match
              </h3>
              <p className="text-xs text-[#63756A] mt-1 max-w-sm mx-auto">
                No logs found matching your selected filter or search term. Try resetting your query or log a new trail.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-2">
              <button
                onClick={() => {
                  setActiveFilter('all');
                  setSearchQuery('');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#526357] bg-[#FAF8F5] hover:bg-[#F2ECE1] border border-[#E2DBD0] rounded-lg transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
              <button
                onClick={onOpenLogModal}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#1B4332] hover:bg-[#255741] rounded-lg transition-colors shadow-xs"
              >
                Log First Trail
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
