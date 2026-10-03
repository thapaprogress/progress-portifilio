import React from 'react';
import { VisualTile } from '../types/portfolio';
import { DeveloperGraphic } from './DeveloperGraphic';
import { Layers, Maximize2, Cpu } from 'lucide-react';

interface ProjectTilesProps {
  tiles: VisualTile[];
  onOpenTile: (index: number) => void;
  maxDisplay?: number;
}

export const ProjectTiles: React.FC<ProjectTilesProps> = ({
  tiles,
  onOpenTile,
  maxDisplay = 3,
}) => {
  if (!tiles || tiles.length === 0) return null;

  const displayTiles = tiles.slice(0, maxDisplay);
  const remainingCount = tiles.length - maxDisplay;

  const gridClass =
    displayTiles.length === 1
      ? 'grid-cols-1'
      : displayTiles.length === 2
      ? 'grid-cols-2'
      : 'grid-cols-3';

  return (
    <div className={`grid ${gridClass} gap-2 rounded-xl overflow-hidden`}>
      {displayTiles.map((tile, index) => {
        const isLastAndHasOverflow = index === maxDisplay - 1 && remainingCount > 0;

        return (
          <div
            key={tile.id}
            onClick={() => onOpenTile(index)}
            className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-[#0F241A] cursor-pointer border border-[#1B4332]/40 transition-transform active:scale-[0.99]"
          >
            {/* Developer Vector Graphic */}
            <DeveloperGraphic
              diagramType={tile.diagramType}
              className="w-full h-full transition-transform duration-300 group-hover:scale-105"
            />

            {/* Gradient Scrim for readable titles */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

            {/* Hover Expand Icon */}
            <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white/80 group-hover:text-white group-hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>

            {/* Title & Metadata */}
            <div className="absolute bottom-2 left-2 right-2 text-white">
              <p className="text-[11px] font-semibold truncate leading-tight drop-shadow-xs text-white">
                {tile.title}
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-white/80 font-mono tabular-nums mt-0.5">
                <span className="truncate">{tile.subtitle}</span>
                {tile.badge && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#A3E635] font-sans font-medium shrink-0">
                      {tile.badge}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Count Overlay on Last Tile */}
            {isLastAndHasOverflow && (
              <div className="absolute inset-0 bg-[#0B1A13]/85 backdrop-blur-[2px] flex flex-col items-center justify-center text-white transition-colors group-hover:bg-[#0B1A13]/90">
                <Layers className="w-5 h-5 text-[#FAF8F5] mb-1" />
                <span className="text-sm font-serif font-bold text-white tracking-wide">
                  +{remainingCount + 1} diagrams
                </span>
                <span className="text-[10px] text-[#C0D9C8] font-medium mt-0.5">
                  View Full Schematic
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
