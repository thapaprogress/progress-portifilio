import React from 'react';
import { FeaturedStackItem } from '../types/portfolio';
import { DeveloperGraphic } from './DeveloperGraphic';
import { X, Layers, Cpu, Terminal, Check, ExternalLink, Code } from 'lucide-react';

interface StackDetailModalProps {
  stack: FeaturedStackItem | null;
  onClose: () => void;
  onOpenContactModal?: () => void;
}

export const StackDetailModal: React.FC<StackDetailModalProps> = ({
  stack,
  onClose,
  onOpenContactModal,
}) => {
  if (!stack) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-[#E8E2D5] shadow-xl overflow-hidden animate-fade-in">
        {/* Graphic Header */}
        <div className="relative h-44 w-full bg-[#183626] overflow-hidden">
          <DeveloperGraphic diagramType="architecture_diagram" className="w-full h-full object-cover" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-4 text-white">
            <span className="text-[11px] font-mono tracking-wider uppercase text-[#A3E635]">
              {stack.domain}
            </span>
            <h2 className="text-lg font-serif font-bold leading-tight drop-shadow-xs">
              {stack.name}
            </h2>
          </div>
        </div>

        {/* Content & Specs */}
        <div className="p-5 space-y-4">
          {/* Key Specs */}
          <div className="grid grid-cols-2 gap-2 p-3 bg-[#FAF8F5] rounded-xl border border-[#EDE7DC] text-center">
            <div>
              <span className="text-[10px] text-[#63756A] block">Benchmark</span>
              <span className="text-xs font-mono font-bold text-[#14261C] tabular-nums mt-0.5 block">
                {stack.latencyOrMetric}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#63756A] block">Production Status</span>
              <span className="text-xs font-medium text-[#2D5A27] mt-0.5 block">
                {stack.status}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-[#394B3F]">
            <p className="leading-relaxed text-[#2A3B31]">
              {stack.description}
            </p>

            <div className="pt-2 border-t border-[#F0ECE1]">
              <span className="text-[11px] font-semibold text-[#14261C] block mb-1.5">
                Technologies &amp; Libraries:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {stack.stackList.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E2DBD0] text-[#1B4332] font-mono text-[11px]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between py-1 border-t border-[#F0ECE1] text-[11px]">
              <span className="text-[#63756A]">Architecture Revision</span>
              <span className="font-mono text-[#14261C]">{stack.lastUpdated}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg text-xs font-medium text-[#4A5D50] hover:bg-[#F2ECE1] transition-colors"
            >
              Close
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenContactModal?.();
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#1B4332] hover:bg-[#255741] transition-colors shadow-xs"
            >
              Discuss Architecture Integration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
