import React, { useState } from 'react';
import { DeveloperProfile, FeaturedStackItem } from '../types/portfolio';
import { GithubHeatmap } from './GithubHeatmap';
import { ProgressAvatar } from './ProgressAvatar';
import { VeoVideoShowcaseCard } from './VeoVideoShowcaseCard';
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Github,
  Share2,
  Check,
  Award,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  FileText,
  Play,
  Download,
  Disc,
  Youtube,
  Film,
} from 'lucide-react';

interface DeveloperSidebarProps {
  profile: DeveloperProfile;
  featuredStacks: FeaturedStackItem[];
  onSelectStack: (stack: FeaturedStackItem) => void;
  onOpenStatsModal: () => void;
  onSharePortfolio: () => void;
  shareCopied: boolean;
  selectedStackId?: string | null;
  onOpenContactModal: () => void;
  onOpenCvModal: () => void;
  onOpenVideoModal?: () => void;
  onNavigateToCrate?: () => void;
  onNavigateToYoutube?: () => void;
  onOpenVeoStudio?: () => void;
  veoVideoUrl?: string | null;
  customAvatarUrl?: string | null;
}

export const DeveloperSidebar: React.FC<DeveloperSidebarProps> = ({
  profile,
  featuredStacks,
  onSelectStack,
  onOpenStatsModal,
  onSharePortfolio,
  shareCopied,
  selectedStackId,
  onOpenContactModal,
  onOpenCvModal,
  onOpenVideoModal,
  onNavigateToCrate,
  onNavigateToYoutube,
  onOpenVeoStudio,
  veoVideoUrl,
  customAvatarUrl,
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredStacks = featuredStacks.filter(
    (s) =>
      s.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      s.domain.toLowerCase().includes(filterQuery.toLowerCase()) ||
      s.stackList.some((tech) => tech.toLowerCase().includes(filterQuery.toLowerCase()))
  );

  return (
    <aside className="w-full space-y-5">
      {/* Developer Profile Overview Card */}
      <div className="bg-white rounded-xl border border-[#E8E2D5] p-5 shadow-xs transition-shadow hover:shadow-sm">
        {/* Avatar & Verification Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="relative">
            <ProgressAvatar
              avatarUrl={customAvatarUrl}
              onOpenVideoStudio={onOpenVeoStudio}
              size="md"
            />

            {profile.academicHistory && (
              <div
                className="absolute -bottom-1 -right-1 bg-[#1B4332] text-[#FAF8F5] p-1 rounded-full border-2 border-white shadow-xs"
                title="Verified 1st Author & MBUST Lead Researcher"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          {/* Share CTA button */}
          <button
            onClick={onSharePortfolio}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1B4332] bg-[#F2ECE1] hover:bg-[#E8E0D2] active:bg-[#DDD3C2] rounded-lg transition-colors whitespace-nowrap"
            title="Share portfolio link"
          >
            {shareCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#2D5A27]" />
                <span className="text-[#2D5A27]">Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>

        {/* Identity & Bio */}
        <div className="mt-4">
          <div className="flex items-baseline justify-between gap-1 flex-wrap">
            <h1 className="text-lg font-serif font-bold text-[#14261C] tracking-tight">
              {profile.name}
            </h1>
            <span className="text-xs font-mono text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded-full font-semibold">
              Available for Research &amp; AI
            </span>
          </div>
          <p className="text-xs text-[#526357] font-medium mt-0.5">{profile.handle}</p>

          <p className="text-xs font-semibold text-[#1B4332] mt-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#D97706]" />
            <span className="truncate">{profile.title}</span>
          </p>

          <p className="text-xs text-[#4A5D50] font-medium mt-0.5 leading-snug">
            {profile.role}
          </p>

          <p className="text-xs text-[#3E4E44] leading-relaxed mt-2.5">
            {profile.bio}
          </p>

          {/* Location & Official Contact metadata */}
          <div className="mt-3.5 pt-3 border-t border-[#F0ECE1] space-y-1.5 text-xs text-[#63756A]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-[#1B4332]/70" />
              <span className="truncate" title={profile.address}>{profile.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 shrink-0 text-[#1B4332]/70" />
              <a
                href={profile.website}
                target="_blank"
                rel="noreferrer"
                className="truncate text-[#1B4332] hover:underline"
              >
                progressthapa.com.np
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 shrink-0 text-[#1B4332]/70" />
              <a
                href={`mailto:${profile.emailUniversity}`}
                className="truncate text-[#1B4332] hover:underline"
              >
                {profile.emailUniversity}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Github className="w-3.5 h-3.5 shrink-0 text-[#1B4332]/70" />
              <a
                href="https://github.com/thapaprogress"
                target="_blank"
                rel="noreferrer"
                className="truncate text-[#1B4332] hover:underline font-mono"
              >
                github.com/thapaprogress
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Youtube className="w-3.5 h-3.5 shrink-0 text-[#DC2626]" />
              <a
                href="https://www.youtube.com/@pjt247"
                target="_blank"
                rel="noreferrer"
                className="truncate text-[#DC2626] font-semibold hover:underline font-mono"
              >
                youtube.com/@pjt247
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 shrink-0 text-[#1B4332]/70" />
              <span className="font-mono tabular-nums">{profile.phonePrimary}</span>
            </div>
          </div>
        </div>

        {/* Developer Stats Grid */}
        <div className="mt-4 pt-3.5 border-t border-[#F0ECE1] grid grid-cols-2 gap-2 text-center">
          <button
            onClick={onOpenStatsModal}
            className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#F2ECE1] transition-colors text-left"
          >
            <div className="text-sm font-semibold font-mono tabular-nums text-[#14261C]">
              {profile.publicationsCount} Refereed
            </div>
            <div className="text-[11px] text-[#5A6D60]">1st Author Papers</div>
          </button>

          <button
            onClick={onOpenStatsModal}
            className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#F2ECE1] transition-colors text-left"
          >
            <div className="text-sm font-semibold font-mono tabular-nums text-[#14261C]">
              {profile.fieldTrialsCount} Trials
            </div>
            <div className="text-[11px] text-[#5A6D60]">672h Continuous</div>
          </button>

          <div className="p-2 rounded-lg bg-[#FAF8F5] text-left">
            <div className="text-sm font-semibold font-mono tabular-nums text-[#14261C]">
              {profile.modelAccuracyScore}
            </div>
            <div className="text-[11px] text-[#5A6D60]">YOLOv8n Precision</div>
          </div>

          <div className="p-2 rounded-lg bg-[#FAF8F5] text-left">
            <div className="text-sm font-semibold font-mono tabular-nums text-[#14261C]">
              15–18 FPS
            </div>
            <div className="text-[11px] text-[#5A6D60]">Edge NCNN INT8</div>
          </div>
        </div>

        {/* GitHub Contribution Heatmap in DeveloperSidebar */}
        <div className="mt-4 pt-3.5 border-t border-[#F0ECE1]">
          <GithubHeatmap compact={true} />
        </div>

        {/* Veo Living Portrait Video Showcase Card */}
        <div className="mt-4 pt-3.5 border-t border-[#F0ECE1]">
          <VeoVideoShowcaseCard
            onOpenVideoStudio={onOpenVeoStudio || (() => {})}
            videoUrl={veoVideoUrl}
          />
        </div>

        {/* Official CV & Contact Action Buttons */}
        <div className="mt-4 pt-3 border-t border-[#F0ECE1] space-y-2">
          {onOpenVeoStudio && (
            <button
              onClick={onOpenVeoStudio}
              className="w-full py-2 bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#BBF7D0] text-[#166534] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Film className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Animate Photo into Video (Veo)</span>
            </button>
          )}

          <button
            onClick={onOpenCvModal}
            className="w-full py-2 bg-[#FAF8F5] hover:bg-[#F2ECE1] border border-[#CBD5E1] text-[#14261C] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <FileText className="w-3.5 h-3.5 text-[#1B4332]" />
            <span>Official Curriculum Vitae</span>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onNavigateToYoutube || (() => window.open('https://www.youtube.com/@pjt247', '_blank'))}
              className="flex-1 py-2 bg-[#FEF2F2] hover:bg-[#FEE2E2] border border-[#FECACA] text-[#DC2626] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Youtube className="w-3.5 h-3.5 fill-current" />
              <span>YouTube Channel (@pjt247)</span>
            </button>
            <a
              href="https://www.youtube.com/@pjt247"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-[#FEF2F2] hover:bg-[#FEE2E2] border border-[#FECACA] text-[#DC2626] rounded-lg transition-colors flex items-center justify-center shadow-xs"
              title="Open YouTube channel in new tab"
              aria-label="Open YouTube channel in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {onOpenVideoModal && (
            <button
              onClick={onOpenVideoModal}
              className="w-full py-2 bg-[#FAF8F5] hover:bg-[#F2ECE1] border border-[#CBD5E1] text-[#14261C] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Play className="w-3.5 h-3.5 text-[#DC2626] fill-current" />
              <span>Launch Live AIoT Video Feed</span>
            </button>
          )}

          {onNavigateToCrate && (
            <button
              onClick={onNavigateToCrate}
              className="w-full py-2 bg-[#FAF8F5] hover:bg-[#F2ECE1] border border-[#CBD5E1] text-[#14261C] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Disc className="w-3.5 h-3.5 text-[#1B4332]" />
              <span>3D Project Crate Discovery</span>
            </button>
          )}

          <button
            onClick={onOpenContactModal}
            className="w-full py-2 bg-[#1B4332] hover:bg-[#255741] active:bg-[#14261C] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Collaborate / Hire</span>
          </button>
        </div>
      </div>

      {/* Featured Architecture & Tech Stacks Nav List */}
      <div className="bg-white rounded-xl border border-[#E8E2D5] p-5 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#1B4332]" />
            <h2 className="text-sm font-serif font-bold text-[#14261C]">
              Architecture Stack
            </h2>
          </div>
          <span className="text-xs font-mono tabular-nums text-[#6A7C70]">
            {featuredStacks.length} modules
          </span>
        </div>

        {/* Quick Filter */}
        <input
          type="text"
          placeholder="Filter tech stacks..."
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          className="w-full text-xs px-3 py-1.5 rounded-lg border border-[#E2DBD0] bg-[#FAF8F5] text-[#1E2922] placeholder:text-[#8C9B90] focus:outline-none focus:ring-1 focus:ring-[#1B4332] mb-3"
        />

        {/* Stack Items */}
        <div className="space-y-2">
          {filteredStacks.map((stack) => {
            const isSelected = selectedStackId === stack.id;
            return (
              <button
                key={stack.id}
                onClick={() => onSelectStack(stack)}
                className={`w-full text-left p-2.5 rounded-lg transition-colors border group ${
                  isSelected
                    ? 'bg-[#F2ECE1] border-[#1B4332]/40 ring-1 ring-[#1B4332]/20'
                    : 'bg-[#FAF8F5]/60 hover:bg-[#F5EFE4] border-transparent'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-[#14261C] group-hover:text-[#1B4332] truncate">
                      {stack.name}
                    </p>
                    <p className="text-[11px] text-[#65776C] truncate mt-0.5">
                      {stack.domain}
                    </p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#91A296] group-hover:text-[#1B4332] shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5" />
                </div>

                <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-[#55695C]">
                  <span className="font-mono tabular-nums font-medium text-[#1B4332]">
                    {stack.latencyOrMetric}
                  </span>
                  <span aria-hidden="true" className="text-[#B6C4BA]">·</span>
                  <span className="text-[10px] text-[#2D5A27] font-medium">
                    {stack.status}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer philosophy note */}
        <div className="mt-4 pt-3 border-t border-[#F0ECE1] text-[11px] text-[#63756A] flex items-center justify-between">
          <span>Suwa Univ. Doctoral Candidate</span>
          <span className="text-[#1B4332] font-medium">Doctoral Course</span>
        </div>
      </div>
    </aside>
  );
};
