import React, { useState } from 'react';
import {
  Youtube,
  Play,
  ExternalLink,
  Users,
  Video,
  Sparkles,
  CheckCircle2,
  Share2,
  Clock,
  Eye,
  Calendar,
  ThumbsUp,
  Tag,
  Radio,
  X,
} from 'lucide-react';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  publishedDate: string;
  views: string;
  likes: string;
  category: 'AI & Edge Vision' | 'Philosophy & Prajna' | 'Music & Creative' | 'Software Systems';
  thumbnailUrl: string;
  youtubeUrl: string;
  embedCode?: string;
  tags: string[];
}

export const YouTubeChannelView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeVideoModal, setActiveVideoModal] = useState<YouTubeVideo | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const channelVideos: YouTubeVideo[] = [
    {
      id: 'vid_sentinel_field',
      title: 'Sentinel: Real-Time Primate Behavior Analysis on Edge AIoT (J-NaNA Vol 5)',
      description: 'Field demonstration of YOLOv8n NCNN INT8 running at 15–18 FPS on embedded hardware during a 672-hour continuous deployment across Swayambhunath UNESCO shrines in Kathmandu.',
      duration: '14:28',
      publishedDate: '2026',
      views: '12.4K',
      likes: '1.2K',
      category: 'AI & Edge Vision',
      thumbnailUrl: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=1200&q=80',
      youtubeUrl: 'https://www.youtube.com/@pjt247',
      tags: ['Edge AI', 'YOLOv8n', 'NCNN INT8', 'J-NaNA', 'MBUST'],
    },
    {
      id: 'vid_yolo_slack',
      title: 'Raspberry Pi 5 Monkey Detection with Slack Alerts for Crop Protection (IEEE ICTP 2026)',
      description: 'Field trials across 28 harvest sessions in Chitlang Valley terraces. Automated sub-second Slack webhook alerts sending photo verification directly to farmers smartphones.',
      duration: '11:15',
      publishedDate: '2026',
      views: '9.8K',
      likes: '890',
      category: 'AI & Edge Vision',
      thumbnailUrl: 'https://images.unsplash.com/photo-1570288685369-f7305163d0e3?auto=format&fit=crop&w=1200&q=80',
      youtubeUrl: 'https://www.youtube.com/@pjt247',
      tags: ['Raspberry Pi 5', 'Slack Alerts', 'Precision Agriculture', 'IEEE'],
    },
    {
      id: 'vid_breadth_in_out',
      title: 'Breadth In , Breadth Out : You Know What I Am Talking About (#growthtools)',
      description: 'The Conscious Architect perspective on breathing, computational mindfulness, and Prajna: cultivating mental ease, zero unnecessary cognitive friction, and authentic digital presence.',
      duration: '06:42',
      publishedDate: '2026',
      views: '4.6K',
      likes: '520',
      category: 'Philosophy & Prajna',
      thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
      youtubeUrl: 'https://www.youtube.com/@pjt247',
      tags: ['Mindfulness', 'Prajna', 'Conscious Architecture', 'Himalayas'],
    },
    {
      id: 'vid_be_yourself',
      title: 'Be Yourself First #2083 • Architecting Digital Futures',
      description: 'An intimate reflection on independent scientific research at MBUST, rejecting copy-paste paradigms, and building engineering systems grounded in authentic human reality.',
      duration: '09:50',
      publishedDate: '2026',
      views: '6.1K',
      likes: '710',
      category: 'Philosophy & Prajna',
      thumbnailUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80',
      youtubeUrl: 'https://www.youtube.com/@pjt247',
      tags: ['Philosophy', 'Systems Design', 'Self-Reliance', 'Nepal'],
    },
    {
      id: 'vid_jiwan_uncertainty',
      title: 'Jiwan The Uncertainty • Acoustic Musical Composition & Lyrics (Promise Jung Thapa)',
      description: 'Original acoustic ballad and lyric composition reflecting upon the impermanence of existence, wandering minds, and acoustic resonance recorded with Himalayan soundscapes.',
      duration: '04:36',
      publishedDate: '2025',
      views: '18.9K',
      likes: '1.8K',
      category: 'Music & Creative',
      thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      youtubeUrl: 'https://www.youtube.com/@pjt247',
      tags: ['Music', 'Acoustic', 'Himalayan Sound', 'PJT', 'Lyrics'],
    },
    {
      id: 'vid_loka_realm_3d',
      title: 'Loka Realm Viewer: 3D WebGL Visualization of 14 Cosmic Planes of Hindu Cosmology',
      description: 'Walkthrough of Three.js custom shaders, toroidal orbital physics, and Vedic metaphysics translating ancient cosmic structures into interactive 60 FPS WebGL.',
      duration: '16:04',
      publishedDate: '2026',
      views: '15.2K',
      likes: '1.5K',
      category: 'Software Systems',
      thumbnailUrl: 'https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=1200&q=80',
      youtubeUrl: 'https://www.youtube.com/@pjt247',
      tags: ['Three.js', 'WebGL', '3D Graphics', 'Hindu Cosmology', 'GLSL'],
    },
  ];

  const filteredVideos = channelVideos.filter((video) => {
    if (selectedCategory === 'all') return true;
    return video.category === selectedCategory;
  });

  const handleShareChannel = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('https://www.youtube.com/@pjt247');
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in select-none">
      {/* Channel Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-[#18181B] text-white border border-[#27272A] shadow-xl">
        {/* Banner Top Graphic */}
        <div className="h-44 sm:h-52 w-full bg-gradient-to-r from-[#7F1D1D] via-[#991B1B] to-[#1E293B] relative overflow-hidden flex items-end p-6">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="relative z-10 flex items-center gap-2 text-xs font-mono text-red-200">
            <Radio className="w-3.5 h-3.5 animate-pulse text-red-400" />
            <span>OFFICIAL YOUTUBE CHANNEL · @pjt247</span>
          </div>
        </div>

        {/* Channel Profile Info Bar */}
        <div className="p-6 sm:p-8 bg-[#18181B] flex flex-col md:flex-row md:items-center justify-between gap-6 -mt-12 relative z-20">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            {/* Avatar */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#18181B] bg-[#DC2626] flex items-center justify-center text-white shadow-2xl overflow-hidden shrink-0">
              <Youtube className="w-12 h-12 sm:w-14 sm:h-14 fill-current" />
            </div>

            {/* Title & Metadata */}
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  Progress Jung Thapa
                </h1>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-red-950/80 border border-red-800 text-red-300 font-semibold">
                  @pjt247
                </span>
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" title="Active Channel" />
              </div>

              <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1.5 leading-relaxed max-w-2xl">
                Documenting Edge AIoT systems, real-time computer vision in Nepal, YOLOv8n NCNN optimization on Raspberry Pi 5, robotics, systems architecture, and philosophical journeys of conscious engineering.
              </p>

              <div className="flex items-center gap-4 mt-3 text-xs font-mono text-[#D4D4D8]">
                <span>12+ Video Releases</span>
                <span>·</span>
                <span>65,000+ Total Views</span>
                <span>·</span>
                <span>MBUST Research Demonstrations</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleShareChannel}
              className="px-3.5 py-2 rounded-xl border border-[#3F3F46] bg-[#27272A] hover:bg-[#3F3F46] text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Copied Link' : 'Share'}</span>
            </button>

            <a
              href="https://www.youtube.com/@pjt247?sub_confirmation=1"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs font-mono transition-all flex items-center gap-2 shadow-lg hover:shadow-red-900/40 hover:scale-105"
            >
              <Youtube className="w-4 h-4 fill-current" />
              <span>Subscribe to @pjt247</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Video Filter Categories */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Video className="w-4 h-4 text-[#DC2626]" />
          <h2 className="text-lg font-serif font-bold text-[#14261C]">
            Featured Channel Videos &amp; Research Field Releases
          </h2>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {['all', 'AI & Edge Vision', 'Philosophy & Prajna', 'Music & Creative', 'Software Systems'].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#DC2626] text-white font-semibold'
                    : 'bg-white text-[#526357] hover:bg-[#F2ECE1] border border-[#E8E2D5]'
                }`}
              >
                {cat === 'all' ? 'All Videos' : cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            onClick={() => setActiveVideoModal(video)}
            className="bg-white rounded-2xl border border-[#E8E2D5] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            {/* Thumbnail with duration badge and play hover */}
            <div className="relative aspect-video overflow-hidden bg-black">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Play Button Icon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-115 group-hover:bg-red-600 transition-all duration-300">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>

              {/* Duration badge */}
              <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-white text-[11px] font-mono font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#A1A1AA]" />
                <span>{video.duration}</span>
              </div>

              {/* Category pill */}
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-red-600/90 text-white text-[10px] font-mono font-bold uppercase">
                {video.category}
              </div>
            </div>

            {/* Video Body Content */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-base font-serif font-bold text-[#14261C] group-hover:text-[#DC2626] transition-colors leading-snug line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-xs text-[#526357] mt-1.5 leading-relaxed line-clamp-3">
                  {video.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0ECE1] space-y-2">
                <div className="flex flex-wrap gap-1">
                  {video.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono bg-[#FAF8F5] border border-[#E8E2D5] text-[#55695C] px-2 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{video.views}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-3.5 h-3.5 text-[#22C55E]" />
                      <span>{video.likes}</span>
                    </span>
                  </div>

                  <a
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[#DC2626] hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Watch</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Preview Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-3xl bg-[#18181B] text-white rounded-2xl border border-[#3F3F46] shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-[#27272A] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Youtube className="w-5 h-5 text-red-500 fill-current" />
                <span className="font-mono text-xs text-red-400 font-bold uppercase">
                  YouTube Video Preview · @pjt247
                </span>
              </div>

              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1 rounded-lg hover:bg-[#27272A] text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Viewport / Thumbnail */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeVideoModal.thumbnailUrl}
                alt={activeVideoModal.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center">
                <a
                  href={activeVideoModal.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-red-500 transition-all mb-4"
                >
                  <Play className="w-8 h-8 fill-current ml-1" />
                </a>

                <h3 className="text-xl font-serif font-bold text-white max-w-xl">
                  {activeVideoModal.title}
                </h3>
                <p className="text-xs text-red-200 mt-2 font-mono">
                  Click to open full video on YouTube (@pjt247)
                </p>
              </div>
            </div>

            {/* Modal Footer Description */}
            <div className="p-5 space-y-3">
              <p className="text-xs sm:text-sm text-[#D4D4D8] leading-relaxed">
                {activeVideoModal.description}
              </p>

              <div className="pt-3 border-t border-[#27272A] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-4 text-[#A1A1AA]">
                  <span>Duration: {activeVideoModal.duration}</span>
                  <span>Views: {activeVideoModal.views}</span>
                  <span>Channel: @pjt247</span>
                </div>

                <a
                  href={activeVideoModal.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg transition-colors"
                >
                  <Youtube className="w-4 h-4 fill-current" />
                  <span>Open Video on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
