import React, { useState } from 'react';
import { ProjectWork, VisualTile } from '../types/portfolio';
import { WorkCard } from './WorkCard';
import { Search, SlidersHorizontal, RotateCcw, Code, Cpu } from 'lucide-react';

interface WorksFeedProps {
  projects: ProjectWork[];
  onOpenVisualLightbox: (tiles: VisualTile[], index: number, projectTitle: string) => void;
  onToggleStar: (projectId: string) => void;
  onAddComment: (projectId: string, commentText: string) => void;
  onBookmarkProject?: (project: ProjectWork) => void;
  onOpenLogModal: () => void;
}

export const WorksFeed: React.FC<WorksFeedProps> = ({
  projects,
  onOpenVisualLightbox,
  onToggleStar,
  onAddComment,
  onBookmarkProject,
  onOpenLogModal,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'latest' | 'stars' | 'accuracy'>('latest');

  const filterOptions = [
    { id: 'all', label: 'All Works', count: projects.length },
    {
      id: 'vision',
      label: 'Computer Vision',
      count: projects.filter((p) => p.category === 'Computer Vision').length,
    },
    {
      id: 'systems',
      label: 'Distributed Systems',
      count: projects.filter((p) => p.category === 'Distributed Systems').length,
    },
    {
      id: 'field',
      label: 'Field Trials',
      count: projects.filter((p) => p.category === 'Field Deployments').length,
    },
    {
      id: 'open',
      label: 'Open Source',
      count: projects.filter((p) => p.category === 'Open Source').length,
    },
  ];

  const filteredProjects = projects.filter((proj) => {
    if (activeFilter === 'vision' && proj.category !== 'Computer Vision') return false;
    if (activeFilter === 'systems' && proj.category !== 'Distributed Systems') return false;
    if (activeFilter === 'field' && proj.category !== 'Field Deployments') return false;
    if (activeFilter === 'open' && proj.category !== 'Open Source') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = proj.title.toLowerCase().includes(q);
      const matchSub = proj.subtitle.toLowerCase().includes(q);
      const matchSummary = proj.summary.toLowerCase().includes(q);
      const matchTech = proj.technologies.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchSub && !matchSummary && !matchTech) return false;
    }

    return true;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'stars') {
      return b.starsCount - a.starsCount;
    }
    if (sortBy === 'accuracy') {
      return (b.benchmarks[b.benchmarks.length - 1] || 0) - (a.benchmarks[a.benchmarks.length - 1] || 0);
    }
    return 0;
  });

  return (
    <div className="space-y-4">
      {/* Interactive Filter Chips & Search Bar */}
      <div className="bg-white rounded-xl border border-[#E8E2D5] p-3.5 shadow-xs space-y-3">
        {/* Top: Filter chips */}
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
              placeholder="Search by keyword: YOLO, PyTorch, Prajna, FastAPI, Mongabay..."
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
              <option value="stars">Sort: Most Starred</option>
              <option value="accuracy">Sort: Model Benchmark</option>
            </select>
          </div>
        </div>
      </div>

      {/* Feed List */}
      <div className="space-y-4">
        {sortedProjects.map((project) => (
          <WorkCard
            key={project.id}
            project={project}
            onOpenVisualLightbox={onOpenVisualLightbox}
            onToggleStar={onToggleStar}
            onAddComment={onAddComment}
            onBookmarkProject={onBookmarkProject}
          />
        ))}

        {/* Empty State */}
        {sortedProjects.length === 0 && (
          <div className="bg-white rounded-xl border border-[#E8E2D5] p-8 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF8F5] border border-[#E8E2D5] flex items-center justify-center text-[#1B4332]">
              <Cpu className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h3 className="text-sm font-serif font-bold text-[#14261C]">
                No Works Match Filter
              </h3>
              <p className="text-xs text-[#63756A] mt-1 max-w-sm mx-auto">
                No projects found matching your search term. Try resetting your query or add a new research log.
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
                Add Work
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
