import React from 'react';
import { X, Bell, Newspaper, Star, MessageSquare, FileText } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'n1',
      icon: Newspaper,
      iconColor: 'text-[#D97706] bg-[#FEF3C7]',
      title: 'Mongabay Feature Published',
      desc: 'Article on MBUST edge AI monkey detection for crop protection is trending.',
      time: '2h ago',
    },
    {
      id: 'n2',
      icon: FileText,
      iconColor: 'text-[#1E4D6B] bg-[#EAF2F8]',
      title: 'New Citation on ResearchGate',
      desc: 'Your Feb 2026 paper was cited in "Advances in Edge Vision for Agriculture".',
      time: '1d ago',
    },
    {
      id: 'n3',
      icon: Star,
      iconColor: 'text-[#BE123C] bg-[#FCE7F3]',
      title: 'Star on YOLO Crop Protection',
      desc: 'Dr. Ramesh Adhikari and 18 others starred your project.',
      time: '2d ago',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-black/40 backdrop-blur-xs">
      <div className="relative w-full max-w-sm bg-white rounded-2xl border border-[#E8E2D5] shadow-xl p-4 mt-12 animate-fade-in">
        <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE1]">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#1B4332]" />
            <h3 className="text-sm font-serif font-bold text-[#14261C]">
              Research &amp; Media Activity
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#63756A] hover:text-[#14261C] rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3 divide-y divide-[#F0ECE1] space-y-2">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div key={n.id} className="pt-2 pb-1 flex items-start gap-3">
                <div className={`p-2 rounded-lg shrink-0 ${n.iconColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#14261C] leading-snug">
                    {n.title}
                  </p>
                  <p className="text-[11px] text-[#55695C] leading-relaxed mt-0.5">
                    {n.desc}
                  </p>
                  <span className="text-[10px] text-[#8C9E92] font-mono mt-1 block">
                    {n.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
