import React, { useState } from 'react';
import { FileText, Newspaper, Download, ExternalLink, Check, Copy, Award, ShieldCheck } from 'lucide-react';
import { publishedPapersList, developerProfile } from '../data/portfolioData';

export const PublicationsView: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyBibtex = (id: string, bibtex: string) => {
    navigator.clipboard?.writeText?.(bibtex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl border border-[#E8E2D5] p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-lg bg-[#E8EFEA] text-[#1B4332]">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-[#14261C]">
              Peer-Reviewed Publications &amp; Research Achievements
            </h2>
            <p className="text-xs text-[#526357]">
              First-author refereed journal articles and international conference proceedings by Progress Jung Thapa.
            </p>
          </div>
        </div>

        {/* List of Publications */}
        <div className="space-y-5">
          {publishedPapersList.map((paper, idx) => (
            <div key={paper.id} className="p-5 rounded-xl border border-[#E8E2D5] bg-[#FAF8F5] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[#1B4332] bg-[#E8EFEA] px-2.5 py-0.5 rounded font-bold uppercase">
                    {paper.publicationType}
                  </span>
                  <span className="text-[11px] font-semibold text-[#2D5A27]">
                    Refereed Peer-Reviewed · {paper.year}
                  </span>
                </div>
                <span className="text-xs font-mono text-[#1B4332] font-semibold">
                  {paper.authorOrder}
                </span>
              </div>

              <h3 className="text-lg font-serif font-bold text-[#14261C] leading-snug">
                {paper.title}
              </h3>

              <div className="text-xs text-[#475569] space-y-1">
                <p>
                  <strong>Authors:</strong> {paper.authorsList.join(', ')}
                </p>
                <p>
                  <strong>Venue:</strong> {paper.journalOrConference} ({paper.pagesOrVolume})
                </p>
                {paper.doi && (
                  <p className="font-mono text-[#1B4332] font-semibold">
                    <strong>DOI Reference:</strong>{' '}
                    <a
                      href={`https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline text-[#1B4332]"
                    >
                      {paper.doi}
                    </a>
                  </p>
                )}
              </div>

              <p className="text-xs text-[#324439] leading-relaxed bg-white p-3 rounded-lg border border-[#EDE7DC]">
                <strong>Abstract:</strong> {paper.abstract}
              </p>

              {/* Keywords */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {paper.keywords.map((kw, i) => (
                  <span key={i} className="text-[10px] font-mono bg-white border border-[#CBD5E1] px-2 py-0.5 rounded text-[#334155]">
                    {kw}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                {paper.doi && (
                  <a
                    href={`https://doi.org/${paper.doi}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1B4332] text-white rounded-lg text-xs font-semibold hover:bg-[#255741] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open DOI / Full Text</span>
                  </a>
                )}

                <button
                  onClick={() => handleCopyBibtex(paper.id, paper.citationBibtex)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#D5CDBC] text-[#14261C] rounded-lg text-xs font-medium hover:bg-[#F2ECE1] transition-colors"
                >
                  {copiedId === paper.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#2D5A27]" />
                      <span className="text-[#2D5A27]">BibTeX Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy BibTeX</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Conference Presentations, Patents & Honors */}
        <div className="mt-8 pt-6 border-t border-[#E8E2D5]">
          <h3 className="text-base font-serif font-bold text-[#14261C] mb-3">
            Oral Presentations &amp; Academic Honors
          </h3>

          <div className="space-y-3">
            <div className="p-3.5 rounded-lg border border-[#E8E2D5] bg-[#FAF8F5] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#1B4332] font-semibold bg-[#E8EFEA] px-2 py-0.5 rounded">
                  Oral Presentation · Oct 2024
                </span>
                <h4 className="text-sm font-semibold text-[#14261C] mt-1">
                  Edge AIoT Deployment for Human-Wildlife Coexistence in Urban Shrines
                </h4>
                <p className="text-xs text-[#526357]">
                  MBUST Research Symposium · Kathmandu, Nepal
                </p>
              </div>
              <span className="text-xs text-[#64748B] font-mono shrink-0">
                MBUST Symposium
              </span>
            </div>

            <div className="p-3.5 rounded-lg border border-[#E8E2D5] bg-[#FAF8F5] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#92400E] font-semibold bg-[#FEF3C7] px-2 py-0.5 rounded">
                  Academic Honor · Jun 2014
                </span>
                <h4 className="text-sm font-semibold text-[#14261C] mt-1">
                  School Leaving Certificate (SLC) Distinction Award (81.63%)
                </h4>
                <p className="text-xs text-[#526357]">
                  Ministry of Education, Nepal · Angels Heart Secondary School
                </p>
              </div>
              <span className="text-xs text-[#64748B] font-mono shrink-0">
                Distinction (81.63%)
              </span>
            </div>
          </div>
        </div>

        {/* Media Coverage: Mongabay */}
        <div className="mt-8 p-5 rounded-xl border border-[#E8E2D5] bg-[#FAF8F5] space-y-3">
          <div className="flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-[#D97706]" />
            <span className="text-xs font-mono font-semibold text-[#92400E] uppercase">
              Mongabay International Environmental News Feature
            </span>
          </div>

          <h3 className="text-base font-serif font-bold text-[#14261C]">
            AI vs. Crop-Raiding Monkeys: How Smart Cameras Are Protecting Nepal’s Farmers
          </h3>

          <p className="text-xs text-[#44554A] leading-relaxed">
            Featured in Mongabay's international technology and conservation reporting, spotlighting Progress Jung Thapa's field research at Madan Bhandari University. The investigative report details how real-time YOLOv8n object detection on Raspberry Pi 5 provides non-lethal, sustainable protection against primate crop raids in Chitlang and UNESCO shrine corridors.
          </p>

          <a
            href="https://mongabay.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-[#1B4332] hover:underline font-semibold"
          >
            <span>Read full Mongabay investigation</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
