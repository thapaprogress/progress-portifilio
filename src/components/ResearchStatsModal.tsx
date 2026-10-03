import React from 'react';
import { X, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';

interface ResearchStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResearchStatsModal: React.FC<ResearchStatsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const trialLocations = [
    { name: 'Chitlang Valley Maize Terraces', elevation: '1,750m', trials: 12, macaquePacks: '3 Troops Detected', success: '91%' },
    { name: 'Makwanpur Fruit Orchards', elevation: '1,420m', trials: 8, macaquePacks: '2 Troops Detected', success: '86%' },
    { name: 'MBUST Research Agricultural Plot', elevation: '1,800m', trials: 5, macaquePacks: 'Controlled Trials', success: '88%' },
    { name: 'Northern Perimeter Foothills', elevation: '2,100m', trials: 3, macaquePacks: 'High Canopy Trials', success: '84%' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-[#E8E2D5] shadow-xl p-5 animate-fade-in">
        <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE1]">
          <div>
            <h2 className="text-base font-serif font-bold text-[#14261C]">
              28 Field Trials &amp; Research Locations
            </h2>
            <p className="text-xs text-[#526357]">
              Madan Bhandari University of Science &amp; Technology (2024 – 2026)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#63756A] hover:text-[#14261C] hover:bg-[#F2ECE1] rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3 divide-y divide-[#F0ECE1] max-h-80 overflow-y-auto space-y-2">
          {trialLocations.map((loc, idx) => (
            <div key={idx} className="pt-2 pb-1 text-xs">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-[#14261C]">{loc.name}</p>
                <span className="font-mono text-[11px] text-[#1B4332] font-semibold bg-[#EDF5EE] px-2 py-0.5 rounded">
                  {loc.success} Accuracy
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#63756A] mt-1 font-mono">
                <span>{loc.elevation} elev</span>
                <span aria-hidden="true">·</span>
                <span>{loc.trials} trials</span>
                <span aria-hidden="true">·</span>
                <span>{loc.macaquePacks}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-[#F0ECE1] text-[11px] text-[#63756A] flex items-center justify-between">
          <span>Total Annotated Dataset</span>
          <span className="font-mono font-bold text-[#1B4332]">4,000+ Verified Images</span>
        </div>
      </div>
    </div>
  );
};
