import React from 'react';
import { Shield, Trees, HeartHandshake, CheckCircle2, Award, Calendar } from 'lucide-react';

export const StewardshipView: React.FC = () => {
  const volunteerProjects = [
    {
      title: 'Cascade Pass Trailhead Drainage Restoration',
      date: 'June 20, 2026',
      leader: 'Washington Trails Association & Elena Vance',
      spots: '4 spots open',
      status: 'Recruiting Volunteers',
      desc: 'Re-trench water diversions, build turnpikes across muddy bog sections, and replace split-cedar waterbars.',
    },
    {
      title: 'Enchantments Core Waste Pack-Out Initiative',
      date: 'July 11, 2026',
      leader: 'USFS Alpine Lakes Ranger District',
      spots: 'Full (Waitlist)',
      status: 'Permitted Patrol',
      desc: 'High-elevation leave-no-trace monitoring and trash sweeps across Perfection, Inspiration, and Colchuck lakes.',
    },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="bg-white rounded-xl border border-[#E8E2D5] p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-lg bg-[#E8EFEA] text-[#1B4332]">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-[#14261C]">
              Alpine Trail Stewardship
            </h2>
            <p className="text-xs text-[#526357]">
              Community trail maintenance, Leave No Trace audits, and ranger partnerships.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#FAF8F5] rounded-xl border border-[#EDE7DC] text-center mb-6">
          <div>
            <span className="text-[10px] text-[#63756A] block">Volunteer Hours Logged</span>
            <span className="text-xl font-mono tabular-nums font-bold text-[#1B4332]">124 hrs</span>
          </div>
          <div>
            <span className="text-[10px] text-[#63756A] block">Blowdowns Cleared</span>
            <span className="text-xl font-mono tabular-nums font-bold text-[#1B4332]">38 trees</span>
          </div>
          <div>
            <span className="text-[10px] text-[#63756A] block">LNT Pack-Out Weight</span>
            <span className="text-xl font-mono tabular-nums font-bold text-[#1B4332]">64.5 lbs</span>
          </div>
        </div>

        <h3 className="text-sm font-serif font-bold text-[#14261C] mb-3">
          Upcoming Trail Work Parties
        </h3>

        <div className="space-y-3">
          {volunteerProjects.map((proj, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-[#E8E2D5] bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-sm font-serif font-bold text-[#14261C]">
                    {proj.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-[#526357] mt-1">
                    <Calendar className="w-3.5 h-3.5 text-[#1B4332]" />
                    <span>{proj.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{proj.leader}</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded text-[11px] font-medium bg-[#EDF5EE] text-[#1B4332]">
                  {proj.status}
                </span>
              </div>
              <p className="text-xs text-[#44554A] mt-2.5 leading-relaxed">
                {proj.desc}
              </p>
              <div className="mt-3 pt-2.5 border-t border-[#EDE7DC] flex justify-between items-center text-xs">
                <span className="text-[#63756A]">{proj.spots}</span>
                <button className="px-3 py-1 bg-[#1B4332] text-white rounded-lg text-xs font-semibold hover:bg-[#255741] transition-colors">
                  Join Volunteer Crew
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
