import React, { useState } from 'react';
import { Camera, Sparkles, Video, Play, Upload } from 'lucide-react';

interface ProgressAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  avatarUrl?: string | null;
  onOpenVideoStudio?: () => void;
  onAvatarUpload?: (dataUrl: string) => void;
  showBadge?: boolean;
}

export const ProgressAvatar: React.FC<ProgressAvatarProps> = ({
  size = 'md',
  avatarUrl,
  onOpenVideoStudio,
  onAvatarUpload,
  showBadge = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-20 h-20',
    lg: 'w-28 h-28',
    xl: 'w-36 h-36',
  }[size];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAvatarUpload) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onAvatarUpload(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`relative ${sizeClasses} rounded-full group cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpenVideoStudio}
      title="Progress Jung Thapa · Click to Animate into Video with Veo"
    >
      {/* Outer Glow Ring */}
      <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#1B4332] via-[#22C55E] to-[#A3E635] opacity-75 group-hover:opacity-100 blur-xs transition-opacity duration-300" />

      {/* Avatar Container */}
      <div className="relative w-full h-full rounded-full border-2 border-white overflow-hidden bg-white shadow-md">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Progress Jung Thapa - Formal Passport Portrait"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        ) : (
          /* High-Fidelity Formal Passport Portrait of Bearded Man (Progress Jung Thapa) */
          <svg
            className="w-full h-full"
            viewBox="0 0 200 200"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="bg_portrait" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#F1F5F9" />
              </linearGradient>
              <linearGradient id="skin_tone" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E0AC84" />
                <stop offset="50%" stopColor="#C99066" />
                <stop offset="100%" stopColor="#AF754E" />
              </linearGradient>
              <linearGradient id="hair_dark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#262626" />
                <stop offset="60%" stopColor="#171717" />
                <stop offset="100%" stopColor="#0A0A0A" />
              </linearGradient>
              <linearGradient id="suit_black" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#262626" />
                <stop offset="50%" stopColor="#18181B" />
                <stop offset="100%" stopColor="#09090B" />
              </linearGradient>
              <linearGradient id="tie_black" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1C1917" />
                <stop offset="100%" stopColor="#0C0A09" />
              </linearGradient>
            </defs>

            {/* Clean White Studio Passport Background */}
            <rect width="200" height="200" fill="url(#bg_portrait)" />

            {/* Hair Behind Ears / Head Contour */}
            <path
              d="M48,80 C44,45 65,18 100,18 C135,18 156,45 152,80 C156,98 152,122 144,135 C136,110 138,85 138,70 C138,38 122,25 100,25 C78,25 62,38 62,70 C62,85 64,110 56,135 C48,122 44,98 48,80 Z"
              fill="url(#hair_dark)"
            />

            {/* Shoulders & Formal Suit Jacket */}
            <path
              d="M0,158 C25,146 55,140 100,140 C145,140 175,146 200,158 L200,200 L0,200 Z"
              fill="url(#suit_black)"
            />

            {/* White Dress Shirt V-Neck & Collar */}
            <polygon points="72,142 128,142 100,186" fill="#FFFFFF" />
            {/* Shirt Collar Wings */}
            <polygon points="72,142 86,172 100,165 88,142" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.8" />
            <polygon points="128,142 114,172 100,165 112,142" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.8" />

            {/* Black Necktie Knot & Drape */}
            <polygon points="94,164 106,164 103,174 97,174" fill="url(#tie_black)" />
            <polygon points="96,174 104,174 108,200 92,200" fill="url(#tie_black)" />

            {/* Suit Notch Lapels */}
            <path d="M40,155 L74,180 L76,200 L25,200 Z" fill="#18181B" stroke="#27272A" strokeWidth="0.6" />
            <path d="M160,155 L126,180 L124,200 L175,200 Z" fill="#18181B" stroke="#27272A" strokeWidth="0.6" />

            {/* Neck */}
            <rect x="85" y="112" width="30" height="35" rx="4" fill="url(#skin_tone)" />
            <path d="M85,118 Q100,126 115,118 L115,134 Q100,140 85,134 Z" fill="#9A623F" opacity="0.4" />

            {/* Head / Face Oval Structure */}
            <ellipse cx="100" cy="85" rx="42" ry="50" fill="url(#skin_tone)" />

            {/* Upper Hairline & Side Parts */}
            <path
              d="M58,68 C62,40 76,28 100,28 C124,28 138,40 142,68 C135,52 120,44 100,45 C80,44 65,52 58,68 Z"
              fill="url(#hair_dark)"
            />
            {/* Center Hair Part subtle volume */}
            <path
              d="M98,28 C85,32 72,44 66,58 C74,50 86,45 100,46 C114,45 126,50 134,58 C128,44 115,32 102,28 Z"
              fill="#1F1F1F"
            />

            {/* Ears */}
            <ellipse cx="58" cy="86" rx="6" ry="12" fill="#C99066" />
            <ellipse cx="142" cy="86" rx="6" ry="12" fill="#C99066" />

            {/* Eyebrows (Strong, defined, dark brown/black) */}
            <path d="M72,70 Q84,65 94,70" fill="none" stroke="#171717" strokeWidth="4" strokeLinecap="round" />
            <path d="M106,70 Q116,65 128,70" fill="none" stroke="#171717" strokeWidth="4" strokeLinecap="round" />

            {/* Almond Eyes (Dark Brown, intense gaze) */}
            <ellipse cx="83" cy="78" rx="8" ry="5.5" fill="#FAF5F0" />
            <ellipse cx="117" cy="78" rx="8" ry="5.5" fill="#FAF5F0" />
            {/* Irises */}
            <circle cx="83" cy="78" r="4.2" fill="#3D2314" />
            <circle cx="117" cy="78" r="4.2" fill="#3D2314" />
            {/* Pupils & Light Glint */}
            <circle cx="83" cy="78" r="2.2" fill="#0A0A0A" />
            <circle cx="117" cy="78" r="2.2" fill="#0A0A0A" />
            <circle cx="84.5" cy="76.5" r="1.2" fill="#FFFFFF" />
            <circle cx="118.5" cy="76.5" r="1.2" fill="#FFFFFF" />
            {/* Eyelids */}
            <path d="M74,76 Q83,72 92,76" fill="none" stroke="#5C3822" strokeWidth="1.5" />
            <path d="M108,76 Q117,72 126,76" fill="none" stroke="#5C3822" strokeWidth="1.5" />

            {/* Nose Bridge and Tip */}
            <path d="M100,72 L97,93 Q100,97 103,93 Z" fill="#B37851" opacity="0.6" />
            <ellipse cx="100" cy="94" rx="5" ry="3" fill="#A86F49" />
            <circle cx="95" cy="95" r="1.6" fill="#6B3F25" />
            <circle cx="105" cy="95" r="1.6" fill="#6B3F25" />

            {/* Full Groomed Beard and Mustache */}
            {/* Mustache */}
            <path
              d="M86,102 Q94,98 100,102 Q106,98 114,102 C122,106 116,112 108,109 Q100,106 92,109 C84,112 78,106 86,102 Z"
              fill="url(#hair_dark)"
            />

            {/* Mouth / Natural Lips */}
            <path d="M94,107 Q100,109 106,107" stroke="#A35948" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Full Beard along Jawline and Chin */}
            <path
              d="M58,86 C58,110 65,138 100,140 C135,138 142,110 142,86 C138,98 132,122 122,128 C114,133 86,133 78,128 C68,122 62,98 58,86 Z"
              fill="url(#hair_dark)"
            />
            {/* Beard Texture Highlights */}
            <path
              d="M68,104 Q80,126 100,132 Q120,126 132,104 C128,124 116,138 100,138 C84,138 72,124 68,104 Z"
              fill="#1C1917"
            />
          </svg>
        )}

        {/* Hover Action Overlay: "Animate with Veo" */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white transition-opacity duration-200">
            <div className="w-8 h-8 rounded-full bg-[#22C55E] text-black flex items-center justify-center shadow-lg transform scale-110">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
            <span className="text-[9px] font-mono font-bold text-[#86EFAC] mt-1 tracking-wider uppercase">
              Veo Video
            </span>
          </div>
        )}
      </div>

      {/* Veo Video Badge on bottom right */}
      {showBadge && (
        <div
          className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-[#14261C] border-2 border-white text-[#22C55E] shadow-md hover:scale-110 transition-transform"
          title="Click to Animate Photo into Video with Veo"
        >
          <Video className="w-3.5 h-3.5 text-[#22C55E]" />
        </div>
      )}

      {/* Hidden file input for direct photo upload */}
      <input
        type="file"
        id="avatar-photo-upload"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};
