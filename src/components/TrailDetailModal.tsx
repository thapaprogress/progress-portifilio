import React from 'react';
import { SavedTrail } from '../types/trail';
import { MountainGraphic } from './MountainGraphic';
import { X, MapPin, Calendar, Compass, Mountain, Download, Check, Plus } from 'lucide-react';

interface TrailDetailModalProps {
  trail: SavedTrail | null;
  onClose: () => void;
  onLogForThisTrail: (trail: SavedTrail) => void;
}

export const TrailDetailModal: React.FC<TrailDetailModalProps> = ({
  trail,
  onClose,
  onLogForThisTrail,
}) => {
  const [downloadedGpx, setDownloadedGpx] = React.useState(false);

  if (!trail) return null;

  const handleDownloadGpx = () => {
    // Generate simple GPX mock download file
    const gpxData = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Ridgeline Hiking Dashboard">
  <metadata>
    <name>${trail.name}</name>
    <desc>${trail.park} - ${trail.distanceMi} mi, ${trail.elevationFt} ft gain</desc>
  </metadata>
  <trk>
    <name>${trail.name}</name>
    <trkseg>
      <trkpt lat="47.6062" lon="-121.3321"><ele>3200</ele></trkpt>
      <trkpt lat="47.6200" lon="-121.3150"><ele>${trail.elevationFt + 3200}</ele></trkpt>
    </trkseg>
  </trk>
</gpx>`;
    const blob = new Blob([gpxData], { type: 'application/gpx+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${trail.name.toLowerCase().replace(/\s+/g, '_')}_route.gpx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadedGpx(true);
    setTimeout(() => setDownloadedGpx(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-[#E8E2D5] shadow-xl overflow-hidden animate-fade-in">
        {/* Mountain Graphic Hero */}
        <div className="relative h-44 w-full bg-[#1B4332] overflow-hidden">
          <MountainGraphic palette="pine" className="w-full h-full object-cover" showContours={true} />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-4 text-white">
            <span className="text-[11px] font-mono tracking-wider uppercase text-[#A3E635]">
              {trail.park}
            </span>
            <h2 className="text-lg font-serif font-bold leading-tight drop-shadow-xs">
              {trail.name}
            </h2>
          </div>
        </div>

        {/* Content & Specs */}
        <div className="p-5 space-y-4">
          {/* Unboxed specs */}
          <div className="grid grid-cols-3 gap-2 p-3 bg-[#FAF8F5] rounded-xl border border-[#EDE7DC] text-center">
            <div>
              <span className="text-[10px] text-[#63756A] block">Roundtrip</span>
              <span className="text-sm font-mono tabular-nums font-bold text-[#14261C]">
                {trail.distanceMi} mi
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#63756A] block">Elevation Gain</span>
              <span className="text-sm font-mono tabular-nums font-bold text-[#14261C]">
                +{trail.elevationFt.toLocaleString()} ft
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#63756A] block">Difficulty</span>
              <span className="text-sm font-medium text-[#1B4332]">
                {trail.difficulty}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-[#394B3F]">
            <div className="flex items-center justify-between py-1 border-b border-[#F0ECE1]">
              <span className="text-[#63756A]">Prime Season</span>
              <span className="font-medium text-[#14261C]">{trail.bestSeason}</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-[#F0ECE1]">
              <span className="text-[#63756A]">Permit Status</span>
              <span className="font-medium text-[#14261C]">
                {trail.permitRequired ? 'Required (Recreation.gov)' : 'NW Forest Pass / Discover Pass'}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-[#F0ECE1]">
              <span className="text-[#63756A]">Trailhead Status</span>
              <span className="font-medium text-[#2D5A27]">{trail.status}</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-[#63756A]">Last Community Scout</span>
              <span className="text-[#63756A]">{trail.lastReportedDate}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              onClick={handleDownloadGpx}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-[#4A5D50] bg-[#FAF8F5] hover:bg-[#F2ECE1] border border-[#E2DBD0] transition-colors"
            >
              {downloadedGpx ? <Check className="w-3.5 h-3.5 text-[#2D5A27]" /> : <Download className="w-3.5 h-3.5" />}
              <span>{downloadedGpx ? 'GPX Downloaded' : 'Export GPX'}</span>
            </button>

            <button
              onClick={() => {
                onLogForThisTrail(trail);
                onClose();
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#1B4332] hover:bg-[#255741] transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Hike for This Trail</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
