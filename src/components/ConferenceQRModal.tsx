import React, { useState } from 'react';
import { X, Copy, Check, QrCode, Share2, Sparkles } from 'lucide-react';

interface ConferenceQRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConferenceQRModal: React.FC<ConferenceQRModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://wellnesspassport.app';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Wellness Passport — Women’s Health Awareness & Screening',
        text: 'A 3-5 minute privacy-first health-awareness check and clinician-reviewed library for women by WIMBIZ & Iwosan.',
        url: currentUrl,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  // Construct quick high-quality QR code image URL via reliable data service or SVG generator
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(
    currentUrl
  )}&bgcolor=F8FAFC&color=0F172A&margin=2`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="w-full max-w-sm rounded-3xl bg-slate-50 p-6 shadow-2xl border border-slate-200 text-slate-900 relative overflow-hidden">
        {/* Top Decorative Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white">
              <QrCode className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-extrabold leading-tight">Scan & Open Wellness Passport</h3>
              <p className="text-[11px] text-slate-500 font-medium">WIMBIZ × IWOSAN Booth Share</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/70 flex items-center justify-center text-slate-600 hover:text-slate-900 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* QR Card Container */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col items-center justify-center my-3 text-center">
          <div className="w-56 h-56 rounded-xl bg-slate-50 p-2 flex items-center justify-center border border-slate-200 shadow-inner">
            <img
              src={qrCodeUrl}
              alt="Scan QR Code to open Wellness Passport"
              className="w-full h-full object-contain rounded-lg"
              loading="eager"
            />
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-800 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Point camera to open instantly · No download</span>
          </div>
        </div>

        <p className="text-center text-xs text-slate-600 mb-4 px-2 leading-relaxed">
          Share with women participants at the conference booth. 100% private, zero sign-in, and all answers remain on their personal phone.
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 hover:bg-slate-50 transition cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-600" />
                <span>Copy App Link</span>
              </>
            )}
          </button>

          <button
            onClick={handleNativeShare}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 text-xs font-bold text-white hover:bg-emerald-700 transition cursor-pointer shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Link</span>
          </button>
        </div>
      </div>
    </div>
  );
};
