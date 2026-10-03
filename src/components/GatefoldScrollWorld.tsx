import React, { useState, useEffect, useRef } from 'react';
import { ProjectSleeveRelease } from '../types/crate';
import { soundEngine } from '../utils/audioEngine';
import {
  X,
  Layers,
  Cpu,
  Code,
  Terminal,
  Activity,
  Github,
  ExternalLink,
  ChevronDown,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  FolderOpen,
  ChevronRight,
  ChevronLeft,
  ArrowDown,
  FileCode,
  Star,
} from 'lucide-react';

interface GatefoldScrollWorldProps {
  isOpen: boolean;
  release: ProjectSleeveRelease;
  onClose: () => void;
  allReleases?: ProjectSleeveRelease[];
  onSelectRelease?: (release: ProjectSleeveRelease) => void;
}

export const GatefoldScrollWorld: React.FC<GatefoldScrollWorldProps> = ({
  isOpen,
  release,
  onClose,
  allReleases = [],
  onSelectRelease,
}) => {
  const [activeChamber, setActiveChamber] = useState(0);
  const [activePipelineStem, setActivePipelineStem] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [unfolded, setUnfolded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const chamberRefs = [
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
  ];

  useEffect(() => {
    if (isOpen) {
      soundEngine.playFolderOpenSound();
      soundEngine.playTonePreview(release.baseFrequency);
      // Trigger 3D unfolding animation
      const timer = setTimeout(() => {
        setUnfolded(true);
      }, 60);
      return () => clearTimeout(timer);
    } else {
      setUnfolded(false);
    }
  }, [isOpen, release]);

  const handleClose = () => {
    soundEngine.playFolderCloseSound();
    setUnfolded(false);
    setTimeout(() => {
      onClose();
    }, 450);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const progress = Math.max(0, Math.min(1, scrollTop / (scrollHeight - clientHeight)));
      setScrollProgress(progress);

      const chamberIndex = Math.min(3, Math.floor(progress * 3.99));
      setActiveChamber(chamberIndex);
    }
  };

  const scrollToChamber = (index: number) => {
    soundEngine.playCrateFlickSound();
    const targetEl = chamberRefs[index]?.current;
    if (targetEl && scrollRef.current) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!isOpen) return null;

  const pipelineStems = [
    { name: 'Video Ingestion', sub: 'RTSP 1080p 30fps', active: true, freq: '30 Hz' },
    { name: 'NCNN INT8 Core', sub: `${release.liveMetric.label}: ${release.liveMetric.value}`, active: true, freq: '32 ms' },
    { name: 'Feature Extraction', sub: 'Kinematic Landmark Tensors', active: true, freq: '48 dims' },
    { name: 'Real-Time Alert Dispatch', sub: 'Sub-second Gateway', active: true, freq: '1.2s dispatch' },
  ];

  const currentIndex = allReleases.findIndex((r) => r.id === release.id);
  const nextRelease = allReleases[(currentIndex + 1) % allReleases.length];
  const prevRelease = allReleases[(currentIndex - 1 + allReleases.length) % allReleases.length];

  return (
    <div className="fixed inset-0 z-50 bg-[#07110C] text-[#FAF8F5] overflow-hidden flex flex-col select-none animate-fade-in">
      {/* 3D Gatefold Double-Hinge Flaps (Animate Open upon entry) */}
      <div
        className="absolute inset-0 pointer-events-none z-40 transition-all duration-700 ease-in-out flex"
        style={{ perspective: '1600px' }}
      >
        {/* Left Flap */}
        <div
          className="w-1/2 h-full bg-[#14291E] border-r border-[#2D5A27] transition-transform duration-700 ease-in-out origin-left flex items-center justify-end p-8 shadow-2xl"
          style={{
            transform: unfolded ? 'rotateY(-110deg)' : 'rotateY(0deg)',
            opacity: unfolded ? 0 : 1,
          }}
        >
          <div className="text-right">
            <span className="text-xs font-mono text-[#A3E635] tracking-widest uppercase">
              3D GATEFOLD LEFT PANEL
            </span>
            <h2 className="text-2xl font-serif font-bold text-white mt-1">{release.title}</h2>
            <span className="text-xs font-mono text-[#86EFAC] mt-1 block">
              CATALOG: {release.catalogNumber}
            </span>
          </div>
        </div>

        {/* Right Flap */}
        <div
          className="w-1/2 h-full bg-[#14291E] border-l border-[#2D5A27] transition-transform duration-700 ease-in-out origin-right flex items-center justify-start p-8 shadow-2xl"
          style={{
            transform: unfolded ? 'rotateY(110deg)' : 'rotateY(0deg)',
            opacity: unfolded ? 0 : 1,
          }}
        >
          <div className="text-left">
            <span className="text-xs font-mono text-[#A3E635] tracking-widest uppercase">
              3D GATEFOLD RIGHT PANEL
            </span>
            <p className="text-sm font-mono text-[#86EFAC] mt-1">{release.repoName}</p>
            <span className="text-xs font-mono text-white/70 block">
              RELEASE: {release.releaseTag}
            </span>
          </div>
        </div>
      </div>

      {/* Persistent HUD Bar */}
      <header className="sticky top-0 z-30 bg-[#0A1610]/95 backdrop-blur-md border-b border-[#1B4332] px-4 sm:px-8 py-3 flex items-center justify-between gap-3 text-xs">
        {/* Left Lockup & Release Selector */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[#A3E635] font-bold text-[11px] uppercase bg-[#142C1F] px-2 py-0.5 rounded border border-[#2D5A27]">
            3D SCROLL WORLD
          </span>
          <span className="text-[#334E3F]">|</span>

          {allReleases.length > 0 && onSelectRelease ? (
            <select
              value={release.id}
              onChange={(e) => {
                const target = allReleases.find((r) => r.id === e.target.value);
                if (target) onSelectRelease(target);
              }}
              className="bg-[#142C1F] border border-[#2D5A27] rounded-lg px-2.5 py-1 text-white font-serif font-bold text-xs focus:outline-none focus:ring-1 focus:ring-[#22C55E]"
            >
              {allReleases.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title} ({r.repoName})
                </option>
              ))}
            </select>
          ) : (
            <span className="font-serif font-bold text-white truncate max-w-[200px] sm:max-w-xs">
              {release.title}
            </span>
          )}
        </div>

        {/* Chamber Depth Indicator Tabs */}
        <div className="hidden md:flex items-center gap-2 font-mono text-[11px]">
          {['01 Entrance', '02 File Tree', '03 Pipeline', '04 Runroom'].map((label, idx) => (
            <button
              key={idx}
              onClick={() => scrollToChamber(idx)}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activeChamber === idx
                  ? 'bg-[#1B4332] text-[#A3E635] font-bold border border-[#2D5A27] shadow-xs'
                  : 'text-[#63756A] hover:text-[#FAF8F5] hover:bg-[#142C1F]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right Actions: Next/Prev Repos, GitHub Link, Close */}
        <div className="flex items-center gap-2 sm:gap-3">
          {allReleases.length > 0 && onSelectRelease && (
            <div className="hidden sm:flex items-center gap-1">
              <button
                onClick={() => onSelectRelease(prevRelease)}
                className="p-1 rounded bg-[#142C1F] hover:bg-[#1B4332] border border-[#2D5A27] text-white"
                title={`Previous: ${prevRelease.repoName}`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onSelectRelease(nextRelease)}
                className="p-1 rounded bg-[#142C1F] hover:bg-[#1B4332] border border-[#2D5A27] text-white"
                title={`Next: ${nextRelease.repoName}`}
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <a
            href={release.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1 bg-[#142C1F] hover:bg-[#1B4332] border border-[#2D5A27] rounded-lg text-white font-mono text-[11px] transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub Repository</span>
            <ExternalLink className="w-3 h-3 text-[#A3E635]" />
          </a>

          <button
            onClick={handleClose}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#EF4444]/20 hover:bg-[#EF4444]/30 border border-[#EF4444]/40 text-[#FCA5A5] rounded-lg font-mono text-[11px] transition-colors shadow-xs"
          >
            <X className="w-3.5 h-3.5" />
            <span>Close (ESC)</span>
          </button>
        </div>
      </header>

      {/* Real-Time Scroll Progress Indicator */}
      <div className="w-full h-1 bg-[#14291E]">
        <div
          className="h-full bg-gradient-to-r from-[#22C55E] to-[#A3E635] transition-all duration-150"
          style={{ width: `${Math.round(scrollProgress * 100)}%` }}
        />
      </div>

      {/* Full-Screen Multi-Chamber Scroll World Viewport */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className={`flex-1 overflow-y-auto px-4 sm:px-8 py-10 space-y-28 max-w-5xl mx-auto w-full transition-all duration-700 ${
          unfolded ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-50 translate-y-6'
        }`}
      >
        {/* Chamber 01 • The Entrance */}
        <section
          ref={chamberRefs[0]}
          className="min-h-[75vh] flex flex-col justify-center space-y-6 pt-4 border-b border-[#1B4332]/60 pb-16 relative"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#A3E635] bg-[#142C1F] px-3 py-1 rounded-full border border-[#2D5A27] inline-block font-bold">
                Chamber 01 • The Entrance
              </span>
              <span className="text-xs font-mono text-[#64748B]">
                {release.repoName} ({release.releaseTag})
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
              {release.chambers[0]?.name || release.title}
            </h1>
            <p className="text-base sm:text-lg font-serif italic text-[#A7F3D0]">
              "{release.chambers[0]?.tagline}"
            </p>
          </div>

          <p className="text-sm text-[#CBD5E1] leading-relaxed max-w-3xl">
            {release.chambers[0]?.content}
          </p>

          {/* Key Specs Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {release.chambers[0]?.technicalSpecs.map((spec, i) => (
              <div key={i} className="p-3.5 bg-[#122A1E] rounded-xl border border-[#1B4332] shadow-xs">
                <span className="text-[10px] font-mono text-[#86EFAC] uppercase block font-semibold">
                  {spec.label}
                </span>
                <span className="text-sm font-mono font-bold text-white mt-0.5 block">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          {release.chambers[0]?.codeSnippet && (
            <div className="bg-[#040B07] rounded-xl border border-[#1B4332] p-4 text-xs font-mono text-[#86EFAC] overflow-x-auto shadow-inner">
              <pre>{release.chambers[0].codeSnippet}</pre>
            </div>
          )}

          {/* Floating Next Chamber Scroll Hint */}
          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => scrollToChamber(1)}
              className="px-4 py-2 rounded-xl bg-[#142C1F] hover:bg-[#1B4332] text-[#A3E635] text-xs font-mono flex items-center gap-2 border border-[#2D5A27] transition-all"
            >
              <span>Scroll to Chamber 02 • Architecture &amp; File Tree</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </button>

            <a
              href={release.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-white/80 hover:text-white flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>https://github.com/thapaprogress/{release.repoName}</span>
            </a>
          </div>
        </section>

        {/* Chamber 02 • Master Code & Architecture Archive */}
        <section
          ref={chamberRefs[1]}
          className="min-h-[75vh] flex flex-col justify-center space-y-6 border-b border-[#1B4332]/60 pb-16"
        >
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#A3E635] bg-[#142C1F] px-3 py-1 rounded-full border border-[#2D5A27] inline-block font-bold">
              Chamber 02 • Architecture &amp; File Tree
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              {release.chambers[1]?.name || 'Repository Directory Structure'}
            </h2>
            <p className="text-sm font-mono text-[#A7F3D0]">
              {release.chambers[1]?.tagline}
            </p>
          </div>

          <p className="text-sm text-[#CBD5E1] leading-relaxed max-w-3xl">
            {release.chambers[1]?.content}
          </p>

          {/* Interactive File Tree Browser */}
          <div className="bg-[#040B07] rounded-xl border border-[#1B4332] p-5 font-mono text-xs space-y-2 shadow-inner">
            <div className="flex items-center justify-between border-b border-[#1B4332] pb-2 text-[11px] text-[#A3E635]">
              <span>GITHUB REPOSITORY: thapaprogress/{release.repoName}</span>
              <span>SHA: {release.commitHash}</span>
            </div>

            <div className="space-y-1.5 pt-2 max-h-72 overflow-y-auto pr-2">
              {release.fileTree.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-white hover:text-[#A3E635] p-1.5 rounded hover:bg-[#142C1F] transition-colors">
                    <span className="font-semibold flex items-center gap-1.5">
                      <span>{item.type === 'folder' ? '📁' : '📄'}</span>
                      <span>{item.name}</span>
                    </span>
                    <span className="text-[10px] text-[#64748B]">{item.sizeOrLines}</span>
                  </div>
                  {item.children && (
                    <div className="pl-5 border-l border-[#1B4332] space-y-1">
                      {item.children.map((child, cIdx) => (
                        <div
                          key={cIdx}
                          className="flex items-center justify-between text-[#CBD5E1] p-1 rounded hover:bg-[#142C1F]"
                        >
                          <span className="flex items-center gap-1.5">
                            <span>└ 📄</span>
                            <span className="text-white">{child.name}</span>
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] text-[#86EFAC]">{child.description}</span>
                            <span className="text-[10px] text-[#64748B]">{child.sizeOrLines}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => scrollToChamber(2)}
              className="px-4 py-2 rounded-xl bg-[#142C1F] hover:bg-[#1B4332] text-[#A3E635] text-xs font-mono flex items-center gap-2 border border-[#2D5A27] transition-all"
            >
              <span>Scroll to Chamber 03 • Multitrack Stems</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </div>
        </section>

        {/* Chamber 03 • Multitrack Pipeline Console */}
        <section
          ref={chamberRefs[2]}
          className="min-h-[75vh] flex flex-col justify-center space-y-6 border-b border-[#1B4332]/60 pb-16"
        >
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#A3E635] bg-[#142C1F] px-3 py-1 rounded-full border border-[#2D5A27] inline-block font-bold">
              Chamber 03 • Multitrack Pipeline Console
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              {release.chambers[2]?.name || 'Inference Pipeline Stems'}
            </h2>
            <p className="text-sm font-mono text-[#A7F3D0]">
              {release.chambers[2]?.tagline}
            </p>
          </div>

          <p className="text-sm text-[#CBD5E1] leading-relaxed max-w-3xl">
            {release.chambers[2]?.content}
          </p>

          {/* Interactive Multitrack Stem Strips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {pipelineStems.map((stem, idx) => {
              const isSelected = activePipelineStem === idx;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setActivePipelineStem(isSelected ? null : idx);
                    soundEngine.playTonePreview(release.baseFrequency * (1 + idx * 0.25));
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#183D2B] border-[#22C55E] ring-2 ring-[#22C55E]'
                      : 'bg-[#0E2218] border-[#1B4332] hover:bg-[#142D20]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                    <span className="text-[#86EFAC] font-bold">STEM 0{idx + 1}</span>
                    <span className="text-white/60">{stem.freq}</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-white">{stem.name}</h4>
                  <p className="text-xs text-[#94A3B8] mt-1">{stem.sub}</p>

                  {/* Animated VU frequency meter */}
                  <div className="mt-4 flex items-end gap-1 h-8 bg-black/40 p-1.5 rounded">
                    {Array.from({ length: 8 }).map((_, barIdx) => (
                      <div
                        key={barIdx}
                        className={`w-full rounded-t transition-all ${
                          isSelected ? 'bg-[#22C55E]' : 'bg-[#1B4332]'
                        }`}
                        style={{
                          height: `${Math.floor(Math.sin(barIdx + idx) * 35 + 50)}%`,
                        }}
                      />
                    ))}
                  </div>

                  <span className="text-[10px] font-mono text-center block mt-2 text-[#86EFAC]">
                    {isSelected ? 'ACTIVE SOLO CHANNEL' : 'CLICK TO SOLO STEM'}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              onClick={() => scrollToChamber(3)}
              className="px-4 py-2 rounded-xl bg-[#142C1F] hover:bg-[#1B4332] text-[#A3E635] text-xs font-mono flex items-center gap-2 border border-[#2D5A27] transition-all"
            >
              <span>Scroll to Chamber 04 • Field Runroom</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </div>
        </section>

        {/* Chamber 04 • Runroom & Benchmark Terminal */}
        <section
          ref={chamberRefs[3]}
          className="min-h-[75vh] flex flex-col justify-center space-y-6 pb-24"
        >
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#A3E635] bg-[#142C1F] px-3 py-1 rounded-full border border-[#2D5A27] inline-block font-bold">
              Chamber 04 • Field Runroom
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              {release.chambers[3]?.name || 'Live Field Verification Runroom'}
            </h2>
            <p className="text-sm font-mono text-[#A7F3D0]">
              {release.chambers[3]?.tagline}
            </p>
          </div>

          <p className="text-sm text-[#CBD5E1] leading-relaxed max-w-3xl">
            {release.chambers[3]?.content}
          </p>

          {/* Dependencies table */}
          <div className="bg-[#040B07] rounded-xl border border-[#1B4332] p-4 text-xs font-mono shadow-inner">
            <span className="text-[11px] font-bold text-[#A3E635] block mb-2">
              CORE SYSTEM DEPENDENCIES &amp; LIBRARIES
            </span>
            <div className="divide-y divide-[#1B4332]">
              {release.dependencies.map((dep, i) => (
                <div key={i} className="py-2.5 flex items-center justify-between text-white/90">
                  <span className="font-bold text-[#86EFAC]">
                    {dep.name} @{dep.version}
                  </span>
                  <span className="text-[#94A3B8]">{dep.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action to Return / Open GitHub */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={release.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-2.5 bg-[#22C55E] hover:bg-[#16A34A] text-black font-bold rounded-xl text-xs font-mono transition-colors shadow-lg flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>Clone or View on GitHub</span>
            </a>

            <button
              onClick={handleClose}
              className="px-6 py-2.5 bg-[#1B4332] hover:bg-[#255741] text-white font-bold rounded-xl text-xs font-mono transition-colors shadow-lg flex items-center gap-2 border border-[#2D5A27]"
            >
              <span>Fold Gatefold Jacket &amp; Return to Crate (ESC)</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
