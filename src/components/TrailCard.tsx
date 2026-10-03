import React, { useState } from 'react';
import { TrailLog, PhotoTile } from '../types/trail';
import { PhotoTiles } from './PhotoTiles';
import { ElevationSparkline } from './ElevationSparkline';
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Clock,
  Send,
  Flag,
  Check,
  Sparkles,
} from 'lucide-react';

interface TrailCardProps {
  trail: TrailLog;
  onOpenPhotoLightbox: (photos: PhotoTile[], index: number, trailName: string) => void;
  onToggleKudos: (trailId: string) => void;
  onAddComment: (trailId: string, commentText: string) => void;
  onSaveTrailRoute?: (trail: TrailLog) => void;
}

export const TrailCard: React.FC<TrailCardProps> = ({
  trail,
  onOpenPhotoLightbox,
  onToggleKudos,
  onAddComment,
  onSaveTrailRoute,
}) => {
  const [showElevation, setShowElevation] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(trail.id, commentInput.trim());
    setCommentInput('');
  };

  // Status visual cues paired with clear text labels (accessible color-blind compliance)
  const statusStyles = {
    'Clear': 'text-[#2D5A27] bg-[#EDF5EE] border-[#C8DEC9]',
    'Snow Above 6k': 'text-[#1E4D6B] bg-[#EAF2F8] border-[#BED5E5]',
    'Blowdowns': 'text-[#B45309] bg-[#FEF3C7] border-[#FDE68A]',
    'Muddy': 'text-[#78350F] bg-[#FDF0E6] border-[#F3D7C0]',
    'Buggy': 'text-[#656E21] bg-[#F7F9E5] border-[#E2E8AF]',
  };

  return (
    <article className="bg-white rounded-xl border border-[#E8E2D5] p-5 shadow-xs transition-shadow hover:shadow-sm">
      {/* Milestone Header Banner if applicable */}
      {trail.isMilestone && trail.milestoneTitle && (
        <div className="mb-3.5 px-3 py-1.5 rounded-lg bg-[#FAF3E8] border border-[#F0DDC4] flex items-center gap-2 text-xs font-medium text-[#8C5338]">
          <Sparkles className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
          <span>{trail.milestoneTitle}</span>
        </div>
      )}

      {/* Card Header: Author / Location & Activity */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-base sm:text-lg font-serif font-bold text-[#14261C] leading-snug tracking-tight">
            {trail.trailName}
          </h2>
          <p className="text-xs text-[#526357] mt-0.5 truncate">
            {trail.region}
          </p>
        </div>

        {/* Trail Condition Status Tag */}
        <div
          className={`shrink-0 px-2.5 py-1 rounded text-[11px] font-medium border ${
            statusStyles[trail.trailStatus] || 'text-[#4A5D50] bg-[#FAF8F5] border-[#E8E2D5]'
          }`}
        >
          {trail.trailStatus}
        </div>
      </div>

      {/* Clean Unboxed Metadata with Typographic Bullet Separators */}
      <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#4A5D50]">
        <span className="font-semibold text-[#1B4332]">{trail.activityType}</span>
        <span aria-hidden="true" className="text-[#C5D1C9]">·</span>
        <span className="font-mono tabular-nums font-medium">{trail.distanceMi} mi</span>
        <span aria-hidden="true" className="text-[#C5D1C9]">·</span>
        <span className="font-mono tabular-nums font-medium">+{trail.elevationGainFt.toLocaleString()} ft vert</span>
        <span aria-hidden="true" className="text-[#C5D1C9]">·</span>
        <span className="font-mono tabular-nums">{trail.movingTime}</span>
        <span aria-hidden="true" className="text-[#C5D1C9]">·</span>
        <span className="text-[#75887C]">{trail.timestamp}</span>
      </div>

      {/* Condition Report Notes */}
      <div className="mt-3.5 text-xs text-[#2A3B31] leading-relaxed bg-[#FAF8F5]/80 p-3 rounded-lg border border-[#EBE5DB]">
        <p className="font-serif italic text-[#14261C] mb-1 text-[11px] font-semibold not-italic text-[#1B4332] flex items-center gap-1.5">
          <span>Trail Steward Condition Notes</span>
        </p>
        <p>{trail.conditionReport}</p>
      </div>

      {/* Photo Tiles with Count Overlays */}
      {trail.photos && trail.photos.length > 0 && (
        <div className="mt-4">
          <PhotoTiles
            photos={trail.photos}
            onOpenPhoto={(photoIndex) =>
              onOpenPhotoLightbox(trail.photos, photoIndex, trail.trailName)
            }
          />
        </div>
      )}

      {/* Elevation Profile Sparkline Section */}
      {trail.elevationProfile && trail.elevationProfile.length > 1 && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <button
              onClick={() => setShowElevation(!showElevation)}
              className="text-xs font-medium text-[#4A5D50] hover:text-[#1B4332] flex items-center gap-1 transition-colors"
            >
              <span>{showElevation ? 'Hide' : 'Show'} Elevation Graph</span>
              {showElevation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {showElevation && (
            <ElevationSparkline
              elevations={trail.elevationProfile}
              distanceMi={trail.distanceMi}
              maxAltitudeFt={trail.maxAltitudeFt}
            />
          )}
        </div>
      )}

      {/* Gear Highlights - Unboxed text items */}
      {trail.gearHighlights && trail.gearHighlights.length > 0 && (
        <div className="mt-3.5 flex flex-wrap items-center gap-1.5 text-[11px] text-[#63756A]">
          <span className="font-medium text-[#44554A]">Packed Gear:</span>
          {trail.gearHighlights.map((gear, idx) => (
            <React.Fragment key={idx}>
              <span className="text-[#304136]">{gear}</span>
              {idx < trail.gearHighlights.length - 1 && (
                <span aria-hidden="true" className="text-[#D0D9D3]">/</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Card Actions & Engagement Footer */}
      <div className="mt-4 pt-3.5 border-t border-[#F0ECE1] flex items-center justify-between">
        {/* Left Engagement: Kudos & Comments */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleKudos(trail.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              trail.userGaveKudos
                ? 'bg-[#FBE8E8] text-[#BE123C]'
                : 'bg-[#FAF8F5] hover:bg-[#F2ECE1] text-[#4A5D50] hover:text-[#14261C]'
            }`}
            title="Give Trail Kudos"
          >
            <Heart
              className={`w-3.5 h-3.5 transition-transform active:scale-125 ${
                trail.userGaveKudos ? 'fill-[#BE123C] text-[#BE123C]' : ''
              }`}
            />
            <span className="font-mono tabular-nums font-semibold">
              {trail.kudosCount}
            </span>
            <span className="hidden sm:inline">Kudos</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              showComments
                ? 'bg-[#E8EFEA] text-[#1B4332]'
                : 'bg-[#FAF8F5] hover:bg-[#F2ECE1] text-[#4A5D50] hover:text-[#14261C]'
            }`}
            title="View trail discussion"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="font-mono tabular-nums font-semibold">
              {trail.comments.length}
            </span>
            <span className="hidden sm:inline">Discussion</span>
          </button>
        </div>

        {/* Right Actions: Bookmark & Share */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setIsBookmarked(!isBookmarked);
              if (onSaveTrailRoute) onSaveTrailRoute(trail);
            }}
            className={`p-2 rounded-lg text-xs transition-colors ${
              isBookmarked
                ? 'bg-[#EDF5EE] text-[#1B4332]'
                : 'text-[#63756A] hover:bg-[#F2ECE1] hover:text-[#1B4332]'
            }`}
            title={isBookmarked ? 'Saved to wish list' : 'Bookmark trail route'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1 p-2 rounded-lg text-xs text-[#63756A] hover:bg-[#F2ECE1] hover:text-[#1B4332] transition-colors"
            title="Share trail report"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-[#2D5A27]" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expandable Comments & Discussion Drawer */}
      {showComments && (
        <div className="mt-3.5 pt-3.5 border-t border-[#F0ECE1] space-y-3">
          <div className="space-y-2.5">
            {trail.comments.map((comm) => (
              <div
                key={comm.id}
                className="bg-[#FAF8F5] p-2.5 rounded-lg text-xs border border-[#EDE7DC]"
              >
                <div className="flex items-center justify-between text-[#63756A] mb-1">
                  <div className="flex items-center gap-1.5 font-medium text-[#1B4332]">
                    <div className="w-4 h-4 rounded-full bg-[#1B4332] text-white flex items-center justify-center text-[9px] font-mono">
                      {comm.avatarInitials}
                    </div>
                    <span>{comm.author}</span>
                  </div>
                  <span className="text-[10px] text-[#8A9C90]">{comm.timeAgo}</span>
                </div>
                <p className="text-[#324439] pl-5 leading-relaxed">{comm.text}</p>
              </div>
            ))}

            {trail.comments.length === 0 && (
              <p className="text-xs text-[#7D9083] italic py-1 text-center">
                No comments yet. Ask about current trail conditions!
              </p>
            )}
          </div>

          {/* Add Comment Input Form */}
          <form onSubmit={handleCommentSubmit} className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Ask Elena about trail snow level, water sources, or parking..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="flex-1 text-xs px-3 py-2 rounded-lg border border-[#E2DBD0] bg-[#FAF8F5] text-[#1E2922] placeholder:text-[#8C9B90] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
            />
            <button
              type="submit"
              disabled={!commentInput.trim()}
              className="px-3 py-2 bg-[#1B4332] text-white rounded-lg text-xs font-medium hover:bg-[#255741] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
            >
              <span>Reply</span>
              <Send className="w-3 h-3" />
            </button>
          </form>
        </div>
      )}
    </article>
  );
};
