import React, { useEffect, useState } from 'react';
import { WifiOff, CheckCircle2 } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      const t = setTimeout(() => setShowReconnected(false), 3500);
      return () => clearTimeout(t);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowReconnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showReconnected) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all">
      {!isOnline && (
        <div className="flex items-center gap-2 bg-slate-900 text-white px-3.5 py-1.5 rounded-full text-xs font-medium shadow-xl border border-slate-700 animate-pulse">
          <WifiOff className="w-3.5 h-3.5 text-amber-400" />
          <span>Offline mode active · All library guides & tools remain accessible</span>
        </div>
      )}

      {showReconnected && (
        <div className="flex items-center gap-2 bg-emerald-800 text-white px-3.5 py-1.5 rounded-full text-xs font-medium shadow-xl border border-emerald-600 animate-fade-in">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
          <span>Back online</span>
        </div>
      )}
    </div>
  );
};
