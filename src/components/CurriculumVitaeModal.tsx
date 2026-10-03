import React, { useRef } from 'react';
import { DeveloperProfile, PeerReviewedPaper } from '../types/portfolio';
import { ProgressAvatar } from './ProgressAvatar';
import { X, Printer, Download, CheckCircle2, FileText, ExternalLink, ShieldCheck } from 'lucide-react';

interface CurriculumVitaeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: DeveloperProfile;
  papers: PeerReviewedPaper[];
}

export const CurriculumVitaeModal: React.FC<CurriculumVitaeModalProps> = ({
  isOpen,
  onClose,
  profile,
  papers,
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl border border-[#D5CDBC] shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col animate-fade-in">
        {/* Top Control Bar */}
        <div className="bg-[#FAF8F5] border-b border-[#E8E2D5] px-6 py-3.5 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#1B4332]" />
            <div>
              <h2 className="text-sm font-serif font-bold text-[#14261C]">
                Official Curriculum Vitae &amp; Research Achievements
              </h2>
              <p className="text-[11px] text-[#55695C]">
                Prescribed University Format · Suwa University of Science Doctoral Course Dossier
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#F2ECE1] border border-[#D5CDBC] text-[#14261C] rounded-lg text-xs font-semibold transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-[#1B4332]" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#63756A] hover:text-[#14261C] hover:bg-[#F2ECE1] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Document Content */}
        <div className="p-6 sm:p-10 overflow-y-auto font-sans text-[#14261C] space-y-6" ref={printRef}>
          {/* Document Header */}
          <div className="text-right text-[11px] font-mono text-[#63756A] border-b border-[#E5DFD4] pb-2">
            [Official University Format — Prescribed Form]
          </div>

          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-wide text-[#14261C]">
              CURRICULUM VITAE
            </h1>
          </div>

          {/* Personal Details Table */}
          <div className="border border-[#CBD5E1] rounded-lg overflow-hidden text-xs">
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#CBD5E1] bg-[#FAF8F5]">
              <div className="p-3 col-span-3 space-y-2">
                <div>
                  <span className="font-semibold text-[#475569]">Current Address: </span>
                  <span className="font-medium text-[#0F172A]">{profile.address}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#475569]">Full Legal Name: </span>
                  <span className="font-bold text-sm text-[#0F172A]">
                    {profile.name}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[#334155]">
                  <span><strong>Date of Birth:</strong> {profile.dob} (Age: {profile.age})</span>
                  <span><strong>Nationality:</strong> {profile.nationality}</span>
                  <span><strong>Gender:</strong> {profile.gender}</span>
                </div>
                <div className="text-[#334155]">
                  <span><strong>Contact Info:</strong> Phone: {profile.phonePrimary} / {profile.phoneSecondary} | E-mail: {profile.emailUniversity}</span>
                </div>
              </div>

              {/* Official Passport Photo Box */}
              <div className="p-3 flex flex-col items-center justify-center bg-white text-center gap-1.5">
                <div className="w-20 h-24 border border-[#CBD5E1] rounded overflow-hidden shadow-xs flex items-center justify-center bg-white">
                  <ProgressAvatar size="md" showBadge={false} />
                </div>
                <span className="text-[9px] font-mono text-[#64748B]">Official Photo (35x45mm)</span>
              </div>
            </div>
          </div>

          {/* Academic History (High School Graduation Onwards) */}
          <div>
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#1B4332] bg-[#E8EFEA] px-3 py-1.5 rounded mb-2">
              Academic History (High School Graduation Onwards)
            </h3>
            <table className="w-full text-xs border border-[#CBD5E1] border-collapse">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#CBD5E1] text-[#475569]">
                  <th className="p-2.5 text-left w-36 border-r border-[#CBD5E1]">Period (YYYY/MM)</th>
                  <th className="p-2.5 text-left">Academic Institution &amp; Degree Conferred</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#CBD5E1]">
                {profile.academicHistory.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF8F5]/60">
                    <td className="p-2.5 font-mono border-r border-[#CBD5E1] text-[#334155] align-top whitespace-nowrap">
                      {item.period}
                    </td>
                    <td className="p-2.5 text-[#0F172A] leading-relaxed">
                      <strong>{item.institution}</strong> — {item.degree}
                      <p className="text-[11px] text-[#475569] mt-0.5">{item.details}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Professional & Research History */}
          <div>
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#1B4332] bg-[#E8EFEA] px-3 py-1.5 rounded mb-2">
              Professional &amp; Research History
            </h3>
            <table className="w-full text-xs border border-[#CBD5E1] border-collapse">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#CBD5E1] text-[#475569]">
                  <th className="p-2.5 text-left w-36 border-r border-[#CBD5E1]">Period (YYYY/MM)</th>
                  <th className="p-2.5 text-left">Organization &amp; Research Appointment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#CBD5E1]">
                {profile.professionalHistory.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF8F5]/60">
                    <td className="p-2.5 font-mono border-r border-[#CBD5E1] text-[#334155] align-top whitespace-nowrap">
                      {item.period}
                    </td>
                    <td className="p-2.5 text-[#0F172A] leading-relaxed">
                      <strong>{item.role}</strong>, {item.organization}
                      <p className="text-[11px] text-[#475569] mt-0.5">{item.focus}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Peer-Reviewed Publications & International Conference Proceedings */}
          <div>
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#1B4332] bg-[#E8EFEA] px-3 py-1.5 rounded mb-2">
              1. Peer-Reviewed Academic Papers &amp; International Conference Proceedings
            </h3>
            <table className="w-full text-xs border border-[#CBD5E1] border-collapse">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#CBD5E1] text-[#475569]">
                  <th className="p-2 text-left border-r border-[#CBD5E1]">Paper Title &amp; Date</th>
                  <th className="p-2 text-left w-48 border-r border-[#CBD5E1]">Journal / Conference / Publisher</th>
                  <th className="p-2 text-left w-28 border-r border-[#CBD5E1]">Author Order</th>
                  <th className="p-2 text-left w-18 border-r border-[#CBD5E1]">Refereed</th>
                  <th className="p-2 text-left">Summary / Abstract &amp; DOI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#CBD5E1]">
                {papers.map((p, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF8F5]/60">
                    <td className="p-2.5 font-semibold text-[#0F172A] border-r border-[#CBD5E1] align-top leading-snug">
                      {p.title}
                      <span className="block text-[11px] font-normal text-[#64748B] mt-1 font-mono">
                        Published: {p.year}
                      </span>
                    </td>
                    <td className="p-2.5 text-[#334155] border-r border-[#CBD5E1] align-top text-[11px]">
                      <strong>{p.journalOrConference}</strong>
                      <span className="block text-[#64748B] mt-0.5">{p.pagesOrVolume}</span>
                    </td>
                    <td className="p-2.5 text-[#1B4332] font-semibold border-r border-[#CBD5E1] align-top text-[11px]">
                      {p.authorOrder}
                    </td>
                    <td className="p-2.5 text-[#2D5A27] font-bold border-r border-[#CBD5E1] align-top text-[11px]">
                      YES (Peer-Reviewed)
                    </td>
                    <td className="p-2.5 text-[#334155] align-top leading-relaxed text-[11px]">
                      {p.abstract}
                      {p.doi && (
                        <span className="block font-mono text-[#1B4332] font-bold mt-1">
                          DOI: {p.doi}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Conference Presentations, Patents & Honors */}
          <div>
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#1B4332] bg-[#E8EFEA] px-3 py-1.5 rounded mb-2">
              3. Conference Presentations, Patents &amp; Honors
            </h3>
            <table className="w-full text-xs border border-[#CBD5E1] border-collapse">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#CBD5E1] text-[#475569]">
                  <th className="p-2.5 text-left border-r border-[#CBD5E1]">Title / Award Name</th>
                  <th className="p-2.5 text-left w-36 border-r border-[#CBD5E1]">Date &amp; Location</th>
                  <th className="p-2.5 text-left w-48 border-r border-[#CBD5E1]">Organizer / Institution</th>
                  <th className="p-2.5 text-left w-32">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#CBD5E1]">
                <tr className="hover:bg-[#FAF8F5]/60">
                  <td className="p-2.5 font-semibold text-[#0F172A] border-r border-[#CBD5E1]">
                    Edge AIoT Deployment for Human-Wildlife Coexistence in Urban Shrines
                  </td>
                  <td className="p-2.5 font-mono text-[#475569] border-r border-[#CBD5E1]">
                    Oct 2024 · Kathmandu
                  </td>
                  <td className="p-2.5 text-[#334155] border-r border-[#CBD5E1]">
                    MBUST Research Symposium
                  </td>
                  <td className="p-2.5 text-[#1B4332] font-medium">Oral Presentation</td>
                </tr>
                <tr className="hover:bg-[#FAF8F5]/60">
                  <td className="p-2.5 font-semibold text-[#0F172A] border-r border-[#CBD5E1]">
                    School Leaving Certificate (SLC) Distinction Award
                  </td>
                  <td className="p-2.5 font-mono text-[#475569] border-r border-[#CBD5E1]">
                    Jun 2014 · Kathmandu
                  </td>
                  <td className="p-2.5 text-[#334155] border-r border-[#CBD5E1]">
                    Ministry of Education, Nepal
                  </td>
                  <td className="p-2.5 text-[#1B4332] font-medium">Academic Honor (81.63%)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Certification Signature Section */}
          <div className="pt-6 border-t border-[#CBD5E1] space-y-4 text-xs">
            <p className="text-[#334155] italic">
              I hereby certify that all statements made in this curriculum vitae are authentic, true, and complete.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4">
              <div>
                <span className="text-[#64748B]">Date: </span>
                <span className="font-mono font-medium">November 2026</span>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-[#64748B]">Signature: </span>
                  <span className="font-serif font-bold text-base text-[#0F172A] underline underline-offset-4">
                    Progress Jung Thapa
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full border border-[#94A3B8] flex items-center justify-center text-[9px] text-[#64748B]">
                  Seal
                </div>
              </div>
            </div>

            <div className="text-center pt-4 text-[11px] font-mono text-[#475569] border-t border-[#E2E8F0]">
              {profile.targetDoctoralCourse}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
