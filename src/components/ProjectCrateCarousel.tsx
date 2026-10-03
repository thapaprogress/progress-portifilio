import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ProjectSleeveRelease } from '../types/crate';
import { soundEngine } from '../utils/audioEngine';
import { allThapaGithubRepos } from '../data/githubCrateData';
import {
  RotateCcw,
  Sparkles,
  ExternalLink,
  Github,
  Maximize2,
  FolderOpen,
  Volume2,
  VolumeX,
  Keyboard,
  Disc,
  Layers,
  ChevronLeft,
  ChevronRight,
  Code,
  FileCode,
  Tag,
  Share2,
  Search,
  Filter,
  Check,
  Star,
  GitBranch,
} from 'lucide-react';

interface ProjectCrateCarouselProps {
  releases: ProjectSleeveRelease[];
  onOpenGatefold: (release: ProjectSleeveRelease) => void;
  onOpenQuickDrawer?: () => void;
}

export const ProjectCrateCarousel: React.FC<ProjectCrateCarouselProps> = ({
  releases,
  onOpenGatefold,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEjected, setIsEjected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const [activeTheme, setActiveTheme] = useState<'studio' | 'midnight'>('studio');
  const [showAllReposDrawer, setShowAllReposDrawer] = useState(false);
  const [repoSearchQuery, setRepoSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);

  const activeRelease = releases[activeIndex] || releases[0];

  const handleSelectIndex = useCallback(
    (newIndex: number) => {
      const normalized = (newIndex + releases.length) % releases.length;
      if (normalized !== activeIndex) {
        soundEngine.playCrateFlickSound();
        setActiveIndex(normalized);
        setIsFlipped(false);
        setIsEjected(false);
        if (isPlayingPreview) {
          soundEngine.playTonePreview(releases[normalized].baseFrequency);
        }
      }
    },
    [activeIndex, releases, isPlayingPreview]
  );

  const handleNext = useCallback(() => {
    handleSelectIndex(activeIndex + 1);
  }, [activeIndex, handleSelectIndex]);

  const handlePrev = useCallback(() => {
    handleSelectIndex(activeIndex - 1);
  }, [activeIndex, handleSelectIndex]);

  const handleToggleFlip = useCallback(() => {
    soundEngine.playFolderOpenSound();
    setIsFlipped((prev) => !prev);
  }, []);

  const handleToggleEject = useCallback(() => {
    soundEngine.playSlideSound();
    setIsEjected((prev) => !prev);
  }, []);

  const handleToggleMute = useCallback(() => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
  }, [isMuted]);

  const handleLaunchGatefold = useCallback(() => {
    soundEngine.playFolderOpenSound();
    soundEngine.playTonePreview(activeRelease.baseFrequency);
    onOpenGatefold(activeRelease);
  }, [activeRelease, onOpenGatefold]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        handleToggleFlip();
      } else if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        handleToggleEject();
      } else if (e.key === 'g' || e.key === 'G' || e.key === 'Enter') {
        e.preventDefault();
        handleLaunchGatefold();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        handleToggleMute();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlayingPreview((prev) => {
          const next = !prev;
          if (next) soundEngine.playTonePreview(activeRelease.baseFrequency);
          return next;
        });
      } else if (e.key >= '1' && e.key <= '9') {
        const slot = parseInt(e.key, 10) - 1;
        if (slot < releases.length) {
          e.preventDefault();
          handleSelectIndex(slot);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleToggleFlip, handleToggleEject, handleLaunchGatefold, handleToggleMute, handleSelectIndex, activeRelease, releases.length]);

  // Mouse drag & touch swipe
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX.current !== null) {
      const delta = e.clientX - dragStartX.current;
      if (delta < -50) handleNext();
      else if (delta > 50) handlePrev();
      dragStartX.current = null;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX.current !== null) {
      const delta = e.changedTouches[0].clientX - dragStartX.current;
      if (delta < -50) handleNext();
      else if (delta > 50) handlePrev();
      dragStartX.current = null;
    }
  };

  // Color styles for silicon wafer variants
  const waferColors = {
    emerald: 'from-[#064E3B] via-[#047857] to-[#10B981]',
    cobalt: 'from-[#1E3A8A] via-[#1D4ED8] to-[#3B82F6]',
    amber: 'from-[#78350F] via-[#B45309] to-[#F59E0B]',
    ruby: 'from-[#831843] via-[#BE185D] to-[#EC4899]',
    obsidian: 'from-[#111827] via-[#1F2937] to-[#374151]',
    tangerine: 'from-[#7C2D12] via-[#C2410C] to-[#F97316]',
  };

  const filteredRawRepos = allThapaGithubRepos.filter((repo) => {
    if (selectedCategory !== 'all' && !repo.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
      return false;
    }
    if (repoSearchQuery.trim()) {
      const q = repoSearchQuery.toLowerCase();
      return (
        repo.name.toLowerCase().includes(q) ||
        repo.description.toLowerCase().includes(q) ||
        repo.language.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div
      className={`rounded-2xl border transition-colors select-none p-5 sm:p-8 flex flex-col items-center justify-between min-h-[620px] overflow-hidden ${
        activeTheme === 'studio'
          ? 'bg-[#FAF8F5] border-[#E8E2D5] text-[#14261C]'
          : 'bg-[#121110] border-[#292524] text-[#FAF8F5]'
      }`}
    >
      {/* Top Telemetry & Controls HUD */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 text-xs mb-4 z-20">
        <div className="flex items-center gap-2">
          <span className="font-mono uppercase tracking-wider text-[11px] font-bold text-[#1B4332] bg-[#E8EFEA] px-2.5 py-0.5 rounded-full border border-[#C5D9CB]">
            3D Project Crate Discovery · Interactive 3D Archive
          </span>
          <span className="text-[#64748B] font-mono text-[11px] hidden sm:inline">
            Catalog: {activeRelease.catalogNumber}
          </span>
        </div>

        {/* Theme, All Repos, and action controls */}
        <div className="flex items-center gap-2">
          {/* All 52 GitHub Repositories Explorer Trigger */}
          <button
            onClick={() => setShowAllReposDrawer(!showAllReposDrawer)}
            className="px-2.5 py-1 rounded-lg border border-[#CBD5E1] bg-white/90 text-[11px] font-mono hover:bg-white text-[#1B4332] font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Github className="w-3.5 h-3.5" />
            <span>All 52 GitHub Repos ({allThapaGithubRepos.length})</span>
          </button>

          {/* Audio Mute Toggle */}
          <button
            onClick={handleToggleMute}
            className={`p-1.5 rounded-lg border text-xs transition-colors ${
              isMuted
                ? 'bg-red-50 text-red-600 border-red-200'
                : 'bg-white/80 border-[#CBD5E1] text-[#1B4332] hover:bg-white'
            }`}
            title={isMuted ? 'Tactile Web Audio Muted' : 'Tactile Web Audio Active'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Theme switcher */}
          <button
            onClick={() => setActiveTheme(activeTheme === 'studio' ? 'midnight' : 'studio')}
            className="px-2.5 py-1 rounded-lg border border-[#CBD5E1] bg-white/80 text-[11px] font-mono hover:bg-white transition-colors"
          >
            {activeTheme === 'studio' ? '🌙 Midnight Mode' : '☀️ Studio Warm'}
          </button>

          {/* Keyboard help modal trigger */}
          <button
            onClick={() => setShowKeyboardHelp(!showKeyboardHelp)}
            className="p-1.5 rounded-lg border border-[#CBD5E1] bg-white/80 text-[#55695C] hover:bg-white transition-colors"
            title="Keyboard shortcuts guide"
          >
            <Keyboard className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main 3D Perspective Stage Area */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-[370px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{
          perspective: '1300px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Diffused Floor Shadow */}
        <div
          className="absolute bottom-6 w-[440px] h-[35px] rounded-full pointer-events-none transition-transform duration-300"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(15, 25, 20, 0.42) 0%, transparent 75%)',
            transform: 'translateZ(-60px) rotateX(75deg)',
          }}
        />

        {/* 3D Crate Carousel Sleeves */}
        {releases.map((release, index) => {
          let diff = index - activeIndex;
          if (diff > releases.length / 2) diff -= releases.length;
          if (diff < -releases.length / 2) diff += releases.length;

          const isActive = index === activeIndex;

          // 3D Fanning Physics Formula
          const rotateY = diff * -24;
          const translateX = diff * 155 + (isActive ? 0 : diff > 0 ? 55 : -55);
          const translateZ = -Math.abs(diff) * 140;
          const scale = Math.max(0.72, 1 - Math.abs(diff) * 0.12);
          const opacity = Math.max(0.25, 1 - Math.abs(diff) * 0.28);
          const zIndex = Math.round(40 - Math.abs(diff) * 5);

          return (
            <div
              key={release.id}
              onClick={(e) => {
                e.stopPropagation();
                if (isActive) {
                  // Direct Clickable Crate -> Launch Scroll World!
                  handleLaunchGatefold();
                } else {
                  handleSelectIndex(index);
                }
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                handleLaunchGatefold();
              }}
              className={`absolute w-[295px] h-[295px] transition-transform duration-500 ease-out origin-center cursor-pointer ${
                isActive ? 'group' : ''
              }`}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex,
                transformStyle: 'preserve-3d',
              }}
              title={isActive ? 'Click to open 3D Gatefold Scroll World' : `Click to inspect ${release.repoName}`}
            >
              {/* The Archival Silicon Wafer / Optical Disc (Slides out from inside jacket) */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleLaunchGatefold();
                }}
                className={`absolute inset-y-2 right-0 w-[280px] h-[280px] rounded-full overflow-hidden transition-all duration-500 shadow-2xl cursor-pointer ${
                  isActive && isPlayingPreview ? 'animate-spin' : ''
                }`}
                style={{
                  transform: isActive
                    ? isEjected
                      ? 'translateX(165px) rotate(45deg)'
                      : 'translateX(78px) rotate(28deg)'
                    : 'translateX(0px) rotate(0deg)',
                  background:
                    'repeating-radial-gradient(circle at center, #0F172A 0px, #0F172A 3px, #1E293B 4px, #0F172A 5px)',
                  animationDuration: '1.8s',
                }}
              >
                {/* Anisotropic conical light sheen */}
                <div
                  className="absolute inset-0 opacity-40 pointer-events-none"
                  style={{
                    background:
                      'conic-gradient(from 45deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.4) 45deg, transparent 90deg, transparent 180deg, rgba(255,255,255,0.4) 225deg, transparent 270deg)',
                  }}
                />

                {/* Deadwax runout matrix groove area */}
                <div className="absolute inset-16 rounded-full border border-white/20 flex items-center justify-center pointer-events-none">
                  <span className="text-[7px] font-mono text-white/50 tracking-widest uppercase">
                    {release.matrixCode}
                  </span>
                </div>

                {/* Center silicon wafer label */}
                <div
                  className={`absolute inset-24 rounded-full bg-gradient-to-tr ${
                    waferColors[release.waferVariant]
                  } flex flex-col items-center justify-center p-2 text-center text-white border-2 border-white/40 shadow-inner`}
                >
                  <span className="text-[8px] font-mono font-bold tracking-wider uppercase">
                    RELEASE {release.releaseTag}
                  </span>
                  <span className="text-[10px] font-serif font-bold truncate max-w-[90px] leading-tight">
                    {release.repoName}
                  </span>
                  <span className="text-[7px] font-mono text-white/80">
                    {release.commitHash} · {release.license}
                  </span>

                  {/* Chrome Bushing Spindle Hole */}
                  <div className="w-5 h-5 rounded-full bg-[#CBD5E1] border-2 border-[#64748B] shadow-inner mt-1 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-black/80" />
                  </div>
                </div>
              </div>

              {/* Physical Cardboard Jacket Sleeve (Has 3D Flip Transform) */}
              <div
                className={`relative w-full h-full rounded-xl transition-all duration-700 ease-in-out ${
                  isActive
                    ? 'ring-2 ring-[#22C55E] shadow-[0_0_30px_rgba(34,197,94,0.35)] group-hover:scale-[1.02]'
                    : 'hover:brightness-110'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isActive && isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* FRONT COVER of the Project Release Jacket */}
                <div
                  className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#162C21] text-white flex flex-col justify-between p-4 backface-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    background: `linear-gradient(135deg, ${release.coverAccent} 0%, #0B1611 100%)`,
                  }}
                >
                  {/* Cardboard laminate sheen overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-black/30 pointer-events-none" />

                  {/* Left Spine Shadow Fold & White Highlight */}
                  <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/50 to-transparent pointer-events-none" />
                  <div className="absolute left-0.5 top-0 bottom-0 w-0.5 bg-white/30 pointer-events-none" />

                  {/* Right Edge Die-Cut Thumb Notch for Wafer */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-14 bg-black/40 rounded-l-full border-l border-white/20 pointer-events-none" />

                  {/* Top Cover Lockup */}
                  <div className="relative z-10 flex items-start justify-between">
                    <div>
                      <span className="text-[9px] font-mono tracking-widest uppercase text-[#A3E635] block font-bold">
                        {release.category}
                      </span>
                      <span className="text-[10px] font-mono text-white/70">
                        {release.catalogNumber}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {isActive && (
                        <span className="px-2 py-0.5 rounded-full bg-[#22C55E] text-[#0A1610] text-[9px] font-mono font-bold flex items-center gap-1 shadow-xs animate-pulse">
                          <FolderOpen className="w-2.5 h-2.5" />
                          <span>Click to Open</span>
                        </span>
                      )}
                      <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-black/40 text-white/90 border border-white/10">
                        {release.releaseTag}
                      </span>
                    </div>
                  </div>

                  {/* Center Architectural Title in High-Character Display Serif */}
                  <div className="relative z-10 text-center py-3">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight leading-snug drop-shadow-md">
                      {release.title}
                    </h3>
                    <p className="text-[11px] font-mono text-[#A7F3D0] mt-1.5 truncate">
                      {release.subtitle}
                    </p>

                    {isActive && (
                      <div className="mt-2.5 flex items-center justify-center">
                        <span className="px-2.5 py-0.5 rounded-full bg-white/15 border border-white/30 text-[10px] font-mono text-white shadow-xs group-hover:bg-[#22C55E] group-hover:text-black group-hover:border-[#22C55E] transition-all">
                          ⚡ Click sleeve to enter Scroll World
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Release Specs & Barcode Stamp */}
                  <div className="relative z-10 flex items-end justify-between border-t border-white/10 pt-2 text-[10px] font-mono">
                    <div>
                      <span className="text-white/60 block">STARS: ★ {release.stars}</span>
                      <span className="text-white/80 font-bold">{release.license} LICENSE</span>
                    </div>

                    <div className="text-right">
                      {/* Stylized Barcode stamp */}
                      <div className="h-4 w-18 flex gap-[1.5px] items-end justify-end mb-0.5 opacity-80">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <div
                            key={i}
                            className="bg-white"
                            style={{
                              width: i % 3 === 0 ? '2px' : '1px',
                              height: i % 2 === 0 ? '100%' : '75%',
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-[8px] text-white/50">{release.commitHash}</span>
                    </div>
                  </div>
                </div>

                {/* BACK COVER of the Project Release Jacket (Revealed upon Flip 'F') */}
                <div
                  className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl border border-white/15 bg-[#0D1C15] text-[#FAF8F5] p-4 flex flex-col justify-between"
                  style={{
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-[10px] font-mono">
                    <span className="text-[#A3E635] font-bold">RELEASE ARCHIVE</span>
                    <span className="text-white/60">{release.repoName}</span>
                  </div>

                  {/* File Tree Directory Structure */}
                  <div className="my-2 space-y-1 text-[11px] font-mono overflow-y-auto max-h-[145px] pr-1">
                    <div className="text-[#86EFAC] font-bold text-[10px] flex items-center gap-1">
                      <Code className="w-3 h-3" />
                      <span>REPOSITORY FILE TREE</span>
                    </div>
                    {release.fileTree.map((item, i) => (
                      <div key={i} className="pl-1">
                        <div className="flex items-center justify-between text-white/90 hover:text-white">
                          <span className="truncate">
                            {item.type === 'folder' ? '📁' : '📄'} {item.name}
                          </span>
                          <span className="text-[9px] text-[#64748B] shrink-0 font-mono">
                            {item.sizeOrLines}
                          </span>
                        </div>
                        {item.children && (
                          <div className="pl-3 border-l border-white/10 space-y-0.5 mt-0.5">
                            {item.children.slice(0, 3).map((c, ci) => (
                              <div key={ci} className="text-[10px] text-white/70 truncate">
                                └ {c.name}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Dependencies & Gatefold Trigger */}
                  <div className="border-t border-white/10 pt-2 flex items-center justify-between text-[10px] font-mono">
                    <div>
                      <span className="text-[#A7F3D0] block">Press 'G' for 3D Gatefold</span>
                      <span className="text-white/60">{release.dependencies.length} core dependencies</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLaunchGatefold();
                      }}
                      className="px-2.5 py-1 bg-[#22C55E] text-black font-bold rounded text-[10px] hover:bg-[#16A34A] transition-colors"
                    >
                      Open Gatefold →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Crate Control Tray */}
      <div className="w-full max-w-xl mx-auto mt-6 z-20 flex flex-col items-center gap-3">
        {/* Active Title & Actions */}
        <div className="text-center">
          <h2 className="text-lg sm:text-xl font-serif font-bold tracking-tight">
            {activeRelease.title}
          </h2>
          <p className="text-xs font-mono text-[#55695C] mt-0.5">
            {activeRelease.repoName} ({activeRelease.releaseTag}) · {activeRelease.liveMetric.label}:{' '}
            <strong className="text-[#1B4332]">{activeRelease.liveMetric.value}</strong>
          </p>
        </div>

        {/* Tactile Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <button
            onClick={handlePrev}
            className="p-2 rounded-lg border border-[#CBD5E1] bg-white/80 hover:bg-white text-[#14261C] transition-colors"
            title="Previous project (←)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleToggleFlip}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              isFlipped
                ? 'bg-[#1B4332] text-white border-[#1B4332]'
                : 'bg-white/80 border-[#CBD5E1] text-[#14261C] hover:bg-white'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isFlipped ? 'Front Cover (F)' : '3D Flip Inspect (F)'}</span>
          </button>

          <button
            onClick={handleToggleEject}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              isEjected
                ? 'bg-[#D97706] text-white border-[#D97706]'
                : 'bg-white/80 border-[#CBD5E1] text-[#14261C] hover:bg-white'
            }`}
          >
            <Disc className="w-3.5 h-3.5" />
            <span>{isEjected ? 'Retract Disc (E)' : 'Eject Disc (E)'}</span>
          </button>

          <button
            onClick={handleLaunchGatefold}
            className="px-4 py-1.5 rounded-lg bg-[#1B4332] hover:bg-[#255741] active:bg-[#14261C] text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm ring-1 ring-[#22C55E]/40"
          >
            <FolderOpen className="w-3.5 h-3.5 text-[#A3E635]" />
            <span>Enter 3D Scroll World (G)</span>
          </button>

          <button
            onClick={handleNext}
            className="p-2 rounded-lg border border-[#CBD5E1] bg-white/80 hover:bg-white text-[#14261C] transition-colors"
            title="Next project (→)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Crate Slot Jump Markers */}
        <div className="flex items-center gap-1.5 pt-2 flex-wrap justify-center">
          {releases.map((rel, idx) => (
            <button
              key={rel.id}
              onClick={() => handleSelectIndex(idx)}
              className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                activeIndex === idx
                  ? 'bg-[#1B4332] text-white shadow-xs scale-110 ring-2 ring-[#22C55E]'
                  : 'bg-white/60 hover:bg-white text-[#55695C] border border-[#CBD5E1]'
              }`}
              title={`${rel.title} (Key: ${idx + 1})`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* ALL 52 GITHUB REPOSITORIES DRAWER MODAL */}
      {showAllReposDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-4xl max-h-[85vh] bg-[#FAF8F5] text-[#14261C] rounded-2xl border border-[#CBD5E1] shadow-2xl flex flex-col overflow-hidden">
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-[#E8E2D5] bg-white flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Github className="w-5 h-5 text-[#1B4332]" />
                  <h3 className="text-base sm:text-lg font-serif font-bold text-[#14261C]">
                    All GitHub Repositories (@thapaprogress)
                  </h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#E8EFEA] text-[#1B4332] font-semibold">
                    {allThapaGithubRepos.length} Repositories
                  </span>
                </div>
                <p className="text-xs text-[#526357] mt-0.5">
                  Directly fetched from https://github.com/thapaprogress?tab=repositories
                </p>
              </div>

              <button
                onClick={() => setShowAllReposDrawer(false)}
                className="p-1.5 rounded-lg border border-[#CBD5E1] bg-[#FAF8F5] hover:bg-[#F2ECE1] text-[#14261C] font-mono text-xs"
              >
                ✕ Close
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-3.5 bg-white border-b border-[#E8E2D5] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 text-[#8A9C90] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search 52 repositories..."
                  value={repoSearchQuery}
                  onChange={(e) => setRepoSearchQuery(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-[#E2DBD0] bg-[#FAF8F5] text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                {['all', 'Vision', '3D Graphics', 'IoT', 'Mobile', 'PHP'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? 'bg-[#1B4332] text-white'
                        : 'bg-[#FAF8F5] text-[#55695C] hover:bg-[#F2ECE1]'
                    }`}
                  >
                    {cat === 'all' ? 'All' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Repositories Grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredRawRepos.map((repo, idx) => {
                const matchingRelease = releases.find((r) => r.repoName === repo.name);
                return (
                  <div
                    key={idx}
                    className="p-4 bg-white rounded-xl border border-[#E8E2D5] hover:border-[#1B4332] transition-all flex flex-col justify-between gap-2 shadow-2xs group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-serif font-bold text-[#14261C] group-hover:text-[#1B4332] transition-colors flex items-center gap-1.5">
                          <GitBranch className="w-3.5 h-3.5 text-[#22C55E]" />
                          <span>{repo.name}</span>
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#EDE7DC] text-[#55695C]">
                          {repo.language || 'Code'}
                        </span>
                      </div>
                      <p className="text-xs text-[#526357] mt-1 leading-relaxed">
                        {repo.description || 'Repository by Progress Thapa (@thapaprogress).'}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#F0ECE1] flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2 text-[#64748B] text-[11px]">
                        <span>★ {repo.stars}</span>
                        <span>·</span>
                        <span>{repo.category}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {matchingRelease && (
                          <button
                            onClick={() => {
                              setShowAllReposDrawer(false);
                              onOpenGatefold(matchingRelease);
                            }}
                            className="px-2 py-1 rounded bg-[#1B4332] text-white text-[10px] font-semibold hover:bg-[#255741] flex items-center gap-1"
                          >
                            <FolderOpen className="w-3 h-3 text-[#A3E635]" />
                            <span>3D Scroll World</span>
                          </button>
                        )}
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2 py-1 rounded border border-[#CBD5E1] bg-[#FAF8F5] hover:bg-[#F2ECE1] text-[10px] font-semibold text-[#14261C] flex items-center gap-1"
                        >
                          <Github className="w-3 h-3" />
                          <span>GitHub</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Modal */}
      {showKeyboardHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-sm bg-white rounded-2xl border border-[#CBD5E1] shadow-2xl p-5 text-xs animate-fade-in text-[#14261C]">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-1.5 font-bold font-serif text-sm">
                <Keyboard className="w-4 h-4 text-[#1B4332]" />
                <span>Crate Keyboard Shortcuts</span>
              </div>
              <button
                onClick={() => setShowKeyboardHelp(false)}
                className="p-1 hover:bg-[#F1F5F9] rounded"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 space-y-2 font-mono">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Click Sleeve / G / Enter</span>
                <span className="font-semibold text-[#1B4332]">Open 3D Scroll World</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">← / →</span>
                <span className="font-semibold">Browse Crate Items</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">F</span>
                <span className="font-semibold">Flip Sleeve (Back Cover)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">E</span>
                <span className="font-semibold">Eject / Retract Optical Disc</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Space</span>
                <span className="font-semibold">Harmonic Audio Tone</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">M</span>
                <span className="font-semibold">Mute / Unmute Synthesizer</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">1 – 7</span>
                <span className="font-semibold">Direct Jump to Slot</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
