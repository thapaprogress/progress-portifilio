import React from 'react';
import { Plus, Bell, Mail, FileText, Play, Terminal, Youtube } from 'lucide-react';

interface HeaderProps {
  onOpenLogModal: () => void;
  activeNav: string;
  onSelectNav: (nav: string) => void;
  unreadNotificationsCount?: number;
  onOpenNotifications?: () => void;
  onOpenContactModal?: () => void;
  onOpenCvModal?: () => void;
  onOpenVeoModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenLogModal,
  activeNav,
  onSelectNav,
  unreadNotificationsCount = 2,
  onOpenNotifications,
  onOpenContactModal,
  onOpenCvModal,
  onOpenVeoModal,
}) => {
  const navItems = [
    { id: 'works', label: 'Works & Research' },
    { id: 'veo', label: 'Veo Video', isBadge: 'AI' },
    { id: 'crate', label: '3D Project Crate', isBadge: '3D' },
    { id: 'video', label: 'Live AIoT Video' },
    { id: 'youtube', label: 'YouTube (@pjt247)', isSpecial: true },
    { id: 'publications', label: 'Publications' },
    { id: 'cv', label: 'Curriculum Vitae' },
    { id: 'philosophy', label: 'Philosophy' },
    { id: 'stack', label: 'Tech Stack' },
  ];

  return (
    <header className="sticky top-0 z-30 w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D5] px-4 sm:px-6 lg:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark in display face */}
        <div className="flex items-center gap-2">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onSelectNav('works');
            }}
            className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#1B4332] hover:text-[#2D5A27] transition-colors"
          >
            Progress Thapa
          </a>
          <span className="hidden lg:inline text-xs font-mono text-[#64748B]">
            @thapaprogress
          </span>
        </div>

        {/* Zone 2: Clean text navigation links, single-line */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#4A5D50]">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'cv' && onOpenCvModal) {
                    onOpenCvModal();
                  } else if (item.id === 'veo' && onOpenVeoModal) {
                    onOpenVeoModal();
                  } else {
                    onSelectNav(item.id);
                  }
                }}
                className={`transition-colors whitespace-nowrap py-1 relative flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#1B4332] font-semibold'
                    : 'hover:text-[#1B4332]'
                }`}
              >
                {item.isSpecial && (
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                )}
                <span>{item.label}</span>
                {item.isBadge && (
                  <span className="text-[9px] font-mono font-bold bg-[#1B4332] text-white px-1.5 py-0.2 rounded">
                    {item.isBadge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1B4332] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={onOpenNotifications}
            className="relative p-2 text-[#4A5D50] hover:text-[#1B4332] hover:bg-[#F2ECE1] rounded-lg transition-colors"
            title="Recent research citations & news alerts"
            aria-label="Recent research citations & news alerts"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D97706] rounded-full ring-2 ring-[#FAF8F5]" />
            )}
          </button>

          <a
            href="https://www.youtube.com/@pjt247"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-white bg-[#DC2626] hover:bg-[#B91C1C] rounded-lg transition-colors whitespace-nowrap shadow-xs"
            title="Visit YouTube channel @pjt247"
          >
            <Youtube className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">@pjt247</span>
          </a>

          <button
            onClick={onOpenContactModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1B4332] bg-[#F2ECE1] hover:bg-[#E8E0D2] rounded-lg transition-colors whitespace-nowrap"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>

          <button
            onClick={onOpenLogModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white bg-[#1B4332] hover:bg-[#245741] active:bg-[#153427] rounded-lg shadow-xs transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4 stroke-[2.2]" />
            <span>Add Work</span>
          </button>
        </div>
      </div>
    </header>
  );
};
