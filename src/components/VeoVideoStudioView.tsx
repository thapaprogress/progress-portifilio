import React, { useState, useRef } from 'react';
import {
  Film,
  Sparkles,
  Upload,
  Play,
  Pause,
  Download,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Video,
  Layers,
  ArrowRight,
  Maximize2,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface VeoVideoStudioViewProps {
  initialImage?: string | null;
  currentVideoUrl?: string | null;
  onVideoCreated?: (url: string) => void;
}

export const VeoVideoStudioView: React.FC<VeoVideoStudioViewProps> = ({
  initialImage,
  currentVideoUrl,
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
  const [videoUrl, setVideoUrl] = useState<string | null>(currentVideoUrl || null);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

      let isDone = false;
      let attempts = 0;
      const maxAttempts = 60;

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
      setVideoUrl(videoObjectUrl);
      if (onVideoCreated) {
        onVideoCreated(videoObjectUrl);
      }
      setGenerationProgress('Completed!');
    } catch (err: any) {
      console.warn('Veo generation notice:', err);
      setErrorMsg(
        err.message || 'Veo generation error. You can test generation or preview the video below.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in select-none">
      {/* Studio Header Card */}
      <div className="rounded-3xl bg-[#09150E] text-white border border-[#1B4332] p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-ping" />
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#142C1F] text-[#86EFAC] border border-[#2D5A27]">
                Google Veo 3.1 Studio · Image to Video
              </span>
              <span className="text-xs font-mono text-[#86EFAC]/70 hidden sm:inline">
                Model: veo-3.1-fast-generate-preview
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Animate Photos into Living Video
            </h1>
            <p className="text-xs sm:text-sm text-[#A7F3D0] mt-1.5 max-w-2xl font-mono leading-relaxed">
              Upload any portrait or animate Progress Jung Thapa's formal passport photo with photorealistic temporal synthesis, cinematic motion, and high-definition video generation.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-xl bg-[#142C1F] hover:bg-[#1B4332] border border-[#2D5A27] text-white font-mono text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>Upload New Photo</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
        </div>
      </div>

      {/* Main Studio Workspace: 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Video Viewport & Player (col-span-7) */}
        <div className="lg:col-span-7 bg-[#07130B] rounded-3xl border border-[#1B4332] p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#86EFAC] font-bold flex items-center gap-1.5">
              <Film className="w-4 h-4 text-[#22C55E]" />
              <span>ACTIVE VEO VIDEO STREAM</span>
            </span>
            <span className="text-white/70">
              Format: {aspectRatio} · {resolution}
            </span>
          </div>

          {/* Viewport */}
          <div
            className={`relative mx-auto rounded-2xl overflow-hidden bg-black border border-[#1B4332] shadow-2xl flex items-center justify-center ${
              aspectRatio === '9:16'
                ? 'max-w-[320px] aspect-[9/16]'
                : 'w-full aspect-[16/9]'
            }`}
          >
            {videoUrl ? (
              <video
                src={videoUrl}
                autoPlay
                loop
                playsInline
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              /* Living Portrait Motion Preview */
              <div className="relative w-full h-full flex items-center justify-center bg-radial from-[#183626] to-[#040A06] overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/15 via-transparent to-cyan-500/15 animate-pulse" />

                <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden border-2 border-[#22C55E]/50 shadow-[0_0_35px_rgba(34,197,94,0.3)] animate-float">
                  {selectedImage ? (
                    <img src={selectedImage} alt="Portrait" className="w-full h-full object-cover" />
                  ) : (
                    /* Formal Passport Portrait SVG */
                    <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
                      <defs>
                        <linearGradient id="vv_skin" x1="0%" y1="0%" x2="0%" y2="100%">
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
                      <rect x="85" y="112" width="30" height="35" rx="4" fill="url(#vv_skin)" />
                      <ellipse cx="100" cy="85" rx="42" ry="50" fill="url(#vv_skin)" />
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

                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono text-[#86EFAC] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                  <span>Veo Motion Ready · Click Generate to Synthesize</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between gap-3 pt-2 text-xs font-mono">
            {videoUrl && (
              <a
                href={videoUrl}
                download="veo-portrait.mp4"
                className="px-4 py-2 rounded-xl bg-[#142C1F] hover:bg-[#1B4332] text-white font-semibold border border-[#2D5A27] transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-[#22C55E]" />
                <span>Download MP4</span>
              </a>
            )}

            <button
              onClick={() => setSelectedImage(null)}
              className="text-white/60 hover:text-white transition-colors"
            >
              Reset to Progress's Portrait
            </button>
          </div>
        </div>

        {/* Right Column: Generation Controls & Settings (col-span-5) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Aspect Ratio Box */}
          <div className="p-5 rounded-3xl bg-[#09150E] border border-[#1B4332] text-white space-y-3">
            <span className="text-xs font-mono font-bold text-[#A3E635] uppercase flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              <span>Aspect Ratio Configuration</span>
            </span>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <button
                onClick={() => setAspectRatio('16:9')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  aspectRatio === '16:9'
                    ? 'bg-[#142C1F] border-[#22C55E] text-white ring-1 ring-[#22C55E] shadow-md'
                    : 'bg-[#040A06] border-[#1B4332] text-white/70 hover:bg-[#0E2015]'
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>16:9 Landscape</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-[#86EFAC]">
                    Wide
                  </span>
                </div>
                <div className="text-[10px] text-[#A7F3D0]/70 mt-1">
                  1280x720 / 1920x1080 cinematic
                </div>
              </button>

              <button
                onClick={() => setAspectRatio('9:16')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  aspectRatio === '9:16'
                    ? 'bg-[#142C1F] border-[#22C55E] text-white ring-1 ring-[#22C55E] shadow-md'
                    : 'bg-[#040A06] border-[#1B4332] text-white/70 hover:bg-[#0E2015]'
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>9:16 Portrait</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-[#86EFAC]">
                    Vertical
                  </span>
                </div>
                <div className="text-[10px] text-[#A7F3D0]/70 mt-1">
                  720x1280 mobile reels / story
                </div>
              </button>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#86EFAC]">
              <span>Target Resolution:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setResolution('720p')}
                  className={`px-3 py-1 rounded-lg ${
                    resolution === '720p'
                      ? 'bg-[#22C55E] text-black font-bold'
                      : 'bg-black/50 text-white/70'
                  }`}
                >
                  720p
                </button>
                <button
                  onClick={() => setResolution('1080p')}
                  className={`px-3 py-1 rounded-lg ${
                    resolution === '1080p'
                      ? 'bg-[#22C55E] text-black font-bold'
                      : 'bg-black/50 text-white/70'
                  }`}
                >
                  1080p
                </button>
              </div>
            </div>
          </div>

          {/* Prompt Box */}
          <div className="p-5 rounded-3xl bg-[#09150E] border border-[#1B4332] text-white space-y-3">
            <span className="text-xs font-mono font-bold text-[#A3E635] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>Veo Motion Prompt</span>
            </span>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="w-full bg-[#030905] border border-[#1B4332] rounded-2xl p-3.5 text-xs sm:text-sm font-mono text-white focus:outline-none focus:border-[#22C55E] transition-colors resize-none"
              placeholder="Describe the desired cinematic camera movement and facial motion..."
            />

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-white/60 block">Prompt presets:</span>
              <div className="flex flex-wrap gap-2">
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
          </div>

          {/* Progress / Status / Error Box */}
          {isGenerating && (
            <div className="p-4 rounded-2xl bg-[#040A06] border border-[#22C55E]/40 space-y-2 animate-pulse font-mono text-xs text-[#86EFAC]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-ping" />
                <span>Veo Motion Generation Active</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#0C1A12] overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#22C55E] via-[#A3E635] to-[#38BDF8] animate-pulse w-full" />
              </div>
              <p className="text-[11px] text-white/80">{generationProgress}</p>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-600/40 text-amber-200 text-xs font-mono flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Veo Notice: </span>
                <span>{errorMsg}</span>
              </div>
            </div>
          )}

          {/* Big Action Button */}
          <button
            onClick={handleGenerateVideo}
            disabled={isGenerating}
            className={`w-full py-4 rounded-2xl font-mono font-bold text-sm transition-all shadow-xl flex items-center justify-center gap-2 ${
              isGenerating
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-[#22C55E] hover:bg-[#16A34A] text-black shadow-[#22C55E]/30 hover:scale-101'
            }`}
          >
            <Video className="w-5 h-5" />
            <span>{isGenerating ? 'Synthesizing Video with Veo...' : 'Generate Video with Veo'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
