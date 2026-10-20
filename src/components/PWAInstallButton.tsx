import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Share2, X, Smartphone, Check } from 'lucide-react';

export const PWAInstallButton: React.FC<{ variant?: 'header' | 'banner' | 'pill' }> = ({ variant = 'header' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [justInstalled, setJustInstalled] = useState(false);

  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const res = await install();
      if (res) {
        setJustInstalled(true);
        setTimeout(() => setJustInstalled(false), 3000);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    }
  };

  if (!isInstallable && !isIOS) {
    return null;
  }

  return (
    <>
      {variant === 'header' && (
        <button
          id="pwa-install-header-btn"
          onClick={handleInstallClick}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-700/20 text-emerald-800 hover:bg-emerald-700/30 transition border border-emerald-600/30 shadow-xs"
          title="Save app to your phone"
        >
          {justInstalled ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-700" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">Add App</span>
            </>
          )}
        </button>
      )}

      {variant === 'banner' && (
        <div id="pwa-install-banner" className="bg-emerald-800 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md border border-emerald-700">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <p className="font-semibold text-sm">Save Wellness Passport on your device</p>
              <p className="text-xs text-emerald-200">Open in one tap with zero loading, 100% offline & private.</p>
            </div>
          </div>
          <button
            id="pwa-banner-action-btn"
            onClick={handleInstallClick}
            className="w-full sm:w-auto px-4 py-2 bg-white text-emerald-900 rounded-full font-bold text-xs hover:bg-emerald-50 transition shadow-xs cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            {isIOS ? 'Install on iPhone / iPad' : 'Install PWA App'}
          </button>
        </div>
      )}

      {/* iOS Safari Guided Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-slate-50 p-6 shadow-2xl border border-slate-200 text-slate-900">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                  WP
                </div>
                <h3 className="text-base font-bold">Install on Safari (iOS)</h3>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-7 h-7 rounded-full bg-slate-200/70 flex items-center justify-center text-slate-600 hover:text-slate-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4">
              Add Wellness Passport to your home screen for instant, offline access without opening the browser:
            </p>

            <ol className="space-y-3 text-xs text-slate-800">
              <li className="flex items-start gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200/80">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                  1
                </span>
                <span>
                  Tap the <strong className="text-slate-900">Share</strong> icon <Share2 className="w-3.5 h-3.5 inline mx-1 text-sky-600" /> at the bottom of your Safari screen.
                </span>
              </li>
              <li className="flex items-start gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200/80">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                  2
                </span>
                <span>
                  Scroll down the menu and tap <strong className="text-slate-900">Add to Home Screen</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200/80">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                  3
                </span>
                <span>
                  Tap <strong className="text-emerald-700">Add</strong> in the top right corner. You are ready!
                </span>
              </li>
            </ol>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full rounded-full bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition cursor-pointer"
            >
              Got it, thank you
            </button>
          </div>
        </div>
      )}
    </>
  );
};
