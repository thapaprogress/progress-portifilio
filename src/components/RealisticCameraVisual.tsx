import React from 'react';

interface RealisticCameraVisualProps {
  channelId: 'shrine' | 'farm' | 'canopy' | 'thermal' | 'hardware';
  behaviorState: 'OBSERVING' | 'FEEDING' | 'APPROACHING';
  fps: number;
}

export const RealisticCameraVisual: React.FC<RealisticCameraVisualProps> = ({
  channelId,
  behaviorState,
  fps,
}) => {
  if (channelId === 'shrine') {
    return (
      <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sky_shrine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="60%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#E0F2FE" />
          </linearGradient>
          <linearGradient id="stone_ancient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#78716C" />
            <stop offset="50%" stopColor="#57534E" />
            <stop offset="100%" stopColor="#44403C" />
          </linearGradient>
          <linearGradient id="stupa_gold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
          <linearGradient id="fur_macaque" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A88B74" />
            <stop offset="70%" stopColor="#785942" />
            <stop offset="100%" stopColor="#523927" />
          </linearGradient>
          <radialGradient id="vignette" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
          </radialGradient>
        </defs>

        {/* Kathmandu Sky & Distant Mountain Ridge */}
        <rect width="1920" height="1080" fill="url(#sky_shrine)" />
        <path d="M0,620 L300,540 L700,580 L1100,510 L1500,560 L1920,490 L1920,1080 L0,1080 Z" fill="#64748B" opacity="0.35" />
        <path d="M0,680 L400,620 L850,650 L1300,600 L1700,640 L1920,590 L1920,1080 L0,1080 Z" fill="#475569" opacity="0.5" />

        {/* Swayambhunath White Stupa Dome in background */}
        <path d="M960,240 L970,120 L950,120 Z" fill="url(#stupa_gold)" />
        {/* Golden Harmika and Spire */}
        <rect x="930" y="240" width="60" height="60" fill="url(#stupa_gold)" rx="4" />
        <path d="M960,110 L980,240 L940,240 Z" fill="url(#stupa_gold)" />
        {/* White hemispherical Dome */}
        <ellipse cx="960" cy="500" rx="340" ry="220" fill="#F8FAFC" />
        <ellipse cx="960" cy="500" rx="340" ry="220" fill="url(#stone_ancient)" opacity="0.1" />

        {/* Fluttering Prayer Flags strung diagonally */}
        <path d="M400,200 Q960,320 1600,220" fill="none" stroke="#334155" strokeWidth="2" />
        {['#2563EB', '#F8FAFC', '#DC2626', '#16A34A', '#FACC15', '#2563EB', '#F8FAFC', '#DC2626', '#16A34A', '#FACC15'].map((color, i) => (
          <polygon
            key={i}
            points={`${500 + i * 110},${225 + Math.sin(i * 0.7) * 20} ${535 + i * 110},${275 + Math.sin(i * 0.7) * 20} ${480 + i * 110},${270 + Math.sin(i * 0.7) * 20}`}
            fill={color}
            opacity="0.85"
          />
        ))}

        {/* Ancient Carved Stone Balustrade and Pagoda Steps */}
        <rect x="0" y="680" width="1920" height="400" fill="url(#stone_ancient)" />
        {/* Step ridges */}
        <line x1="0" y1="760" x2="1920" y2="760" stroke="#292524" strokeWidth="8" />
        <line x1="0" y1="860" x2="1920" y2="860" stroke="#1C1917" strokeWidth="12" />
        <line x1="0" y1="980" x2="1920" y2="980" stroke="#0C0A09" strokeWidth="16" />

        {/* Carved stone pillar on left */}
        <rect x="220" y="480" width="160" height="400" fill="url(#stone_ancient)" rx="8" />
        <rect x="200" y="460" width="200" height="30" fill="#44403C" rx="4" />
        <circle cx="300" cy="420" r="45" fill="url(#stone_ancient)" />

        {/* Realistic Rhesus Macaque Monkey on Stone Step */}
        <g transform="translate(860, 360)">
          {/* Shadow */}
          <ellipse cx="140" cy="410" rx="130" ry="25" fill="rgba(0,0,0,0.4)" />

          {/* Tail */}
          <path d="M80,340 Q10,380 40,430 Q70,450 110,410" fill="none" stroke="#785942" strokeWidth="14" strokeLinecap="round" />

          {/* Body Torso */}
          <ellipse cx="140" cy="280" rx="75" ry="95" fill="url(#fur_macaque)" />
          {/* Chest highlights */}
          <ellipse cx="150" cy="270" rx="45" ry="60" fill="#C4A48A" opacity="0.8" />

          {/* Hind Legs & Feet seated */}
          <ellipse cx="80" cy="350" rx="45" ry="55" fill="#6B4F3A" />
          <ellipse cx="200" cy="350" rx="45" ry="55" fill="#6B4F3A" />
          <rect x="65" y="390" width="50" height="20" rx="6" fill="#8B6D55" />
          <rect x="185" y="390" width="50" height="20" rx="6" fill="#8B6D55" />

          {/* Forearms resting on knees */}
          <path d="M100,240 L85,340 L105,350 L125,260 Z" fill="#785942" />
          <path d="M180,240 L195,340 L175,350 L155,260 Z" fill="#785942" />

          {/* Head & Neck */}
          <ellipse cx="140" cy="160" rx="48" ry="52" fill="url(#fur_macaque)" />
          {/* Facial Skin (Pinkish-tan typical of Rhesus Macaque) */}
          <ellipse cx="145" cy="165" rx="34" ry="38" fill="#E8B4A2" />
          {/* Brow Ridge */}
          <path d="M125,148 Q145,142 165,148" fill="none" stroke="#8C5345" strokeWidth="4" />
          {/* Eyes with keen focus */}
          <ellipse cx="132" cy="158" rx="6" ry="7" fill="#292524" />
          <ellipse cx="158" cy="158" rx="6" ry="7" fill="#292524" />
          <circle cx="134" cy="156" r="2" fill="#FFFFFF" />
          <circle cx="160" cy="156" r="2" fill="#FFFFFF" />
          {/* Muzzle and Nostrils */}
          <ellipse cx="145" cy="180" rx="16" ry="12" fill="#D49987" />
          <circle cx="141" cy="179" r="2.5" fill="#573024" />
          <circle cx="149" cy="179" r="2.5" fill="#573024" />
          {/* Mouth */}
          <path d="M138,190 Q145,193 152,190" fill="none" stroke="#693B2F" strokeWidth="2.5" />
          {/* Ears */}
          <ellipse cx="96" cy="160" rx="12" ry="18" fill="#E8B4A2" stroke="#8C5345" strokeWidth="2" />
          <ellipse cx="188" cy="160" rx="12" ry="18" fill="#E8B4A2" stroke="#8C5345" strokeWidth="2" />
        </g>

        {/* Ambient surveillance lens vignette */}
        <rect width="1920" height="1080" fill="url(#vignette)" />
      </svg>
    );
  }

  if (channelId === 'farm') {
    return (
      <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sky_valley" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#7DD3FC" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>
          <linearGradient id="terrace_green_1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#84CC16" />
            <stop offset="100%" stopColor="#4D7C0F" />
          </linearGradient>
          <linearGradient id="terrace_green_2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#65A30D" />
            <stop offset="100%" stopColor="#365314" />
          </linearGradient>
          <linearGradient id="wall_stone" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#78716C" />
            <stop offset="100%" stopColor="#44403C" />
          </linearGradient>
        </defs>

        {/* Valley Sky & Cloud Cover */}
        <rect width="1920" height="1080" fill="url(#sky_valley)" />
        {/* Chitlang Valley Mountain Slopes */}
        <path d="M0,450 Q480,320 960,420 T1920,380 L1920,1080 L0,1080 Z" fill="#15803D" opacity="0.6" />
        <path d="M0,520 Q540,410 1100,500 T1920,470 L1920,1080 L0,1080 Z" fill="#166534" opacity="0.8" />

        {/* Stepped Terraced Crop Fields */}
        <path d="M0,600 Q600,560 1200,610 T1920,580 L1920,700 L0,700 Z" fill="url(#terrace_green_1)" />
        {/* Terrace Stone Retaining Wall 1 */}
        <path d="M0,700 Q600,680 1200,710 T1920,690 L1920,740 L0,740 Z" fill="url(#wall_stone)" />

        <path d="M0,740 Q700,720 1300,760 T1920,730 L1920,840 L0,840 Z" fill="url(#terrace_green_2)" />
        {/* Terrace Stone Retaining Wall 2 */}
        <path d="M0,840 Q700,830 1300,860 T1920,840 L1920,890 L0,890 Z" fill="url(#wall_stone)" />

        <path d="M0,890 Q800,880 1400,910 T1920,890 L1920,1080 L0,1080 Z" fill="#14532D" />

        {/* Maize / Corn Crop Stalks in foreground terrace */}
        {Array.from({ length: 28 }).map((_, i) => (
          <g key={i} transform={`translate(${i * 72 + 20}, 730)`}>
            <line x1="0" y1="0" x2="0" y2="-90" stroke="#65A30D" strokeWidth="5" />
            <path d="M0,-40 Q-25,-55 -35,-45" fill="none" stroke="#84CC16" strokeWidth="4" />
            <path d="M0,-60 Q25,-75 35,-65" fill="none" stroke="#84CC16" strokeWidth="4" />
            <ellipse cx="0" cy="-90" rx="8" ry="12" fill="#EAB308" />
          </g>
        ))}

        {/* Perimeter Wooden/Stone Farm Fence */}
        <line x1="0" y1="840" x2="1920" y2="860" stroke="#57534E" strokeWidth="10" />
        {Array.from({ length: 14 }).map((_, idx) => (
          <rect key={idx} x={idx * 145 + 30} y="800" width="16" height="80" fill="#44403C" rx="2" />
        ))}

        {/* Primate Threat approaching the maize crop on wall */}
        <g transform="translate(940, 480)">
          {/* Shadow */}
          <ellipse cx="120" cy="380" rx="90" ry="20" fill="rgba(0,0,0,0.4)" />

          {/* Dynamic Stance: Reaching / Approaching */}
          <path d="M60,320 Q20,350 40,400 Q70,410 90,370" fill="none" stroke="#785942" strokeWidth="12" strokeLinecap="round" />
          <ellipse cx="120" cy="270" rx="65" ry="85" fill="#785942" />
          <ellipse cx="130" cy="260" rx="40" ry="50" fill="#B58F72" opacity="0.8" />

          {/* Reaching arm toward maize */}
          <path d="M150,230 Q220,230 250,260" fill="none" stroke="#6B4F3A" strokeWidth="18" strokeLinecap="round" />
          <circle cx="255" cy="265" r="10" fill="#8B6D55" />

          {/* Head & Face turned toward crop */}
          <ellipse cx="130" cy="170" rx="44" ry="46" fill="#785942" />
          <ellipse cx="140" cy="172" rx="30" ry="32" fill="#E8B4A2" />
          <ellipse cx="132" cy="168" rx="5" ry="6" fill="#1C1917" />
          <ellipse cx="152" cy="168" rx="5" ry="6" fill="#1C1917" />
          <ellipse cx="144" cy="186" rx="12" ry="8" fill="#D49987" />
        </g>
      </svg>
    );
  }

  if (channelId === 'canopy') {
    return (
      <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="canopy_sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#022C22" />
            <stop offset="100%" stopColor="#064E3B" />
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#canopy_sky)" />
        {/* Lush Tree Trunks & Forest Canopy */}
        <path d="M-50,0 Q240,400 120,1080 L320,1080 Q400,500 220,0 Z" fill="#292524" />
        <path d="M1680,0 Q1500,450 1600,1080 L1800,1080 Q1700,500 1850,0 Z" fill="#1C1917" />

        {/* Large Horizontal Branch with Primate */}
        <path d="M0,520 Q800,480 1920,540 L1920,620 Q800,560 0,600 Z" fill="#44403C" />

        {/* Hanging Forest Canopy Leaves & Vines */}
        {Array.from({ length: 30 }).map((_, i) => (
          <path
            key={i}
            d={`M${i * 68},0 Q${i * 68 + Math.sin(i) * 40},${220 + (i % 5) * 40} ${i * 68},${320 + (i % 4) * 35}`}
            fill="none"
            stroke="#15803D"
            strokeWidth={3 + (i % 4)}
            opacity="0.75"
          />
        ))}

        {/* Primate balanced on branch */}
        <g transform="translate(740, 310)">
          <ellipse cx="120" cy="220" rx="70" ry="75" fill="#6B4F3A" />
          <ellipse cx="120" cy="140" rx="42" ry="44" fill="#785942" />
          <ellipse cx="125" cy="142" rx="30" ry="32" fill="#E8B4A2" />
          <circle cx="118" cy="138" r="5" fill="#18181B" />
          <circle cx="136" cy="138" r="5" fill="#18181B" />
          {/* Long balancing tail hanging down */}
          <path d="M60,240 Q10,320 20,440" fill="none" stroke="#523927" strokeWidth="14" strokeLinecap="round" />
        </g>
      </svg>
    );
  }

  if (channelId === 'thermal') {
    return (
      <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="thermal_ambient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="50%" stopColor="#311042" />
            <stop offset="100%" stopColor="#0B091A" />
          </linearGradient>
          <radialGradient id="thermal_heat_core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#F97316" />
            <stop offset="75%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Cold Ambient Midnight Forest Environment (FLIR Palette) */}
        <rect width="1920" height="1080" fill="url(#thermal_ambient)" />

        {/* Thermal Tree Silhouettes at ~14°C (Deep Purple & Blue) */}
        <path d="M0,600 Q500,560 1000,590 T1920,580 L1920,1080 L0,1080 Z" fill="#2E1065" />
        <path d="M0,740 Q600,710 1200,750 T1920,720 L1920,1080 L0,1080 Z" fill="#3B0764" />

        {/* Thermal Fence Posts */}
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={i * 170 + 40} y="680" width="12" height="180" fill="#4C1D95" opacity="0.6" />
        ))}

        {/* High Heat Primate Signature (Core Body Heat 37.2°C) */}
        <g transform="translate(820, 360)">
          {/* Heat Halo Radiance */}
          <circle cx="160" cy="240" r="160" fill="url(#thermal_heat_core)" opacity="0.85" />

          {/* Body Core - White Hot Heat Zone */}
          <ellipse cx="160" cy="250" rx="60" ry="75" fill="#FFFFFF" />
          <ellipse cx="160" cy="250" rx="72" ry="85" fill="#FEF08A" opacity="0.9" />

          {/* Limbs - Orange/Red Heat Zone (34°C - 36°C) */}
          <ellipse cx="110" cy="310" rx="30" ry="45" fill="#F97316" />
          <ellipse cx="210" cy="310" rx="30" ry="45" fill="#F97316" />
          <path d="M120,290 Q60,340 70,390" fill="none" stroke="#EA580C" strokeWidth="18" strokeLinecap="round" />

          {/* Head Heat Signature (High Vascularity Cranial Heat) */}
          <circle cx="160" cy="160" r="42" fill="#FFFFFF" />
          <circle cx="160" cy="160" r="48" fill="#FACC15" opacity="0.85" />
          <circle cx="150" cy="155" r="8" fill="#FFFFFF" />
          <circle cx="170" cy="155" r="8" fill="#FFFFFF" />
        </g>

        {/* FLIR Radiometric Thermal Scale Bar on Right Edge */}
        <g transform="translate(1860, 240)">
          <rect x="0" y="0" width="24" height="400" rx="6" fill="#18181B" stroke="#3F3F46" />
          {/* Ironbow Gradient */}
          <defs>
            <linearGradient id="flir_scale" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#F97316" />
              <stop offset="75%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#1E1B4B" />
            </linearGradient>
          </defs>
          <rect x="4" y="4" width="16" height="392" rx="4" fill="url(#flir_scale)" />
          {/* Scale Labels */}
          <text x="-40" y="20" fill="#FFFFFF" fontSize="16" fontFamily="monospace">40°C</text>
          <text x="-40" y="200" fill="#F97316" fontSize="16" fontFamily="monospace">26°C</text>
          <text x="-40" y="390" fill="#A855F7" fontSize="16" fontFamily="monospace">12°C</text>
        </g>
      </svg>
    );
  }

  // hardware / lab channel
  return (
    <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="pcb_green" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14532D" />
          <stop offset="50%" stopColor="#166534" />
          <stop offset="100%" stopColor="#052E16" />
        </linearGradient>
        <linearGradient id="aluminum_heatsink" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="50%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>
      </defs>

      {/* Lab Bench Anti-Static Dark Surface */}
      <rect width="1920" height="1080" fill="#090D10" />

      {/* Lab Oscilloscope & Signal Generator Grid in Background */}
      <g opacity="0.25">
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={i} x1={i * 100} y1="0" x2={i * 100} y2="1080" stroke="#0284C7" strokeWidth="1" />
        ))}
        {Array.from({ length: 12 }).map((_, j) => (
          <line key={j} x1="0" y1={j * 90} x2="1920" y2={j * 90} stroke="#0284C7" strokeWidth="1" />
        ))}
      </g>

      {/* Raspberry Pi 5 Board Outline (Macro View) */}
      <g transform="translate(560, 240)">
        {/* PCB Board */}
        <rect x="0" y="0" width="800" height="560" rx="32" fill="url(#pcb_green)" stroke="#22C55E" strokeWidth="4" />

        {/* Gold PCB Traces */}
        <path d="M60,80 L220,80 L260,160 L440,160" fill="none" stroke="#FACC15" strokeWidth="2.5" opacity="0.7" />
        <path d="M120,480 L300,480 L340,380 L520,380" fill="none" stroke="#FACC15" strokeWidth="2.5" opacity="0.7" />
        <path d="M480,80 L620,80 L680,180" fill="none" stroke="#FACC15" strokeWidth="2.5" opacity="0.7" />

        {/* Mounting Holes */}
        <circle cx="48" cy="48" r="20" fill="#090D10" stroke="#FACC15" strokeWidth="4" />
        <circle cx="752" cy="48" r="20" fill="#090D10" stroke="#FACC15" strokeWidth="4" />
        <circle cx="48" cy="512" r="20" fill="#090D10" stroke="#FACC15" strokeWidth="4" />
        <circle cx="752" cy="512" r="20" fill="#090D10" stroke="#FACC15" strokeWidth="4" />

        {/* GPIO 40-Pin Header */}
        <rect x="120" y="20" width="560" height="42" fill="#18181B" rx="4" />
        {Array.from({ length: 20 }).map((_, p) => (
          <g key={p}>
            <circle cx={140 + p * 27} cy="32" r="4.5" fill="#FACC15" />
            <circle cx={140 + p * 27} cy="48" r="4.5" fill="#FACC15" />
          </g>
        ))}

        {/* Broadcom BCM2712 SoC & Aluminum Active Cooler */}
        <rect x="280" y="160" width="240" height="240" rx="16" fill="url(#aluminum_heatsink)" stroke="#CBD5E1" strokeWidth="3" />
        {/* Fan Grille */}
        <circle cx="400" cy="280" r="85" fill="#0F172A" stroke="#E2E8F0" strokeWidth="4" />
        {/* Spinning Fan Blades */}
        <g transform="translate(400, 280)">
          <circle cx="0" cy="0" r="24" fill="#334155" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <path
              key={deg}
              d="M0,-24 Q28,-50 16,-75 Q0,-80 -8,-75 Q-2,-50 0,-24 Z"
              fill="#64748B"
              transform={`rotate(${deg})`}
            />
          ))}
        </g>

        {/* Micro-HDMI & USB-C Ports */}
        <rect x="180" y="535" width="65" height="30" fill="#CBD5E1" rx="4" />
        <rect x="270" y="535" width="65" height="30" fill="#CBD5E1" rx="4" />
        <rect x="70" y="535" width="80" height="30" fill="#CBD5E1" rx="4" />

        {/* Dual USB 3.0 Ports & Gigabit Ethernet Jack */}
        <rect x="760" y="110" width="45" height="110" fill="#94A3B8" rx="6" />
        <rect x="760" y="240" width="45" height="110" fill="#0284C7" rx="6" />
        <rect x="760" y="370" width="45" height="120" fill="#94A3B8" rx="6" />

        {/* CSI-2 Camera Ribbon Cable Connector */}
        <rect x="210" y="360" width="35" height="110" fill="#18181B" rx="4" />
        <rect x="212" y="380" width="31" height="70" fill="#F8FAFC" />
        {/* Ribbon cable stretching down */}
        <path d="M227,450 C227,620 -80,700 -240,780" fill="none" stroke="#F1F5F9" strokeWidth="42" opacity="0.9" />

        {/* Status LEDs */}
        <circle cx="700" cy="510" r="8" fill="#EF4444" className="animate-pulse" />
        <text x="640" y="515" fill="#EF4444" fontSize="12" fontFamily="monospace">PWR</text>
        <circle cx="740" cy="510" r="8" fill="#22C55E" className="animate-ping" />
        <text x="755" y="515" fill="#22C55E" fontSize="12" fontFamily="monospace">ACT</text>

        {/* Text Labels on Board */}
        <text x="50" y="200" fill="#FFFFFF" fontSize="24" fontFamily="monospace" fontWeight="bold">Raspberry Pi 5</text>
        <text x="50" y="230" fill="#86EFAC" fontSize="14" fontFamily="monospace">NCNN INT8 ENGINE</text>
      </g>
    </svg>
  );
};
