import React, { useState } from 'react';
import { FeaturedStackItem } from '../types/portfolio';
import { ProjectSleeveRelease } from '../types/crate';
import { githubProjectReleases } from '../data/githubCrateData';
import { GithubHeatmap } from './GithubHeatmap';
import { DeveloperGraphic } from './DeveloperGraphic';
import { FuturisticArchitectureHero } from './FuturisticArchitectureHero';
import {
  Layers,
  Search,
  Cpu,
  Terminal,
  CheckCircle2,
  GitBranch,
  Github,
  ExternalLink,
  FolderOpen,
  Code,
  Disc,
  Sparkles,
  FileCode,
  ChevronRight,
  Activity,
  Star,
  GitFork,
  Check,
} from 'lucide-react';

interface ArchitectureStackViewProps {
  stacks: FeaturedStackItem[];
  onSelectStack: (stack: FeaturedStackItem) => void;
  onOpenGatefold?: (release: ProjectSleeveRelease) => void;
  onNavigateToCrate?: () => void;
}

export const ArchitectureStackView: React.FC<ArchitectureStackViewProps> = ({
  stacks,
  onSelectStack,
  onOpenGatefold,
  onNavigateToCrate,
}) => {
  const [filterDomain, setFilterDomain] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGithubProject, setSelectedGithubProject] = useState<ProjectSleeveRelease>(
    githubProjectReleases[0]
  );
  const [activeFileTab, setActiveFileTab] = useState<'files' | 'code' | 'deps'>('files');

  const filtered = stacks.filter((s) => {
    if (filterDomain !== 'all' && s.domain !== filterDomain) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (
        !s.name.toLowerCase().includes(q) &&
        !s.domain.toLowerCase().includes(q) &&
        !s.description.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Futuristic Animated & Responsive Edge Architecture Hero Banner */}
      <FuturisticArchitectureHero
        onNavigateToCrate={onNavigateToCrate}
      />

      {/* SECTION 1: Full-Width GitHub Activity Contribution Heatmap */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#1B4332]" />
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#14261C]">
              GitHub Activity Cadence &amp; Publication Milestones
            </h2>
          </div>
          <span className="text-xs font-mono text-[#5A6D60]">
            Continuous engineering &amp; field releases
          </span>
        </div>

        <GithubHeatmap compact={false} />
      </section>

      {/* SECTION 2: GitHub Working Projects & Detailed Code/File Explorer */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-[#1B4332]" />
              <h2 className="text-base sm:text-lg font-serif font-bold text-[#14261C]">
                GitHub Working Projects &amp; Source Repositories
              </h2>
            </div>
            <p className="text-xs text-[#526357] mt-0.5">
              Inspecting actual working code, file trees, quantized neural network models, and deployment scripts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onOpenGatefold && (
              <button
                onClick={() => onOpenGatefold(selectedGithubProject)}
                className="px-3 py-1.5 rounded-lg bg-[#1B4332] hover:bg-[#255741] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <FolderOpen className="w-3.5 h-3.5 text-[#A3E635]" />
                <span>Open 3D Gatefold World</span>
              </button>
            )}
          </div>
        </div>

        {/* Project Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {githubProjectReleases.map((repo) => {
            const isSelected = selectedGithubProject.id === repo.id;
            return (
              <button
                key={repo.id}
                onClick={() => setSelectedGithubProject(repo)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-xs'
                    : 'bg-white hover:bg-[#F2ECE1] text-[#334E3F] border-[#E8E2D5]'
                }`}
              >
                <GitBranch className="w-3 h-3 text-[#A3E635]" />
                <span>{repo.repoName}</span>
                <span className="text-[10px] opacity-75">({repo.releaseTag})</span>
              </button>
            );
          })}
        </div>

        {/* Selected Project In-Depth Card with File Tree & Architecture Specs */}
        <div className="bg-white rounded-2xl border border-[#E8E2D5] p-5 sm:p-6 shadow-xs space-y-6">
          {/* Top Lockup */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-[#F0ECE1] pb-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#1B4332] bg-[#E8EFEA] px-2 py-0.5 rounded">
                  {selectedGithubProject.category}
                </span>
                <span className="text-[10px] font-mono text-[#64748B]">
                  Catalog: {selectedGithubProject.catalogNumber}
                </span>
                <span className="text-[10px] font-mono text-[#64748B]">
                  Commit: {selectedGithubProject.commitHash}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#14261C]">
                {selectedGithubProject.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#4A5D50] mt-1 leading-relaxed">
                {selectedGithubProject.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={selectedGithubProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#F2ECE1] border border-[#CBD5E1] rounded-lg text-xs font-mono font-semibold text-[#14261C] transition-colors flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View Repo</span>
                <ExternalLink className="w-3 h-3 text-[#64748B]" />
              </a>

              {onOpenGatefold && (
                <button
                  onClick={() => onOpenGatefold(selectedGithubProject)}
                  className="px-3.5 py-1.5 bg-[#1B4332] hover:bg-[#255741] text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-[#A3E635]" />
                  <span>3D Gatefold</span>
                </button>
              )}
            </div>
          </div>

          {/* Key Specs & Field Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EDE7DC]">
              <span className="text-[10px] font-mono text-[#5A6D60] uppercase block">
                Primary Metric
              </span>
              <span className="text-sm font-mono font-bold text-[#1B4332] mt-0.5 block">
                {selectedGithubProject.liveMetric.label}: {selectedGithubProject.liveMetric.value}
              </span>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EDE7DC]">
              <span className="text-[10px] font-mono text-[#5A6D60] uppercase block">
                Repository Stars
              </span>
              <span className="text-sm font-mono font-bold text-[#14261C] mt-0.5 block flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{selectedGithubProject.stars} stars</span>
              </span>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EDE7DC]">
              <span className="text-[10px] font-mono text-[#5A6D60] uppercase block">
                Forks &amp; License
              </span>
              <span className="text-sm font-mono font-bold text-[#14261C] mt-0.5 block">
                {selectedGithubProject.forks} forks · {selectedGithubProject.license}
              </span>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EDE7DC]">
              <span className="text-[10px] font-mono text-[#5A6D60] uppercase block">
                Release Status
              </span>
              <span className="text-sm font-mono font-bold text-[#2D5A27] mt-0.5 block flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>{selectedGithubProject.releaseTag}</span>
              </span>
            </div>
          </div>

          {/* Tabs for File Tree, Code Snippets, and Dependencies */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-[#F0ECE1] pb-2 text-xs font-mono">
              <button
                onClick={() => setActiveFileTab('files')}
                className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                  activeFileTab === 'files'
                    ? 'bg-[#1B4332] text-white font-bold'
                    : 'text-[#55695C] hover:bg-[#FAF8F5]'
                }`}
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span>Repository File Tree ({selectedGithubProject.fileTree.length} roots)</span>
              </button>
              <button
                onClick={() => setActiveFileTab('code')}
                className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                  activeFileTab === 'code'
                    ? 'bg-[#1B4332] text-white font-bold'
                    : 'text-[#55695C] hover:bg-[#FAF8F5]'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Working Implementation Code</span>
              </button>
              <button
                onClick={() => setActiveFileTab('deps')}
                className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                  activeFileTab === 'deps'
                    ? 'bg-[#1B4332] text-white font-bold'
                    : 'text-[#55695C] hover:bg-[#FAF8F5]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Core Dependencies ({selectedGithubProject.dependencies.length})</span>
              </button>
            </div>

            {/* TAB CONTENT: File Tree */}
            {activeFileTab === 'files' && (
              <div className="bg-[#0B150F] text-[#FAF8F5] rounded-xl p-4 font-mono text-xs border border-[#1B4332]">
                <div className="flex items-center justify-between border-b border-[#1B4332] pb-2 text-[11px] text-[#A3E635]">
                  <span>DIRECTORY: {selectedGithubProject.repoName}/</span>
                  <span>Branch: main (Clean)</span>
                </div>
                <div className="mt-3 space-y-2 max-h-60 overflow-y-auto pr-1">
                  {selectedGithubProject.fileTree.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-white hover:text-[#A3E635] p-1 rounded hover:bg-[#142C1F] transition-colors">
                        <span className="font-semibold flex items-center gap-1.5">
                          <span>{item.type === 'folder' ? '📁' : '📄'}</span>
                          <span>{item.name}</span>
                        </span>
                        <span className="text-[10px] text-[#64748B]">{item.sizeOrLines}</span>
                      </div>
                      {item.children && (
                        <div className="pl-5 border-l border-[#1B4332] space-y-1 mt-1">
                          {item.children.map((child, cIdx) => (
                            <div
                              key={cIdx}
                              className="flex items-center justify-between text-[#CBD5E1] p-1 rounded hover:bg-[#142C1F]"
                            >
                              <span className="flex items-center gap-1">
                                <span>└ 📄</span>
                                <span className="text-white">{child.name}</span>
                              </span>
                              <div className="text-[10px] flex items-center gap-3">
                                <span className="text-[#86EFAC]">{child.description}</span>
                                <span className="text-[#64748B] font-mono">{child.sizeOrLines}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: Working Code Snippet */}
            {activeFileTab === 'code' && (
              <div className="bg-[#07110C] text-[#86EFAC] rounded-xl p-4 font-mono text-xs border border-[#1B4332] overflow-x-auto">
                <div className="flex items-center justify-between border-b border-[#1B4332] pb-2 text-[11px] text-white/60 mb-2">
                  <span>
                    SOURCE RUNNER: {selectedGithubProject.fileTree[0]?.children?.[0]?.name || 'entry.cpp'}
                  </span>
                  <span>Language: C++17 / Python</span>
                </div>
                <pre className="text-xs leading-relaxed">
                  {selectedGithubProject.chambers[0]?.codeSnippet ||
                    `// ${selectedGithubProject.title} Core Pipeline
#include <iostream>
#include <vector>

int main() {
    std::cout << "[INFO] Initializing ${selectedGithubProject.repoName}..." << std::endl;
    // Real-world deterministic inference loop running at ${selectedGithubProject.liveMetric.value}
    return 0;
}`}
                </pre>
              </div>
            )}

            {/* TAB CONTENT: Dependencies */}
            {activeFileTab === 'deps' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedGithubProject.dependencies.map((dep, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EDE7DC] flex items-start justify-between gap-2"
                  >
                    <div>
                      <span className="text-xs font-mono font-bold text-[#14261C] block">
                        {dep.name} <span className="text-[10px] text-[#64748B]">v{dep.version}</span>
                      </span>
                      <p className="text-[11px] text-[#526357] mt-0.5">{dep.role}</p>
                    </div>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0 mt-0.5" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3: Architecture Stack Modules & Topologies */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#1B4332]" />
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#14261C]">
              Enterprise Architecture Modules &amp; Subsystems
            </h2>
          </div>
          <span className="text-xs font-mono text-[#5A6D60]">
            {filtered.length} active system blueprints
          </span>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl border border-[#E8E2D5] p-3.5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-[#8A9C90] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search architecture modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-[#E2DBD0] bg-[#FAF8F5] text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
            {['all', 'Computer Vision & Inference', 'Distributed Backend & AI', 'Telemetry & Webhooks'].map(
              (dom) => (
                <button
                  key={dom}
                  onClick={() => setFilterDomain(dom)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    filterDomain === dom
                      ? 'bg-[#1B4332] text-white'
                      : 'bg-[#FAF8F5] text-[#526357] hover:bg-[#F2ECE1]'
                  }`}
                >
                  {dom === 'all' ? 'All Domains' : dom}
                </button>
              )
            )}
          </div>
        </div>

        {/* Grid of Stacks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((stack) => (
            <div
              key={stack.id}
              onClick={() => onSelectStack(stack)}
              className="bg-white rounded-xl border border-[#E8E2D5] p-5 shadow-xs hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#55695C]">
                    {stack.domain}
                  </span>
                  <h3 className="text-base font-serif font-bold text-[#14261C] group-hover:text-[#1B4332] transition-colors">
                    {stack.name}
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#EDF5EE] text-[#2D5A27]">
                  {stack.status}
                </span>
              </div>

              <p className="text-xs text-[#4A5D50] mt-2.5 leading-relaxed">{stack.description}</p>

              <div className="mt-3 flex flex-wrap gap-1">
                {stack.stackList.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono bg-[#FAF8F5] border border-[#E2DBD0] px-2 py-0.5 rounded text-[#1B4332]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0ECE1] flex items-center justify-between text-xs text-[#63756A]">
                <span className="font-mono text-[#1B4332] font-semibold">
                  {stack.latencyOrMetric}
                </span>
                <span className="text-[#1B4332] group-hover:translate-x-0.5 transition-transform font-medium">
                  View Topology Specs →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
