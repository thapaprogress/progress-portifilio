import React, { useState } from 'react';
import { TrailLog, PhotoTile } from '../types/trail';
import { X, Mountain, Compass, Camera, Plus, Check } from 'lucide-react';

interface LogTrailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitTrail: (newTrail: Omit<TrailLog, 'id' | 'kudosCount' | 'userGaveKudos' | 'commentsCount' | 'comments'>) => void;
}

export const LogTrailModal: React.FC<LogTrailModalProps> = ({
  isOpen,
  onClose,
  onSubmitTrail,
}) => {
  const [trailName, setTrailName] = useState('');
  const [region, setRegion] = useState('');
  const [activityType, setActivityType] = useState<TrailLog['activityType']>('Alpine Hike');
  const [distanceMi, setDistanceMi] = useState('');
  const [elevationGainFt, setElevationGainFt] = useState('');
  const [movingTime, setMovingTime] = useState('');
  const [trailStatus, setTrailStatus] = useState<TrailLog['trailStatus']>('Clear');
  const [conditionReport, setConditionReport] = useState('');
  const [gearItem, setGearItem] = useState('');
  const [gearList, setGearList] = useState<string[]>(['Trekking Poles', 'Topo Map']);
  const [includePhotos, setIncludePhotos] = useState(true);

  if (!isOpen) return null;

  const handleAddGear = () => {
    if (gearItem.trim() && !gearList.includes(gearItem.trim())) {
      setGearList([...gearList, gearItem.trim()]);
      setGearItem('');
    }
  };

  const handleRemoveGear = (item: string) => {
    setGearList(gearList.filter((g) => g !== item));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trailName.trim() || !distanceMi || !elevationGainFt) return;

    const dist = parseFloat(distanceMi) || 6.5;
    const gain = parseInt(elevationGainFt, 10) || 2400;

    // Generate simulated elevation sparkline data based on start elevation and gain
    const baseElev = 2200;
    const peakElev = baseElev + gain;
    const simulatedProfile = [
      baseElev,
      baseElev + Math.round(gain * 0.25),
      baseElev + Math.round(gain * 0.6),
      peakElev,
      baseElev + Math.round(gain * 0.7),
      baseElev + Math.round(gain * 0.3),
      baseElev,
    ];

    const photos: PhotoTile[] = includePhotos
      ? [
          {
            id: `p_new_${Date.now()}_1`,
            caption: `Panoramic view from ${trailName} summit ridge`,
            locationName: `${trailName} Crest`,
            altitudeFt: peakElev,
            palette: 'mist',
            badgeLabel: 'New Log',
          },
          {
            id: `p_new_${Date.now()}_2`,
            caption: 'Alpine trail through wildflowers and talus',
            locationName: 'Mid-Trail Meadows',
            altitudeFt: Math.round(baseElev + gain * 0.5),
            palette: 'pine',
          },
        ]
      : [];

    onSubmitTrail({
      trailName: trailName.trim(),
      region: region.trim() || 'Washington Cascades Wilderness',
      timestamp: 'Just now',
      activityType,
      distanceMi: dist,
      elevationGainFt: gain,
      movingTime: movingTime.trim() || '4h 15m',
      maxAltitudeFt: peakElev,
      difficulty: dist > 12 || gain > 4000 ? 'Strenuous' : 'Moderate',
      conditionReport:
        conditionReport.trim() ||
        'Great conditions along the trail. Creek crossings are manageable and bugs were mild.',
      trailStatus,
      photos,
      elevationProfile: simulatedProfile,
      gearHighlights: gearList,
      isMilestone: gain >= 4000,
      milestoneTitle: gain >= 4000 ? 'Alpine Gain Milestone: 4k+ ft Single Ascent' : undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-[#E8E2D5] shadow-xl p-6 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE1]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#E8EFEA] text-[#1B4332]">
              <Mountain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-[#14261C]">
                Log Trail Activity
              </h2>
              <p className="text-xs text-[#526357]">
                Record your summit, trail report, and conditions
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#63756A] hover:text-[#14261C] hover:bg-[#F2ECE1] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#14261C] mb-1">
              Trail or Peak Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Bandera Mountain Scramble & Mason Lake"
              value={trailName}
              onChange={(e) => setTrailName(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-[#E2DBD0] bg-[#FAF8F5] text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#14261C] mb-1">
                Region / Wilderness
              </label>
              <input
                type="text"
                placeholder="e.g. Alpine Lakes Wilderness"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-[#E2DBD0] bg-[#FAF8F5] text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#14261C] mb-1">
                Activity Type
              </label>
              <select
                value={activityType}
                onChange={(e) => setActivityType(e.target.value as any)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-[#E2DBD0] bg-[#FAF8F5] text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
              >
                <option value="Alpine Hike">Alpine Hike</option>
                <option value="Thru-Hike">Thru-Hike</option>
                <option value="Scramble">Scramble</option>
                <option value="Trail Run">Trail Run</option>
                <option value="Snowshoe">Snowshoe</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#14261C] mb-1">
                Distance (mi) *
              </label>
              <input
                type="number"
                step="0.1"
                required
                placeholder="8.4"
                value={distanceMi}
                onChange={(e) => setDistanceMi(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-[#E2DBD0] bg-[#FAF8F5] text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#1B4332] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#14261C] mb-1">
                Elevation Gain (ft) *
              </label>
              <input
                type="number"
                required
                placeholder="3200"
                value={elevationGainFt}
                onChange={(e) => setElevationGainFt(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-[#E2DBD0] bg-[#FAF8F5] text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#1B4332] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#14261C] mb-1">
                Moving Time
              </label>
              <input
                type="text"
                placeholder="4h 30m"
                value={movingTime}
                onChange={(e) => setMovingTime(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-[#E2DBD0] bg-[#FAF8F5] text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#1B4332] font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#14261C] mb-1">
              Current Trail Condition
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {(['Clear', 'Snow Above 6k', 'Blowdowns', 'Muddy', 'Buggy'] as const).map(
                (status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setTrailStatus(status)}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-medium transition-colors border ${
                      trailStatus === status
                        ? 'bg-[#1B4332] text-white border-[#1B4332]'
                        : 'bg-[#FAF8F5] text-[#526357] border-[#E2DBD0] hover:bg-[#F2ECE1]'
                    }`}
                  >
                    {status}
                  </button>
                )
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#14261C] mb-1">
              Condition Report &amp; Hazards
            </label>
            <textarea
              rows={3}
              placeholder="Describe snow line, water crossings, road access, downed trees..."
              value={conditionReport}
              onChange={(e) => setConditionReport(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-[#E2DBD0] bg-[#FAF8F5] text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
            />
          </div>

          {/* Packed Gear Highlights */}
          <div>
            <label className="block text-xs font-semibold text-[#14261C] mb-1">
              Gear Packed
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="e.g. Microspikes, Sun Hoody"
                value={gearItem}
                onChange={(e) => setGearItem(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddGear();
                  }
                }}
                className="flex-1 text-xs px-3 py-1.5 rounded-lg border border-[#E2DBD0] bg-[#FAF8F5] text-[#1E2922]"
              />
              <button
                type="button"
                onClick={handleAddGear}
                className="px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#F2ECE1] border border-[#E2DBD0] rounded-lg text-xs text-[#1B4332] font-medium"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {gearList.map((g) => (
                <span
                  key={g}
                  className="inline-flex items-center gap-1 text-[11px] bg-[#FAF8F5] border border-[#E2DBD0] px-2 py-0.5 rounded text-[#324439]"
                >
                  {g}
                  <button
                    type="button"
                    onClick={() => handleRemoveGear(g)}
                    className="hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Photo Tiles Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-[#F0ECE1]">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#1B4332]" />
              <span className="text-xs text-[#14261C] font-medium">
                Include Ridge Photo Tiles &amp; Elevation Profile
              </span>
            </div>
            <input
              type="checkbox"
              checked={includePhotos}
              onChange={(e) => setIncludePhotos(e.target.checked)}
              className="accent-[#1B4332] w-4 h-4 rounded"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-[#F0ECE1] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#526357] hover:bg-[#F2ECE1] rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#1B4332] hover:bg-[#255741] active:bg-[#14261C] rounded-lg transition-colors shadow-xs"
            >
              Log &amp; Publish Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
