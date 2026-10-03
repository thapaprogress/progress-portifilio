import React, { useEffect } from 'react';
import { VisualTile } from '../types/portfolio';
import { DeveloperGraphic } from './DeveloperGraphic';
import { X, ChevronLeft, ChevronRight, Terminal, Cpu, Info } from 'lucide-react';

interface VisualLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  tiles: VisualTile[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  projectTitle?: string;
}

export const VisualLightboxModal: React.FC<VisualLightboxModalProps> = ({
  isOpen,
  onClose,
  tiles,
  currentIndex,
  onSelectIndex,
  projectTitle,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && currentIndex < tiles.length - 1) {
        onSelectIndex(currentIndex + 1);
      }
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onSelectIndex(currentIndex - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, tiles.length, onClose, onSelectIndex]);

  if (!isOpen || tiles.length === 0) return null;

  const currentTile = tiles[currentIndex] || tiles[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-black/40 hover:bg-black/70 rounded-full transition-colors z-20"
        aria-label="Close schematic viewer"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Main Lightbox Canvas */}
      <div className="relative max-w-4xl w-full bg-[#14261C] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Top Header Info */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#0F1D15] text-[#FAF8F5]">
          <div className="min-w-0 pr-4">
            <h3 className="text-sm font-serif font-bold truncate text-[#E8EFEA]">
              {projectTitle || 'System Schematic & Architecture'}
            </h3>
            <div className="flex items-center gap-2 text-xs text-[#A3B8AC] mt-0.5">
              <Cpu className="w-3.5 h-3.5 text-[#A3E635]" />
              <span className="truncate">{currentTile.title}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-[#86EFAC]">{currentTile.subtitle}</span>
            </div>
          </div>

          <div className="text-xs font-mono text-[#A3B8AC] tabular-nums shrink-0">
            {currentIndex + 1} / {tiles.length}
          </div>
        </div>

        {/* Big Graphic Display Area */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-[#0A130E] flex items-center justify-center overflow-hidden">
          <DeveloperGraphic
            diagramType={currentTile.diagramType}
            className="w-full h-full object-cover"
          />

          {/* Navigation Arrows */}
          {currentIndex > 0 && (
            <button
              onClick={() => onSelectIndex(currentIndex - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
              aria-label="Previous schematic"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {currentIndex < tiles.length - 1 && (
            <button
              onClick={() => onSelectIndex(currentIndex + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
              aria-label="Next schematic"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Badge indicator on graphic if present */}
          {currentTile.badge && (
            <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-[#1B4332]/90 backdrop-blur-xs text-xs font-semibold text-[#FAF8F5] border border-white/20">
              {currentTile.badge}
            </div>
          )}
        </div>

        {/* Bottom Caption & Thumbnail Strip */}
        <div className="p-4 bg-[#0F1D15] border-t border-white/10 space-y-3">
          <div className="flex items-start gap-2 text-xs text-[#E2ECE5]">
            <Info className="w-4 h-4 text-[#A3E635] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <span className="font-semibold text-white">{currentTile.title}:</span> {currentTile.subtitle}. Integrated within the production pipeline at Madan Bhandari University and Prajna World Tech.
            </p>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
            {tiles.map((tile, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={tile.id}
                  onClick={() => onSelectIndex(idx)}
                  className={`relative w-20 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    isSelected
                      ? 'border-[#A3E635] scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <DeveloperGraphic diagramType={tile.diagramType} className="w-full h-full" />
                  <span className="absolute bottom-0.5 right-1 text-[9px] font-mono text-white/90">
                    #{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
