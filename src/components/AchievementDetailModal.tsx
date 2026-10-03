import React from 'react';
import { AchievementBadge } from '../types/portfolio';
import { X, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AchievementDetailModalProps {
  badge: AchievementBadge | null;
  onClose: () => void;
}

export const AchievementDetailModal: React.FC<AchievementDetailModalProps> = ({
  badge,
  onClose,
}) => {
  if (!badge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-sm bg-white rounded-2xl border border-[#E8E2D5] shadow-xl p-6 text-center animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#63756A] hover:text-[#14261C] hover:bg-[#F2ECE1] rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Insignia */}
        <div className="w-16 h-16 mx-auto rounded-full bg-[#1B4332] text-[#F5E6CC] flex items-center justify-center border-4 border-[#E2DBD0] shadow-md mb-3">
          <Award className="w-8 h-8" />
        </div>

        <span className="text-[11px] font-mono tracking-wider uppercase text-[#1B4332] font-semibold bg-[#E8EFEA] px-2.5 py-0.5 rounded-full inline-block mb-1.5">
          {badge.tier} · {badge.category}
        </span>

        <h3 className="text-base font-serif font-bold text-[#14261C]">
          {badge.title}
        </h3>

        <p className="text-xs text-[#526357] mt-2 leading-relaxed">
          {badge.description}
        </p>

        <div className="mt-4 pt-3.5 border-t border-[#F0ECE1] flex items-center justify-between text-xs text-[#63756A]">
          <span>Issuing Body</span>
          <span className="font-mono text-[#1B4332] font-medium">{badge.organization}</span>
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-[#63756A]">
          <span>Date</span>
          <span className="font-mono text-[#63756A]">{badge.dateEarned}</span>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-[#1B4332] hover:bg-[#255741] text-white text-xs font-semibold rounded-lg transition-colors"
        >
          Close Detail
        </button>
      </div>
    </div>
  );
};
