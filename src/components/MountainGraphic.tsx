import React from 'react';

interface MountainGraphicProps {
  palette?: 'pine' | 'granite' | 'sunset' | 'lake' | 'mist';
  className?: string;
  showContours?: boolean;
}

export const MountainGraphic: React.FC<MountainGraphicProps> = ({
  palette = 'mist',
  className = 'w-full h-full',
  showContours = true,
}) => {
  // Cohesive outdoorsy color schemes: deep forest greens, warm cream canvas, misty slate
  const themes = {
    mist: {
      skyStart: '#E8EFEA',
      skyEnd: '#FAF6EE',
      sun: '#F5E6CC',
      peak1: '#254B37',
      peak2: '#1C3B2B',
      peak3: '#13281E',
      fog: 'rgba(235, 243, 237, 0.45)',
      lines: '#A8C2B0',
    },
    pine: {
      skyStart: '#DDEAE2',
      skyEnd: '#F7F4EB',
      sun: '#FAD8A8',
      peak1: '#356345',
      peak2: '#244B34',
      peak3: '#153122',
      fog: 'rgba(225, 237, 230, 0.5)',
      lines: '#B5CFBE',
    },
    granite: {
      skyStart: '#E2E6E7',
      skyEnd: '#F8F6F1',
      sun: '#FCE7C8',
      peak1: '#43545A',
      peak2: '#2A3B3E',
      peak3: '#1A2729',
      fog: 'rgba(230, 236, 237, 0.5)',
      lines: '#9BB0B5',
    },
    sunset: {
      skyStart: '#FCE6D2',
      skyEnd: '#FAF2E6',
      sun: '#F6A872',
      peak1: '#543D36',
      peak2: '#3D2824',
      peak3: '#281717',
      fog: 'rgba(252, 234, 218, 0.4)',
      lines: '#D4B49F',
    },
    lake: {
      skyStart: '#D8ECED',
      skyEnd: '#F9F7EE',
      sun: '#F3E4C9',
      peak1: '#255B60',
      peak2: '#184347',
      peak3: '#0E2A2D',
      fog: 'rgba(215, 236, 237, 0.4)',
      lines: '#8EB5B9',
    },
  };

  const c = themes[palette] || themes.mist;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`skyGrad-${palette}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={c.skyStart} />
            <stop offset="100%" stopColor={c.skyEnd} />
          </linearGradient>

          <linearGradient id={`fogGrad-${palette}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={c.fog} stopOpacity="0.8" />
            <stop offset="100%" stopColor={c.fog} stopOpacity="0.1" />
          </linearGradient>

          {/* Topographic contour pattern */}
          {showContours && (
            <pattern id={`topoLines-${palette}`} width="120" height="120" patternUnits="userSpaceOnUse">
              <path
                d="M0,30 Q30,15 60,35 T120,25 M0,60 Q40,45 80,70 T120,55 M0,90 Q20,80 70,105 T120,85"
                fill="none"
                stroke={c.lines}
                strokeWidth="0.75"
                strokeOpacity="0.35"
              />
            </pattern>
          )}
        </defs>

        {/* Sky backdrop */}
        <rect width="600" height="400" fill={`url(#skyGrad-${palette})`} />

        {/* Contours in sky */}
        {showContours && (
          <rect width="600" height="220" fill={`url(#topoLines-${palette})`} opacity="0.6" />
        )}

        {/* Morning Alpine Sun / Moon */}
        <circle cx="430" cy="110" r="42" fill={c.sun} opacity="0.85" />
        <circle cx="430" cy="110" r="58" fill={c.sun} opacity="0.25" />

        {/* Distant Mountain Range */}
        <path
          d="M-20,240 L80,170 L160,205 L260,140 L370,210 L480,125 L580,195 L640,165 L640,400 L-20,400 Z"
          fill={c.peak1}
          opacity="0.8"
        />

        {/* Atmospheric Mist Layer 1 */}
        <ellipse cx="300" cy="225" rx="350" ry="45" fill={`url(#fogGrad-${palette})`} />

        {/* Midground Rocky Crags & Ridges */}
        <path
          d="M-20,290 L110,215 L190,265 L310,185 L410,250 L520,180 L620,270 L620,400 L-20,400 Z"
          fill={c.peak2}
          opacity="0.95"
        />

        {/* Light Shading on Western Ridges */}
        <path
          d="M110,215 L190,265 L150,290 L90,280 Z"
          fill="#FFFFFF"
          opacity="0.08"
        />
        <path
          d="M310,185 L410,250 L360,285 L280,260 Z"
          fill="#FFFFFF"
          opacity="0.07"
        />
        <path
          d="M520,180 L620,270 L570,300 L490,275 Z"
          fill="#FFFFFF"
          opacity="0.08"
        />

        {/* Atmospheric Mist Layer 2 */}
        <rect x="0" y="270" width="600" height="35" fill={`url(#fogGrad-${palette})`} opacity="0.9" />

        {/* Foreground Pine Silhouette & Alpine Ridge */}
        <path
          d="M-10,345 Q60,335 150,355 T320,330 T480,360 T610,335 L610,400 L-10,400 Z"
          fill={c.peak3}
        />

        {/* Stylized Pine Trees Silhouettes along foreground ridge */}
        {[
          { x: 30, h: 50, w: 18 },
          { x: 50, h: 42, w: 16 },
          { x: 75, h: 60, w: 20 },
          { x: 120, h: 48, w: 17 },
          { x: 180, h: 52, w: 19 },
          { x: 230, h: 64, w: 22 },
          { x: 270, h: 44, w: 16 },
          { x: 350, h: 58, w: 20 },
          { x: 390, h: 46, w: 17 },
          { x: 440, h: 62, w: 21 },
          { x: 490, h: 50, w: 18 },
          { x: 535, h: 68, w: 23 },
          { x: 575, h: 45, w: 16 },
        ].map((tree, idx) => (
          <g key={idx} fill={c.peak3}>
            {/* Trunk */}
            <rect x={tree.x - 2} y={350 - tree.h * 0.2} width="4" height={tree.h * 0.5} />
            {/* Conifer Tiers */}
            <polygon
              points={`${tree.x},${350 - tree.h} ${tree.x - tree.w * 0.4},${350 - tree.h * 0.65} ${tree.x + tree.w * 0.4},${350 - tree.h * 0.65}`}
            />
            <polygon
              points={`${tree.x},${350 - tree.h * 0.75} ${tree.x - tree.w * 0.55},${350 - tree.h * 0.35} ${tree.x + tree.w * 0.55},${350 - tree.h * 0.35}`}
            />
            <polygon
              points={`${tree.x},${350 - tree.h * 0.45} ${tree.x - tree.w * 0.7},${350 - 5} ${tree.x + tree.w * 0.7},${350 - 5}`}
            />
          </g>
        ))}

        {/* Small subtle hiker silhouette on crest at x=310 */}
        <g fill={c.peak3} transform="translate(308, 168) scale(0.75)">
          <circle cx="5" cy="5" r="3.5" />
          <path d="M2,9 L8,9 L9,22 L6,22 L5.5,15 L4.5,15 L4,22 L1,22 Z" />
          {/* Trekking pole */}
          <line x1="9" y1="11" x2="14" y2="23" stroke={c.peak3} strokeWidth="1.2" />
          {/* Backpack */}
          <rect x="-1" y="9" width="4" height="8" rx="1.5" />
        </g>
      </svg>
    </div>
  );
};
