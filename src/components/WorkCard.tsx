import React, { useState } from 'react';
import { ProjectWork, VisualTile } from '../types/portfolio';
import { ProjectTiles } from './ProjectTiles';
import { BenchmarkSparkline } from './BenchmarkSparkline';
import {
  Star,
  MessageSquare,
  Share2,
  Bookmark,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Github,
  FileText,
  Newspaper,
  Check,
  Sparkles,
  Send,
  Cpu,
} from 'lucide-react';

interface WorkCardProps {
  project: ProjectWork;
  onOpenVisualLightbox: (tiles: VisualTile[], index: number, projectTitle: string) => void;
  onToggleStar: (projectId: string) => void;
  onAddComment: (projectId: string, commentText: string) => void;
  onBookmarkProject?: (project: ProjectWork) => void;
}

export const WorkCard: React.FC<WorkCardProps> = ({
  project,
  onOpenVisualLightbox,
  onToggleStar,
  onAddComment,
  onBookmarkProject,
}) => {
  const [showBenchmark, setShowBenchmark] = useState(true);
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
    onAddComment(project.id, commentInput.trim());
    setCommentInput('');
  };

  const statusStyles = {
    'Published': 'text-[#1E4D6B] bg-[#EAF2F8] border-[#BED5E5]',
    'Live in Field': 'text-[#2D5A27] bg-[#EDF5EE] border-[#C8DEC9]',
    'Active Production': 'text-[#1B4332] bg-[#E8EFEA] border-[#BED5C6]',
    'Open Source': 'text-[#78350F] bg-[#FDF0E6] border-[#F3D7C0]',
  };

  return (
    <article className="bg-white rounded-xl border border-[#E8E2D5] p-5 shadow-xs transition-shadow hover:shadow-sm">
      {/* Flagship Banner */}
      {project.isFlagship && project.flagshipBadge && (
        <div className="mb-3.5 px-3 py-1.5 rounded-lg bg-[#FAF3E8] border border-[#F0DDC4] flex items-center justify-between text-xs font-medium text-[#8C5338]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
            <span className="font-semibold">{project.flagshipBadge}</span>
          </div>
          <span className="text-[10px] font-mono text-[#A36647] uppercase tracking-wider">
            Verified Milestone
          </span>
        </div>
      )}

      {/* Card Header: Project title, Subtitle & Status */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="text-base sm:text-lg font-serif font-bold text-[#14261C] leading-snug tracking-tight">
            {project.title}
          </h2>
          <p className="text-xs text-[#526357] mt-0.5">
            {project.subtitle}
          </p>
        </div>

        {/* Status Tag */}
        <div
          className={`shrink-0 px-2.5 py-1 rounded text-[11px] font-medium border ${
            statusStyles[project.status] || 'text-[#4A5D50] bg-[#FAF8F5] border-[#E8E2D5]'
          }`}
        >
          {project.status}
        </div>
      </div>

      {/* Clean Unboxed Metadata with Typographic Bullet Separators */}
      <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#4A5D50]">
        <span className="font-semibold text-[#1B4332]">{project.category}</span>
        <span aria-hidden="true" className="text-[#C5D1C9]">·</span>
        <span className="text-[#75887C]">{project.timestamp}</span>
      </div>

      {/* Project Key Metrics Row */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 p-2.5 bg-[#FAF8F5] rounded-lg border border-[#EDE7DC] text-center">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="p-1">
              <span className="text-[10px] text-[#63756A] block truncate">{m.label}</span>
              <span className="text-xs font-mono font-bold text-[#14261C] tabular-nums mt-0.5 block">
                {m.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Technical Summary & Deep Dive */}
      <div className="mt-3.5 text-xs text-[#2A3B31] leading-relaxed bg-[#FAF8F5]/80 p-3 rounded-lg border border-[#EBE5DB]">
        <p className="text-[#14261C] font-medium mb-1">
          {project.summary}
        </p>
        <p className="text-[#4E6155] leading-relaxed mt-1.5 pt-1.5 border-t border-[#EDE7DC]">
          {project.deepDive}
        </p>
      </div>

      {/* Visual Schematic Tiles with Count Overlays */}
      {project.visualTiles && project.visualTiles.length > 0 && (
        <div className="mt-4">
          <ProjectTiles
            tiles={project.visualTiles}
            onOpenTile={(tileIndex) =>
              onOpenVisualLightbox(project.visualTiles, tileIndex, project.title)
            }
          />
        </div>
      )}

      {/* Benchmark Sparkline Curve Section */}
      {project.benchmarks && project.benchmarks.length > 1 && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <button
              onClick={() => setShowBenchmark(!showBenchmark)}
              className="text-xs font-medium text-[#4A5D50] hover:text-[#1B4332] flex items-center gap-1 transition-colors"
            >
              <span>{showBenchmark ? 'Hide' : 'Show'} Performance / Convergence Curve</span>
              {showBenchmark ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {showBenchmark && (
            <BenchmarkSparkline
              benchmarks={project.benchmarks}
              label={
                project.category === 'Computer Vision'
                  ? 'YOLO Field Accuracy & Precision Convergence'
                  : 'System Throughput & Ingestion Metric'
              }
            />
          )}
        </div>
      )}

      {/* Technologies Packed - Clean Unboxed Slash Delimited List */}
      {project.technologies && project.technologies.length > 0 && (
        <div className="mt-3.5 flex flex-wrap items-center gap-1.5 text-[11px] text-[#63756A]">
          <span className="font-medium text-[#44554A]">Stack:</span>
          {project.technologies.map((tech, idx) => (
            <React.Fragment key={idx}>
              <span className="text-[#1B4332] font-mono font-medium">{tech}</span>
              {idx < project.technologies.length - 1 && (
                <span aria-hidden="true" className="text-[#D0D9D3]">/</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* External Links Bar */}
      <div className="mt-3.5 pt-3 border-t border-[#F0ECE1] flex flex-wrap items-center gap-2 text-xs">
        {project.links?.paperUrl && (
          <a
            href={project.links.paperUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#EAF2F8] text-[#1E4D6B] hover:bg-[#D5E6F2] font-medium transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Research Paper</span>
          </a>
        )}

        {project.links?.newsUrl && (
          <a
            href={project.links.newsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#FEF3C7] text-[#92400E] hover:bg-[#FDE68A] font-medium transition-colors"
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>Mongabay Feature</span>
          </a>
        )}

        {project.links?.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#F2ECE1] text-[#14261C] hover:bg-[#E8E0D2] font-medium transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Source Code</span>
          </a>
        )}

        {project.links?.liveDemo && (
          <a
            href={project.links.liveDemo}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#EDF5EE] text-[#1B4332] hover:bg-[#DFECE1] font-medium transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Visit progressthapa.com.np</span>
          </a>
        )}
      </div>

      {/* Card Actions & Engagement Footer */}
      <div className="mt-3.5 pt-3 border-t border-[#F0ECE1] flex items-center justify-between">
        {/* Left: Star / Applaud & Comments */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleStar(project.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              project.userStarred
                ? 'bg-[#FEF3C7] text-[#92400E]'
                : 'bg-[#FAF8F5] hover:bg-[#F2ECE1] text-[#4A5D50] hover:text-[#14261C]'
            }`}
            title="Star / Applaud Research"
          >
            <Star
              className={`w-3.5 h-3.5 transition-transform active:scale-125 ${
                project.userStarred ? 'fill-[#D97706] text-[#D97706]' : ''
              }`}
            />
            <span className="font-mono tabular-nums font-semibold">
              {project.starsCount}
            </span>
            <span className="hidden sm:inline">Stars</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              showComments
                ? 'bg-[#E8EFEA] text-[#1B4332]'
                : 'bg-[#FAF8F5] hover:bg-[#F2ECE1] text-[#4A5D50] hover:text-[#14261C]'
            }`}
            title="View discussion thread"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="font-mono tabular-nums font-semibold">
              {project.comments.length}
            </span>
            <span className="hidden sm:inline">Peer Review</span>
          </button>
        </div>

        {/* Right Actions: Bookmark & Share */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setIsBookmarked(!isBookmarked);
              if (onBookmarkProject) onBookmarkProject(project);
            }}
            className={`p-2 rounded-lg text-xs transition-colors ${
              isBookmarked
                ? 'bg-[#EDF5EE] text-[#1B4332]'
                : 'text-[#63756A] hover:bg-[#F2ECE1] hover:text-[#1B4332]'
            }`}
            title={isBookmarked ? 'Bookmarked' : 'Bookmark for reading'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1 p-2 rounded-lg text-xs text-[#63756A] hover:bg-[#F2ECE1] hover:text-[#1B4332] transition-colors"
            title="Share project"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-[#2D5A27]" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expandable Comments Drawer */}
      {showComments && (
        <div className="mt-3.5 pt-3.5 border-t border-[#F0ECE1] space-y-3">
          <div className="space-y-2.5">
            {project.comments.map((comm) => (
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

            {project.comments.length === 0 && (
              <p className="text-xs text-[#7D9083] italic py-1 text-center">
                No discussion yet. Ask Progress about training hyperparameters or deployment hurdles!
              </p>
            )}
          </div>

          {/* Add Comment Input Form */}
          <form onSubmit={handleCommentSubmit} className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Ask Progress about model weights, latency, or datasets..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="flex-1 text-xs px-3 py-2 rounded-lg border border-[#E2DBD0] bg-[#FAF8F5] text-[#1E2922] placeholder:text-[#8C9B90] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
            />
            <button
              type="submit"
              disabled={!commentInput.trim()}
              className="px-3 py-2 bg-[#1B4332] text-white rounded-lg text-xs font-medium hover:bg-[#255741] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
            >
              <span>Send</span>
              <Send className="w-3 h-3" />
            </button>
          </form>
        </div>
      )}
    </article>
  );
};
