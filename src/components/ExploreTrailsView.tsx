import React, { useState } from 'react';
import { SavedTrail } from '../types/trail';
import { MountainGraphic } from './MountainGraphic';
import { Mountain, MapPin, Compass, Search, Filter, Plus, Download, Check } from 'lucide-react';

interface ExploreTrailsViewProps {
  savedTrails: SavedTrail[];
  onSelectTrail: (trail: SavedTrail) => void;
  onOpenLogModal: () => void;
}

export const ExploreTrailsView: React.FC<ExploreTrailsViewProps> = ({
  savedTrails,
  onSelectTrail,
  onOpenLogModal,
}) => {
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allExploreTrails: SavedTrail[] = [
    ...savedTrails,
    {
      id: 'et_1',
      name: 'Sahale Arm & Cascade Pass',
      park: 'North Cascades National Park',
      distanceMi: 12.4,
      elevationFt: 4150,
      difficulty: 'Strenuous',
      permitRequired: false,
      bestSeason: 'July – October',
      status: 'Open',
      lastReportedDate: 'Yesterday',
    },
    {
      id: 'et_2',
      name: 'Colchuck Lake & Aasgard Scramble',
      park: 'Alpine Lakes Wilderness',
      distanceMi: 9.0,
      elevationFt: 2280,
      difficulty: 'Moderate',
      permitRequired: true,
      bestSeason: 'June – October',
      status: 'Open',
      lastReportedDate: '3 days ago',
    },
    {
      id: 'et_3',
      name: 'Skyline Trail & Panorama Point',
      park: 'Mount Rainier National Park',
      distanceMi: 5.5,
      elevationFt: 1700,
      difficulty: 'Moderate',
      permitRequired: false,
      bestSeason: 'July – September',
      status: 'Snow Caution',
      lastReportedDate: '4 days ago',
    },
    {
      id: 'et_4',
      name: 'Mailbox Peak (Old Trail Test)',
      park: 'Middle Fork Snoqualmie',
      distanceMi: 5.4,
      elevationFt: 4000,
      difficulty: 'Expert',
      permitRequired: false,
      bestSeason: 'Year-round',
      status: 'Open',
      lastReportedDate: '5 days ago',
    },
  ];

  const filtered = allExploreTrails.filter((t) => {
    if (filterDifficulty !== 'all' && t.difficulty.toLowerCase() !== filterDifficulty.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!t.name.toLowerCase().includes(q) && !t.park.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Hero Banner for Explore */}
      <div className="relative rounded-2xl overflow-hidden bg-[#1B4332] text-white p-6 sm:p-8 border border-[#E8E2D5]">
        <MountainGraphic palette="mist" className="absolute inset-0 opacity-40 object-cover" showContours={true} />
        <div className="relative z-10 max-w-xl">
          <span className="text-xs font-mono font-medium tracking-wide text-[#A3E635] uppercase">
            Curated Pacific Northwest Routes
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Find Your Next Alpine Ascent
          </h2>
          <p className="text-xs sm:text-sm text-[#DFECE3] mt-2 leading-relaxed">
            Community-verified trail reports, seasonal snow lines, permit regulations, and GPX navigation files maintained by Ridgeline stewards.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl border border-[#E8E2D5] p-3.5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#8A9C90] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search all trails or parks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-[#E2DBD0] bg-[#FAF8F5] text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {['all', 'Moderate', 'Strenuous', 'Expert'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterDifficulty(lvl)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                filterDifficulty.toLowerCase() === lvl.toLowerCase()
                  ? 'bg-[#1B4332] text-white'
                  : 'bg-[#FAF8F5] text-[#526357] hover:bg-[#F2ECE1]'
              }`}
            >
              {lvl === 'all' ? 'All Difficulties' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Trails */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((trail) => (
          <div
            key={trail.id}
            onClick={() => onSelectTrail(trail)}
            className="bg-white rounded-xl border border-[#E8E2D5] p-5 shadow-xs hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono tracking-wider uppercase text-[#55695C]">
                  {trail.park}
                </span>
                <h3 className="text-base font-serif font-bold text-[#14261C] group-hover:text-[#1B4332] transition-colors">
                  {trail.name}
                </h3>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                trail.status === 'Open'
                  ? 'bg-[#EDF5EE] text-[#2D5A27]'
                  : 'bg-[#FEF3C7] text-[#B45309]'
              }`}>
                {trail.status}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-[#526357]">
              <span className="font-mono tabular-nums font-semibold text-[#14261C]">{trail.distanceMi} mi</span>
              <span aria-hidden="true" className="text-[#C5D1C9]">·</span>
              <span className="font-mono tabular-nums font-semibold text-[#14261C]">+{trail.elevationFt.toLocaleString()} ft vert</span>
              <span aria-hidden="true" className="text-[#C5D1C9]">·</span>
              <span className="text-[#1B4332] font-medium">{trail.difficulty}</span>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F0ECE1] flex items-center justify-between text-xs text-[#63756A]">
              <span>Season: {trail.bestSeason}</span>
              <span className="text-[#1B4332] group-hover:translate-x-0.5 transition-transform font-medium">
                View Trail Specs →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
