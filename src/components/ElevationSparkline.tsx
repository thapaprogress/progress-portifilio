import React, { useState } from 'react';
import { Mountain } from 'lucide-react';

interface ElevationSparklineProps {
  elevations: number[];
  distanceMi: number;
  maxAltitudeFt: number;
}

export const ElevationSparkline: React.FC<ElevationSparklineProps> = ({
  elevations,
  distanceMi,
  maxAltitudeFt,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!elevations || elevations.length < 2) return null;

  const minElev = Math.min(...elevations);
  const maxElev = Math.max(...elevations);
  const elevRange = maxElev - minElev || 1;

  const width = 400;
  const height = 70;
  const paddingX = 10;
  const paddingY = 8;
  const usableWidth = width - paddingX * 2;
  const usableHeight = height - paddingY * 2;

  const points = elevations.map((elev, idx) => {
    const x = paddingX + (idx / (elevations.length - 1)) * usableWidth;
    const y = height - paddingY - ((elev - minElev) / elevRange) * usableHeight;
    return { x, y, elev, dist: ((idx / (elevations.length - 1)) * distanceMi).toFixed(1) };
  });

  const pathD = points.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  const hoveredPoint = hoverIndex !== null ? points[hoverIndex] : null;

  return (
    <div className="bg-[#FAF8F5] border border-[#E5DFD4] rounded-lg p-3">
      <div className="flex items-center justify-between text-xs text-[#526357] mb-1.5">
        <div className="flex items-center gap-1.5 font-medium">
          <Mountain className="w-3.5 h-3.5 text-[#1B4332]" />
          <span>Elevation Profile</span>
        </div>
        <div className="font-mono tabular-nums text-[11px] text-[#63756A]">
          {hoveredPoint ? (
            <span className="text-[#1B4332] font-semibold">
              {hoveredPoint.dist} mi · {hoveredPoint.elev.toLocaleString()} ft
            </span>
          ) : (
            <span>
              Peak: {maxAltitudeFt.toLocaleString()} ft (Gain: {(maxElev - minElev).toLocaleString()} ft)
            </span>
          )}
        </div>
      </div>

      <div className="relative w-full h-[70px]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="elevationGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2D5A27" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#2D5A27" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Area fill under curve */}
          <path d={areaD} fill="url(#elevationGrad)" />

          {/* Elevation Profile Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#1B4332"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Peak Point Marker */}
          {points.map((p, idx) => {
            const isPeak = p.elev === maxElev;
            if (!isPeak) return null;
            return (
              <g key={`peak-${idx}`}>
                <circle cx={p.x} cy={p.y} r="4" fill="#1B4332" stroke="#FFFFFF" strokeWidth="1.5" />
              </g>
            );
          })}

          {/* Active Hover Marker */}
          {hoveredPoint && (
            <g>
              <line
                x1={hoveredPoint.x}
                y1={0}
                x2={hoveredPoint.x}
                y2={height}
                stroke="#1B4332"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <circle
                cx={hoveredPoint.x}
                cy={hoveredPoint.y}
                r="4.5"
                fill="#D97706"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
            </g>
          )}

          {/* Invisible hover zones */}
          {points.map((p, idx) => {
            const sliceWidth = usableWidth / (points.length - 1);
            return (
              <rect
                key={idx}
                x={p.x - sliceWidth / 2}
                y={0}
                width={sliceWidth}
                height={height}
                fill="transparent"
                className="cursor-crosshair"
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
              />
            );
          })}
        </svg>
      </div>

      <div className="flex justify-between text-[10px] font-mono tabular-nums text-[#7E8F83] mt-1 border-t border-[#EFE9DF] pt-1">
        <span>0.0 mi (TH: {minElev.toLocaleString()} ft)</span>
        <span>Crux Ridge</span>
        <span>{distanceMi} mi (End)</span>
      </div>
    </div>
  );
};
