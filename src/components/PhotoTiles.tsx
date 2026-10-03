import React from 'react';
import { PhotoTile } from '../types/trail';
import { MountainGraphic } from './MountainGraphic';
import { Camera, MapPin, Maximize2 } from 'lucide-react';

interface PhotoTilesProps {
  photos: PhotoTile[];
  onOpenPhoto: (index: number) => void;
  maxDisplay?: number;
}

export const PhotoTiles: React.FC<PhotoTilesProps> = ({
  photos,
  onOpenPhoto,
  maxDisplay = 3,
}) => {
  if (!photos || photos.length === 0) return null;

  const displayPhotos = photos.slice(0, maxDisplay);
  const remainingCount = photos.length - maxDisplay;

  // Grid layout depending on number of photos
  const gridClass =
    displayPhotos.length === 1
      ? 'grid-cols-1'
      : displayPhotos.length === 2
      ? 'grid-cols-2'
      : 'grid-cols-3';

  return (
    <div className={`grid ${gridClass} gap-2 rounded-xl overflow-hidden`}>
      {displayPhotos.map((photo, index) => {
        const isLastAndHasOverflow = index === maxDisplay - 1 && remainingCount > 0;

        return (
          <div
            key={photo.id}
            onClick={() => onOpenPhoto(index)}
            className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-[#EAE5DA] cursor-pointer border border-[#E0D9CC] transition-transform active:scale-[0.99]"
          >
            {/* Mountain / Trail Graphic with Contours */}
            <MountainGraphic
              palette={photo.palette}
              className="w-full h-full transition-transform duration-300 group-hover:scale-105"
              showContours={true}
            />

            {/* Subtle Gradient Scrim for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

            {/* Hover Expand Icon */}
            <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 text-white/80 group-hover:text-white group-hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>

            {/* Photo Metadata in Tile */}
            <div className="absolute bottom-2 left-2 right-2 text-white">
              <p className="text-[11px] font-semibold truncate leading-tight drop-shadow-xs">
                {photo.locationName}
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-white/80 font-mono tabular-nums mt-0.5">
                <span>{photo.altitudeFt.toLocaleString()} ft</span>
                {photo.badgeLabel && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#A3E635] font-sans font-medium">
                      {photo.badgeLabel}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Count Overlay on Last Tile */}
            {isLastAndHasOverflow && (
              <div className="absolute inset-0 bg-[#0F241A]/75 backdrop-blur-[2px] flex flex-col items-center justify-center text-white transition-colors group-hover:bg-[#0F241A]/85">
                <Camera className="w-5 h-5 text-[#FAF8F5] mb-1" />
                <span className="text-sm font-serif font-bold text-white tracking-wide">
                  +{remainingCount + 1} photos
                </span>
                <span className="text-[10px] text-[#C0D9C8] font-medium mt-0.5">
                  View Full Gallery
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
