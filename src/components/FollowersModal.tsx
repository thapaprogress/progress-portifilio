import React from 'react';
import { X, UserPlus, Check, ShieldCheck } from 'lucide-react';

interface FollowersModalProps {
  isOpen: boolean;
  type: 'followers' | 'following';
  onClose: () => void;
}

export const FollowersModal: React.FC<FollowersModalProps> = ({
  isOpen,
  type,
  onClose,
}) => {
  if (!isOpen) return null;

  const followersList = [
    { name: 'Sarah Jenkins', handle: '@s_jenkins', role: 'Pacific Crest Trail ’23 Thru-Hiker', followed: true },
    { name: 'Mateo Morales', handle: '@mateo_climbs', role: 'Cascades Mountaineers Leader', followed: true },
    { name: 'Clara Lindqvist', handle: '@clara_alpine', role: 'Ultra Runner & Trail Steward', followed: false },
    { name: 'Tyler Washington', handle: '@tyler_pnw', role: 'Wilderness First Responder', followed: true },
    { name: 'Ami Patel', handle: '@ami_summits', role: 'Olympics High Divide Explorer', followed: false },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl border border-[#E8E2D5] shadow-xl p-5 animate-fade-in">
        <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE1]">
          <h2 className="text-base font-serif font-bold text-[#14261C] capitalize">
            {type === 'followers' ? 'Trail Community Followers' : 'Hikers Following'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-[#63756A] hover:text-[#14261C] hover:bg-[#F2ECE1] rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3 divide-y divide-[#F0ECE1] max-h-80 overflow-y-auto">
          {followersList.map((person, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#1B4332] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {person.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-semibold text-[#14261C] truncate">
                      {person.name}
                    </p>
                    <ShieldCheck className="w-3 h-3 text-[#1B4332]" />
                  </div>
                  <p className="text-[11px] text-[#63756A] truncate">{person.role}</p>
                </div>
              </div>

              <button
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  person.followed
                    ? 'bg-[#EDF5EE] text-[#1B4332]'
                    : 'bg-[#FAF8F5] border border-[#E2DBD0] text-[#4A5D50] hover:bg-[#F2ECE1]'
                }`}
              >
                {person.followed ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
