import React, { useState } from 'react';
import { ProjectWork, VisualTile } from '../types/portfolio';
import { X, Cpu, Plus, Code, Layers } from 'lucide-react';

interface LogProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitProject: (newProject: Omit<ProjectWork, 'id' | 'starsCount' | 'userStarred' | 'commentsCount' | 'comments'>) => void;
}

export const LogProjectModal: React.FC<LogProjectModalProps> = ({
  isOpen,
  onClose,
  onSubmitProject,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<ProjectWork['category']>('Computer Vision');
  const [status, setStatus] = useState<ProjectWork['status']>('Live in Field');
  const [metricLabel, setMetricLabel] = useState('Field Accuracy');
  const [metricValue, setMetricValue] = useState('89.2% mAP');
  const [summary, setSummary] = useState('');
  const [deepDive, setDeepDive] = useState('');
  const [techInput, setTechInput] = useState('');
  const [techList, setTechList] = useState<string[]>(['Python', 'PyTorch', 'OpenCV']);

  if (!isOpen) return null;

  const handleAddTech = () => {
    if (techInput.trim() && !techList.includes(techInput.trim())) {
      setTechList([...techList, techInput.trim()]);
      setTechInput('');
    }
  };

  const handleRemoveTech = (item: string) => {
    setTechList(techList.filter((t) => t !== item));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;

    const visualTiles: VisualTile[] = [
      {
        id: `vt_${Date.now()}_1`,
        title: `${title} Architecture`,
        subtitle: `${metricLabel}: ${metricValue}`,
        diagramType: category === 'Computer Vision' ? 'yolo_detection' : 'architecture_diagram',
        badge: 'New Work',
      },
    ];

    onSubmitProject({
      title: title.trim(),
      subtitle: subtitle.trim() || 'Research & Engineering by Progress Jung Thapa',
      category,
      timestamp: 'Published Just Now',
      status,
      summary: summary.trim(),
      deepDive: deepDive.trim() || summary.trim(),
      metrics: [
        { label: metricLabel || 'Benchmark', value: metricValue || 'Verified' },
        { label: 'Deployed', value: 'Nepal Edge' },
        { label: 'Author', value: 'Progress Thapa' },
      ],
      benchmarks: [60, 70, 78, 84, 88.5],
      technologies: techList,
      visualTiles,
      links: {
        github: 'https://github.com/Progress',
        liveDemo: 'https://progressthapa.com.np',
      },
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-[#E8E2D5] shadow-xl p-6 my-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE1]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#E8EFEA] text-[#1B4332]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-[#14261C]">
                Add Work / Research Publication
              </h2>
              <p className="text-xs text-[#526357]">
                Record a new project, edge model, or architecture system
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
              Project or Research Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Real-Time Primate Classifier with LoRa Edge Sync"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-[#E2DBD0] bg-[#FAF8F5] text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#14261C] mb-1">
                Domain Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-[#E2DBD0] bg-[#FAF8F5] text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
              >
                <option value="Computer Vision">Computer Vision</option>
                <option value="Distributed Systems">Distributed Systems</option>
                <option value="Edge AI & IoT">Edge AI &amp; IoT</option>
                <option value="Academic Research">Academic Research</option>
                <option value="Open Source">Open Source</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#14261C] mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-[#E2DBD0] bg-[#FAF8F5] text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
              >
                <option value="Live in Field">Live in Field</option>
                <option value="Published">Published</option>
                <option value="Active Production">Active Production</option>
                <option value="Open Source">Open Source</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#14261C] mb-1">
                Primary Metric Label
              </label>
              <input
                type="text"
                placeholder="Field Accuracy"
                value={metricLabel}
                onChange={(e) => setMetricLabel(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-[#E2DBD0] bg-[#FAF8F5] text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#14261C] mb-1">
                Metric Value
              </label>
              <input
                type="text"
                placeholder="89.2% mAP"
                value={metricValue}
                onChange={(e) => setMetricValue(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-[#E2DBD0] bg-[#FAF8F5] text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#14261C] mb-1">
              Technical Summary *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Outline what problem this solves, model architecture, and real-world deployment details..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-[#E2DBD0] bg-[#FAF8F5] text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
            />
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-xs font-semibold text-[#14261C] mb-1">
              Technology Stack
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="e.g. TensorRT, LoRa, Docker"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTech();
                  }
                }}
                className="flex-1 text-xs px-3 py-1.5 rounded-lg border border-[#E2DBD0] bg-[#FAF8F5] text-[#1E2922]"
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#F2ECE1] border border-[#E2DBD0] rounded-lg text-xs text-[#1B4332] font-medium"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {techList.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 text-[11px] bg-[#FAF8F5] border border-[#E2DBD0] px-2 py-0.5 rounded text-[#324439]"
                >
                  {t}
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(t)}
                    className="hover:text-red-600 ml-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
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
              Publish to Portfolio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
