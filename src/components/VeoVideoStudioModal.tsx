import React, { useState, useRef } from 'react';
import {
  X,
  Video,
  Sparkles,
  Upload,
  Play,
  Pause,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Film,
  Layers,
  Sliders,
  ExternalLink,
  ChevronRight,
  Maximize2,
} from 'lucide-react';

interface VeoVideoStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialImage?: string | null;
  onVideoCreated?: (videoUrl: string) => void;
}

export const VeoVideoStudioModal: React.FC<VeoVideoStudioModalProps> = ({
  isOpen,
  onClose,
  initialImage,
  onVideoCreated,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(initialImage || null);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [resolution, setResolution] = useState<'720p' | '1080p'>('720p');
  const [prompt, setPrompt] = useState<string>(
    'Formal cinematic portrait of Progress Jung Thapa, subtle natural head motion, gentle confident gaze, realistic high-detail studio lighting'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!isOpen) return null;

  const promptPresets = [
    {
      title: 'Formal Head Turn & Smile',
      text: 'Formal cinematic portrait of Progress Jung Thapa, subtle natural head motion, gentle confident gaze, realistic high-detail studio lighting',
    },
    {
      title: 'Cinematic Parallax & Breathing',
      text: 'Slow cinematic dolly-in camera motion, subtle natural breathing, realistic eye reflection and elegant soft depth of field',
    },
    {
      title: 'Himalayan Golden Hour',
      text: 'Warm golden mountain sunlight brushing the portrait, gentle breeze moving hair strands, cinematic film grain',
    },
    {
      title: 'AI Researcher at Work',
      text: 'Reflective intellectual expression, subtle nod of comprehension, ambient emerald glow of edge AI displays in background',
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setSelectedImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateVideo = async () => {
    setIsGenerating(true);
    setErrorMsg(null);
    setGenerationProgress('Connecting to Veo video engine (veo-3.1-fast-generate-preview)...');

    try {
      // 1. Call backend to start video generation
      const startRes = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          imageBase64: selectedImage || undefined,
          aspectRatio,
          resolution,
          model: 'veo-3.1-fast-generate-preview',
        }),
      });

      if (!startRes.ok) {
        const errData = await startRes.json().catch(() => ({}));
        throw new Error(errData.error || `Server error (${startRes.status})`);
      }

      const { operationName } = await startRes.json();
      setGenerationProgress(`Generation queued. Operation: ${operationName.split('/').pop()}...`);

      // 2. Poll video-status until complete
      let isDone = false;
      let attempts = 0;
      const maxAttempts = 60; // 3 minutes max

      while (!isDone && attempts < maxAttempts) {
        attempts++;
        await new Promise((r) => setTimeout(r, 3000));
        setGenerationProgress(`Synthesizing motion frames with Veo (${attempts * 3}s elapsed)...`);

        const statusRes = await fetch('/api/video-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ operationName }),
        });

        if (!statusRes.ok) {
          const errData = await statusRes.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed checking status');
        }

        const statusData = await statusRes.json();
        if (statusData.error) {
          throw new Error(statusData.error.message || 'Video generation failed');
        }

        if (statusData.done) {
          isDone = true;
          setGenerationProgress('Video render completed! Fetching MP4 stream...');
        }
      }

      if (!isDone) {
        throw new Error('Video generation timed out. Please try again.');
      }

      // 3. Download the video binary stream
      const downloadRes = await fetch('/api/video-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operationName }),
      });

      if (!downloadRes.ok) {
        throw new Error('Failed to download completed video stream');
      }

      const videoBlob = await downloadRes.blob();
      const videoObjectUrl = URL.createObjectURL(videoBlob);
      setGeneratedVideoUrl(videoObjectUrl);
      if (onVideoCreated) {
        onVideoCreated(videoObjectUrl);
      }
      setGenerationProgress('Completed!');
    } catch (err: any) {
      console.warn('Veo generation fallback or error:', err);
      setErrorMsg(
        err.message || 'Veo generation error. You can test generation or preview the video below.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#09150E] text-white rounded-3xl border border-[#1B4332] shadow-2xl overflow-hidden my-4 flex flex-col max-h-[92vh]">
        {/* Top Control Bar */}
        <div className="bg-[#050D08] px-5 sm:px-7 py-4 border-b border-[#142C1F] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40 flex items-center justify-center">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-serif font-bold text-white">
                  Animate Photo into Video · Veo Studio
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#142C1F] text-[#86EFAC] border border-[#2D5A27]">
                  veo-3.1-fast-generate-preview
                </span>
              </div>
              <p className="text-[11px] font-mono text-[#86EFAC]/80">
                Transform still portraits into living cinematic videos using Google Veo AI
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-black/40 hover:bg-[#142C1F] text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1">
          {/* Top Video Preview & Player Showcase */}
          <div className="bg-[#040A06] rounded-2xl border border-[#142C1F] p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase text-[#86EFAC]">
                  {generatedVideoUrl ? 'GENERATED VEO VIDEO PREVIEW' : 'PORTRAIT MOTION SIMULATION'}
                </span>
              </div>
              <span className="text-[10px] font-mono text-white/60">
                ASPECT RATIO: {aspectRatio} · {resolution}
              </span>
            </div>

            {/* Video Viewport */}
            <div
              className={`relative mx-auto rounded-xl overflow-hidden bg-black border border-[#1B4332] shadow-xl flex items-center justify-center ${
                aspectRatio === '9:16'
                  ? 'max-w-[320px] aspect-[9/16]'
                  : 'w-full aspect-[16/9] max-h-[380px]'
              }`}
            >
              {generatedVideoUrl ? (
                <video
                  ref={videoRef}
                  src={generatedVideoUrl}
                  autoPlay
                  loop
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                /* Pre-loaded Living Portrait Animated Video Simulation */
                <div className="relative w-full h-full flex items-center justify-center bg-radial from-[#183626] to-[#050D08] overflow-hidden group">
                  {/* Subtle Animated Lighting Waves */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-lime-500/10 animate-pulse pointer-events-none" />

                  {/* Centered Formal Portrait with Cinematic Motion */}
                  <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-2 border-[#22C55E]/40 shadow-2xl animate-float">
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Portrait"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      /* Formal Passport Portrait SVG with subtle breathing simulation */
                      <svg
                        className="w-full h-full transform transition-transform duration-1000 group-hover:scale-105"
                        viewBox="0 0 200 200"
                        preserveAspectRatio="xMidYMid slice"
                      >
                        <defs>
                          <linearGradient id="v_skin" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#E0AC84" />
                            <stop offset="100%" stopColor="#AF754E" />
                          </linearGradient>
                        </defs>
                        <rect width="200" height="200" fill="#FFFFFF" />
                        <path d="M48,80 C44,45 65,18 100,18 C135,18 156,45 152,80 C156,98 152,122 144,135 C136,110 138,85 138,70 C138,38 122,25 100,25 C78,25 62,38 62,70 C62,85 64,110 56,135 C48,122 44,98 48,80 Z" fill="#171717" />
                        <path d="M0,158 C25,146 55,140 100,140 C145,140 175,146 200,158 L200,200 L0,200 Z" fill="#18181B" />
                        <polygon points="72,142 128,142 100,186" fill="#FFFFFF" />
                        <polygon points="72,142 86,172 100,165 88,142" fill="#F8FAFC" />
                        <polygon points="128,142 114,172 100,165 112,142" fill="#F8FAFC" />
                        <polygon points="94,164 106,164 103,174 97,174" fill="#0C0A09" />
                        <polygon points="96,174 104,174 108,200 92,200" fill="#0C0A09" />
                        <path d="M40,155 L74,180 L76,200 L25,200 Z" fill="#18181B" />
                        <path d="M160,155 L126,180 L124,200 L175,200 Z" fill="#18181B" />
                        <rect x="85" y="112" width="30" height="35" rx="4" fill="url(#v_skin)" />
                        <ellipse cx="100" cy="85" rx="42" ry="50" fill="url(#v_skin)" />
                        <path d="M58,68 C62,40 76,28 100,28 C124,28 138,40 142,68 C135,52 120,44 100,45 C80,44 65,52 58,68 Z" fill="#171717" />
                        <ellipse cx="58" cy="86" rx="6" ry="12" fill="#C99066" />
                        <ellipse cx="142" cy="86" rx="6" ry="12" fill="#C99066" />
                        <path d="M72,70 Q84,65 94,70" fill="none" stroke="#171717" strokeWidth="4" strokeLinecap="round" />
                        <path d="M106,70 Q116,65 128,70" fill="none" stroke="#171717" strokeWidth="4" strokeLinecap="round" />
                        <ellipse cx="83" cy="78" rx="8" ry="5.5" fill="#FAF5F0" />
                        <ellipse cx="117" cy="78" rx="8" ry="5.5" fill="#FAF5F0" />
                        <circle cx="83" cy="78" r="4.2" fill="#3D2314" />
                        <circle cx="117" cy="78" r="4.2" fill="#3D2314" />
                        <circle cx="84.5" cy="76.5" r="1.2" fill="#FFFFFF" />
                        <circle cx="118.5" cy="76.5" r="1.2" fill="#FFFFFF" />
                        <ellipse cx="100" cy="94" rx="5" ry="3" fill="#A86F49" />
                        <path d="M86,102 Q94,98 100,102 Q106,98 114,102 C122,106 116,112 108,109 Q100,106 92,109 C84,112 78,106 86,102 Z" fill="#171717" />
                        <path d="M58,86 C58,110 65,138 100,140 C135,138 142,110 142,86 C138,98 132,122 122,128 C114,133 86,133 78,128 C68,122 62,98 58,86 Z" fill="#171717" />
                      </svg>
                    )}
                  </div>

                  {/* Cinematic Video Overlay Badges */}
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[11px] font-mono text-[#86EFAC] flex items-center gap-2">
                    <Video className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span>Living Video Stream Ready</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Configuration Controls: Aspect Ratio, Resolution & Photo Picker */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left Box: Photo Upload & Selection */}
            <div className="p-4 rounded-2xl bg-[#07140B] border border-[#142C1F] space-y-3">
              <span className="text-xs font-mono font-bold text-[#A3E635] uppercase flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5" />
                <span>1. Select Starting Portrait</span>
              </span>

              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#22C55E]/40 bg-white shrink-0">
                  {selectedImage ? (
                    <img src={selectedImage} alt="Starting" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#183626] flex items-center justify-center text-white font-serif font-bold text-lg">
                      PT
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg bg-[#142C1F] hover:bg-[#1B4332] text-white text-xs font-mono font-semibold border border-[#2D5A27] transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#22C55E]" />
                      <span>Upload Photo</span>
                    </button>

                    <button
                      onClick={() => setSelectedImage(null)}
                      className="px-2.5 py-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-white/70 text-xs font-mono transition-colors"
                      title="Reset to default formal passport portrait"
                    >
                      Reset Default
                    </button>
                  </div>
                  <p className="text-[10px] text-[#86EFAC]/70 font-mono">
                    JPG or PNG · Preloaded with Progress's formal passport photo
                  </p>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>

            {/* Right Box: Aspect Ratio & Resolution per prompt requirements */}
            <div className="p-4 rounded-2xl bg-[#07140B] border border-[#142C1F] space-y-3">
              <span className="text-xs font-mono font-bold text-[#A3E635] uppercase flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                <span>2. Video Aspect Ratio &amp; Resolution</span>
              </span>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {/* 16:9 Landscape Option */}
                <button
                  onClick={() => setAspectRatio('16:9')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    aspectRatio === '16:9'
                      ? 'bg-[#142C1F] border-[#22C55E] text-white ring-1 ring-[#22C55E]'
                      : 'bg-black/30 border-[#1B4332] text-white/70 hover:bg-[#0B1A12]'
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>16:9 Landscape</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-black/40 text-[#86EFAC]">
                      Default
                    </span>
                  </div>
                  <div className="text-[10px] text-[#A7F3D0]/70 mt-1">
                    Ideal for desktop, presentations, and YouTube
                  </div>
                </button>

                {/* 9:16 Portrait Option */}
                <button
                  onClick={() => setAspectRatio('9:16')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    aspectRatio === '9:16'
                      ? 'bg-[#142C1F] border-[#22C55E] text-white ring-1 ring-[#22C55E]'
                      : 'bg-black/30 border-[#1B4332] text-white/70 hover:bg-[#0B1A12]'
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>9:16 Portrait</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-black/40 text-[#86EFAC]">
                      Vertical
                    </span>
                  </div>
                  <div className="text-[10px] text-[#A7F3D0]/70 mt-1">
                    Ideal for mobile stories, reels, and feeds
                  </div>
                </button>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-[#86EFAC]">
                <span>Resolution:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setResolution('720p')}
                    className={`px-2 py-0.5 rounded ${
                      resolution === '720p'
                        ? 'bg-[#22C55E] text-black font-bold'
                        : 'bg-black/40 text-white/70'
                    }`}
                  >
                    720p (Fast)
                  </button>
                  <button
                    onClick={() => setResolution('1080p')}
                    className={`px-2 py-0.5 rounded ${
                      resolution === '1080p'
                        ? 'bg-[#22C55E] text-black font-bold'
                        : 'bg-black/40 text-white/70'
                    }`}
                  >
                    1080p (HD)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Motion Prompt & Presets */}
          <div className="p-4 rounded-2xl bg-[#07140B] border border-[#142C1F] space-y-3">
            <span className="text-xs font-mono font-bold text-[#A3E635] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>3. Veo Motion Prompt</span>
            </span>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={2}
              className="w-full bg-[#030905] border border-[#1B4332] rounded-xl p-3 text-xs sm:text-sm font-mono text-white focus:outline-none focus:border-[#22C55E] transition-colors resize-none"
              placeholder="Describe the desired cinematic camera movement and facial motion..."
            />

            {/* Quick Prompt Presets */}
            <div className="flex flex-wrap gap-2 pt-1">
              {promptPresets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setPrompt(p.text)}
                  className="px-2.5 py-1 rounded-lg bg-[#0F261A] hover:bg-[#142C1F] border border-[#1B4332] text-[11px] font-mono text-[#86EFAC] transition-colors"
                >
                  ⚡ {p.title}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message Notice if any */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-amber-950/60 border border-amber-600/40 text-amber-200 text-xs font-mono flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold">Generation Notice: </span>
                <span>{errorMsg}</span>
              </div>
            </div>
          )}

          {/* Generation Progress Indicator */}
          {isGenerating && (
            <div className="p-4 rounded-2xl bg-[#040A06] border border-[#22C55E]/40 space-y-2.5 animate-pulse">
              <div className="flex items-center justify-between text-xs font-mono text-[#86EFAC]">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-ping" />
                  <span>Veo Video Synthesis in Progress</span>
                </span>
                <span>Model: veo-3.1-fast-generate-preview</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#0C1A12] overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#22C55E] via-[#A3E635] to-[#38BDF8] animate-pulse w-full" />
              </div>
              <p className="text-[11px] font-mono text-white/80">{generationProgress}</p>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Tray */}
        <div className="bg-[#050D08] px-5 sm:px-7 py-4 border-t border-[#142C1F] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs font-mono text-[#86EFAC]/80">
            Powered by <strong>Google Veo</strong> (veo-3.1-fast-generate-preview)
          </div>

          <div className="flex items-center gap-2.5">
            {generatedVideoUrl && (
              <a
                href={generatedVideoUrl}
                download="veo-portrait-video.mp4"
                className="px-4 py-2 rounded-xl bg-[#142C1F] hover:bg-[#1B4332] text-white text-xs font-mono font-semibold border border-[#2D5A27] transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Download MP4</span>
              </a>
            )}

            <button
              onClick={handleGenerateVideo}
              disabled={isGenerating}
              className={`px-5 py-2.5 rounded-xl font-mono font-bold text-xs sm:text-sm transition-all shadow-lg flex items-center gap-2 ${
                isGenerating
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-[#22C55E] hover:bg-[#16A34A] text-black shadow-[#22C55E]/30 hover:scale-102'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>{isGenerating ? 'Generating Video...' : 'Generate Video with Veo'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
