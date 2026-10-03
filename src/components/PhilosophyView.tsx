import React from 'react';
import { Sparkles, Brain, Cpu, Shield, Compass, BookOpen } from 'lucide-react';
import { DeveloperGraphic } from './DeveloperGraphic';

export const PhilosophyView: React.FC = () => {
  const pillars = [
    {
      title: '01. The Principle of Prajna (Direct Insight)',
      subtitle: 'Clarity Over Complexity',
      desc: 'Prajna refers to transcendental wisdom and unclouded insight. In software architecture, it manifests as eradicating unnecessary abstractions, choosing simple and resilient data flows, and designing systems that remain predictable under stress.',
    },
    {
      title: '02. Ancient Liberation Paths & Modern Computing',
      subtitle: 'Conscious Engineering',
      desc: 'Engineering is not merely manipulating silicon; it is an extension of conscious intention. By applying mindfulness to the design of AI agents and distributed backends, we build systems that liberate human effort rather than generating mindless friction.',
    },
    {
      title: '03. Edge AI with Tangible Social Impact',
      subtitle: 'Grounded Realities in Nepal',
      desc: 'True technical architecture is measured by its real-world ground truth. Our work at MBUST with crop-raiding macaques brings high-accuracy computer vision to rural Nepalese farmers, safeguarding food security while preserving wildlife without lethal measures.',
    },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Hero Banner */}
      <div className="bg-white rounded-xl border border-[#E8E2D5] p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <span className="text-xs font-mono font-medium tracking-wide uppercase text-[#1B4332] bg-[#E8EFEA] px-2.5 py-0.5 rounded-full inline-block mb-3">
            Philosophy of Architecture · progressthapa.com.np
          </span>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#14261C] leading-snug">
            The Conscious Architect
          </h1>

          <p className="text-sm font-serif italic text-[#3B4E41] mt-2">
            "Architecting digital futures while walking the ancient paths of liberation."
          </p>

          <p className="text-xs sm:text-sm text-[#4A5D50] leading-relaxed mt-4">
            Founded on the synthesis of classical wisdom traditions and modern computational engineering. Established at Prajna World Tech (est. 2023) and researched at Madan Bhandari University of Science and Technology.
          </p>
        </div>

        {/* Decorative graphic */}
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-80 opacity-40 pointer-events-none">
          <DeveloperGraphic diagramType="prajna_system" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Three Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pillars.map((p, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-[#E8E2D5] p-5 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono text-[#1B4332] font-semibold block">
                {p.subtitle}
              </span>
              <h3 className="text-base font-serif font-bold text-[#14261C] mt-1">
                {p.title}
              </h3>
              <p className="text-xs text-[#44554A] mt-2.5 leading-relaxed">
                {p.desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#F0ECE1] text-[11px] text-[#63756A] font-mono">
              Prajna Standard #0{idx + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
