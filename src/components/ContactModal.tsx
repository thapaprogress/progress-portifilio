import React, { useState } from 'react';
import { X, Mail, Send, Check, Sparkles, MapPin, Globe } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  email,
}) => {
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('Research Collaboration / Architecture Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl border border-[#E8E2D5] shadow-xl p-6 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#63756A] hover:text-[#14261C] hover:bg-[#F2ECE1] rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-lg bg-[#E8EFEA] text-[#1B4332]">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-serif font-bold text-[#14261C]">
              Get in Touch with Progress
            </h2>
            <p className="text-xs text-[#526357]">
              The Conscious Architect · {email}
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#EDF5EE] text-[#2D5A27] flex items-center justify-center mx-auto mb-2">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-serif font-bold text-[#14261C]">Message Sent Directly!</h3>
            <p className="text-xs text-[#526357]">
              Thank you for reaching out. Progress will review your message promptly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 mt-3">
            <div>
              <label className="block text-xs font-semibold text-[#14261C] mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="Dr. Jane Doe / Engineering Lead"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-[#E2DBD0] bg-[#FAF8F5] text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#14261C] mb-1">
                Your Email
              </label>
              <input
                type="email"
                required
                placeholder="name@organization.com"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-[#E2DBD0] bg-[#FAF8F5] text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#14261C] mb-1">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-[#E2DBD0] bg-[#FAF8F5] text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
              >
                <option value="Research Collaboration / Architecture Inquiry">
                  Research Collaboration / Architecture Inquiry
                </option>
                <option value="Edge AI / Computer Vision Deployment">
                  Edge AI / Computer Vision Deployment
                </option>
                <option value="Speaking / Academic Advisory">
                  Speaking / Academic Advisory
                </option>
                <option value="Prajna World Tech Inquiry">
                  Prajna World Tech Inquiry
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#14261C] mb-1">
                Message
              </label>
              <textarea
                rows={3}
                required
                placeholder="Share project goals, technical requirements, or collaboration proposals..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-[#E2DBD0] bg-[#FAF8F5] text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-[#63756A] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#1B4332]" />
                <span>Kathmandu &amp; Makwanpur, Nepal</span>
              </span>

              <button
                type="submit"
                className="px-4 py-2 bg-[#1B4332] hover:bg-[#255741] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
